import { GetFormContentByUrl } from '@/actions/form';
import { FormElementInstance } from '@/components/form-builder/designer/FormElements';
import FormSubmitComponent from '@/components/form-submit/FormSubmitComponent';

type SubmitPageProps = {
    params: {
        formUrl: string;
    };
};

async function SubmitPage({ params }: SubmitPageProps) {
    const form = await GetFormContentByUrl(params.formUrl);
    if (!form) {
        throw new Error('Form not found');
    }

    const formContent = JSON.parse(form.content) as FormElementInstance[];

    return <FormSubmitComponent formUrl={params.formUrl} content={formContent} />;
}

export default SubmitPage;
