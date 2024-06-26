'use server';

import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

class UserNotFoundErr extends Error {}

export async function GetFormStats() {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr();
    }

    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id,
        },
        _sum: {
            visits     : true,
            submissions: true,
        },
    });

    const visits = stats._sum.visits || 0;
    const submissions = stats._sum.submissions || 0;

    let submissionRate = 0;

    if (visits > 0) {
        submissionRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;

    return {
        visits,
        submissions,
        submissionRate,
        bounceRate,
    };
}

export async function CreateForm(data: { name: string; description?: string }) {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr();
    }

    const { name, description } = data;

    const form = await prisma.form.create({
        data: {
            userId: user.id,
            name,
            description,
        },
    });

    if (!form) {
        throw new Error('something went wrong');
    }

    revalidatePath('/(dashboard)/', 'page');
    return form.id;
}

export async function GetForms() {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr();
    }

    return prisma.form.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });
}

export async function GetFormById(id: number) {
    // noStore();
    try {
        const user = await currentUser();
        if (!user) {
            throw new UserNotFoundErr();
        }

        return prisma.form.findUnique({
            where: {
                userId: user.id,
                id,
            },
        });
    } catch (e) {
        console.log(e);
    }
}

export async function UpdateFormContent(id: number, jsonContent: string) {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr();
    }

    await prisma.form.update({
        where: {
            userId: user.id,
            id,
        },
        data: {
            content: jsonContent,
        },
    });

    revalidatePath('/(dashboard)/builder/[id]', 'page');
}

export async function PublishForm(id: number) {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr();
    }

    return prisma.form.update({
        data: {
            published: true,
        },
        where: {
            userId: user.id,
            id,
        },
    });
}

export async function GetFormContentByUrl(formUrl: string) {
    try {
        return prisma.form.update({
            select: {
                content: true,
            },
            data: {
                visits: {
                    increment: 1,
                },
            },
            where: {
                shareURL: formUrl,
            },
        });
    } catch (e) {
        console.log(e);
    }
}

export async function SubmitForm(formUrl: string, content: string) {
    return prisma.form.update({
        data: {
            submissions: {
                increment: 1,
            },
            FormSubmissions: {
                create: {
                    content,
                },
            },
        },
        where: {
            shareURL : formUrl,
            published: true,
        },
    });
}

export async function GetFormWithSubmissions(id: number) {
    const user = await currentUser();
    if (!user) {
        throw new UserNotFoundErr();
    }

    return prisma.form.findUnique({
        where: {
            userId: user.id,
            id,
        },
        include: {
            FormSubmissions: true,
        },
    });
}

export async function DeleteForm(id: number) {
    const user = await currentUser();

    if (!user) {
        throw new UserNotFoundErr();
    }

    // Delete submissions first (optional, can be combined)
    await prisma.formSubmissions.deleteMany({ where: { formId: id } });

    // Delete the form
    await prisma.form.delete({ where: { id, userId: user.id } });

    revalidatePath('/', 'page');
    redirect('/');
}

export async function EditFormName(id: number, name: string) {
    const user = await currentUser();

    if (!user) {
        throw new UserNotFoundErr();
    }

    await prisma.form.update({
        data: {
            name,
        },
        where: {
            id,
            userId: user.id,
        },
    });

    revalidatePath('/', 'page');
}
