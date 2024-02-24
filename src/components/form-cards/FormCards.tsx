import { GetForms } from '@/actions/form';
import FormCard from '@/components/form-cards/FormCard';

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
