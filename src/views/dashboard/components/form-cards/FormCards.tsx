import { GetForms } from '@/server-actions/server-actions';
import FormCard from './FormCard';

async function FormCards() {
    const forms = await GetForms();
    return (
        <>
            {forms.map((form) => (
                <FormCard key={form.id} form={form} />
            ))}
        </>
    );
}

export default FormCards;
