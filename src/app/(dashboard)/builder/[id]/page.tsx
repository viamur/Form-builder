import { GetFormById } from '@/actions/form';
import React from 'react';
import FormBuilder from '@/components/form-builder/FormBuilder';

type BuilderPageProps = {
    params: {
        id: string;
    };
};

async function BuilderPage({ params }: BuilderPageProps) {
    const form = await GetFormById(Number(params.id));
    if (!form) {
        throw new Error('form not found');
    }
    return <FormBuilder form={form} />;
}

export default BuilderPage;
