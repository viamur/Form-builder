import { GetFormById } from '@/actions/server-actions';
import React from 'react';
import VisitFormBtn from '@/components/form-details/VisitFormBtn';
import FormLinkShare from '@/components/form-details/FormLinkShare';
import SubmittedFormsTable from '@/components/form-submit/SubmittedFormsTable';
import { notFound } from 'next/navigation';
import DeleteFormBtn from '@/components/form-builder/buttons/DeleteFormBtn';
import RefreshBtn from '@/components/form-details/RefreshBtn';
import EditNameFormBtn from '@/components/form-builder/buttons/EditNameFormBtn';
import type { Metadata } from 'next';
import { StatsCards } from '@/components/stats-cards/StatsCards';

export const metadata: Metadata = {
    title: 'Details',
};

type BuilderPageProps = {
    params: {
        id: string;
    };
};

async function FormDetailsPage({ params }: BuilderPageProps) {
    const form = await GetFormById(Number(params.id));
    if (!form) {
        notFound();
    }

    const { visits, submissions } = form;

    let submissionRate = 0;

    if (visits > 0) {
        submissionRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;

    return (
        <>
            <div className="py-10 border-b border-muted">
                <div className="flex justify-between container">
                    <div className="flex items-center gap-1">
                        <h1 className="text-4xl font-bold truncate">{form.name}</h1>
                        <EditNameFormBtn formId={form.id} formName={form.name} />
                    </div>
                    <div className="flex items-center gap-2">
                        <DeleteFormBtn formId={form.id} />
                        <RefreshBtn />
                        <VisitFormBtn shareURL={form.shareURL} />
                    </div>
                </div>
            </div>
            <div className="py-4 border-b border-muted">
                <FormLinkShare shareURL={form.shareURL} />
            </div>
            <StatsCards
                isContainer
                visits={visits}
                submissions={submissions}
                submissionRate={submissionRate}
                bounceRate={bounceRate}
                loading={false}
            />
            <div className="container py-10">
                <SubmittedFormsTable id={form.id} />
            </div>
        </>
    );
}

export default FormDetailsPage;
