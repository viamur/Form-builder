import { GetFormById } from '@/server-actions/server-actions';
import React from 'react';
import FormBuilder from '@/views/form-builder/FormBuilder';
import { notFound } from 'next/navigation';

type BuilderPageProps = {
    params: {
        id: string;
    };
};

async function BuilderPage({ params }: BuilderPageProps) {
    const form = await GetFormById(Number(params.id));
    if (!form) {
        notFound();
    }
    return <FormBuilder form={form} />;
}

export default BuilderPage;
