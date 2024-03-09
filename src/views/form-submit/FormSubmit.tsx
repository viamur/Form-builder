'use client';

import { useRef, useState, useTransition } from 'react';
import { HiCursorClick } from 'react-icons/hi';
import { ImSpinner2 } from 'react-icons/im';
import { FormElementInstance, FormElements } from '@/components/fields/FormElements';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { SubmitForm } from '@/server-actions/server-actions';
import { ScrollArea } from '@/components/ui/scroll-area';
import FormSubmittedSuccessfully from './components/FormSubmittedSuccessfully';

type Props = {
    formUrl: string;
    content: FormElementInstance[];
};
export default function FormSubmit({ formUrl, content }: Props) {
    const formValues = useRef<Record<string, string>>({});
    const [pending, setTransition] = useTransition();
    const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        const formErrors: Record<string, boolean> = {};
        for (const field of content) {
            const actualValue = formValues.current[field.id] || '';
            const valid = FormElements[field.type].validate(field, actualValue);
            if (!valid) {
                formErrors[field.id] = true;
            }
        }
        setFormErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const submitValue = (key: string, value: string) => (formValues.current[key] = value);
    const submitForm = async () => {
        const valid = validateForm();
        if (!valid) {
            toast({
                title      : 'Form is invalid',
                description: 'Please check the form for errors',
                variant    : 'destructive'
            });
            return;
        }

        try {
            const JSONData = JSON.stringify(formValues.current);
            await SubmitForm(formUrl, JSONData);

            setTimeout(() => {
                window.close();
            }, 3000);

            setSubmitted(true);
        } catch (error) {
            toast({
                title      : 'Form submission failed',
                description: 'Please try again later',
                variant    : 'destructive'
            });
        }
    };

    if (submitted) {
        return <FormSubmittedSuccessfully />;
    }

    return (
        <ScrollArea className="w-full h-full flex-grow" type="auto">
            <div className="flex justify-center w-full h-full items-center p-8">
                <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-gray-700/20 rounded-xl">
                    {content.map((element) => {
                        const FormElement = FormElements[element.type].formComponent;
                        return (
                            <FormElement
                                key={element.id}
                                elementInstance={element}
                                submitValue={submitValue}
                                isInvalid={formErrors[element.id]}
                                setError={setFormErrors}
                                defaultValue={formValues.current[element.id]}
                            />
                        );
                    })}
                    <Button
                        className="mt-8"
                        disabled={pending}
                        onClick={() => setTransition(submitForm)}
                    >
                        {pending && <ImSpinner2 className="mr-2" />}
                        {!pending && (
                            <>
                                <HiCursorClick className="mr-2" />
                                Submit
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </ScrollArea>
    );
}
