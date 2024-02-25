import { GetFormContentByUrl } from '../../../actions/form';
import { FormElementInstance } from '../../../components/form-builder/designer/FormElements';

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

    return <div>{formContent.map((f) => f.type)}</div>;
}

export default SubmitPage;
