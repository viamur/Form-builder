import { GetFormById } from '@/actions/server-actions';
import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FormDetails from '@/views/form-details/FormDetails';

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

    return <FormDetails form={form} />
}

export default FormDetailsPage;
