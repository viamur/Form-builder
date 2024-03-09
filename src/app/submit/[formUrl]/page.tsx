import { GetFormContentByUrl } from '@/actions/server-actions';
import { FormElementInstance } from '@/components/form-builder/fields/FormElements';
import FormSubmitComponent from '@/components/form-submit/FormSubmitComponent';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Submit Form',
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
};

type SubmitPageProps = {
    params: {
        formUrl: string;
    };
};

async function SubmitPage({ params }: SubmitPageProps) {
    const form = await GetFormContentByUrl(params.formUrl);
    if (!form) {
        notFound();
    }

    const formContent = JSON.parse(form.content) as FormElementInstance[];

    return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
}

export default SubmitPage;
