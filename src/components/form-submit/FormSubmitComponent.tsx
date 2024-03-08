'use client';

import { FormElementInstance, FormElements } from '@/components/form-builder/designer/FormElements';
import { Button } from '@/components/ui/button';
import { HiCursorClick } from 'react-icons/hi';
import { FaCheck } from 'react-icons/fa';
import { useEffect, useRef, useState, useTransition } from 'react';
import { toast } from '@/components/ui/use-toast';
import { ImSpinner2 } from 'react-icons/im';
import { SubmitForm } from '@/actions/server-actions';

type Props = {
    formUrl: string;
    content: FormElementInstance[];
};
export default function FormSubmitComponent({ formUrl, content }: Props) {
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
                title: 'Form is invalid',
                description: 'Please check the form for errors',
                variant: 'destructive'
            });
            return;
        }

        try {
            const JSONData = JSON.stringify(formValues.current);
            await SubmitForm(formUrl, JSONData);
            setSubmitted(true);
        } catch (error) {
            toast({
                title: 'Form submission failed',
                description: 'Please try again later',
                variant: 'destructive'
            });
        }
    };

    useEffect(() => {
        if (submitted) {
            setTimeout(() => {
                window.close();
            }, 3000);
        }
    }, [submitted]);

    if (submitted) {
        return (
            <div className="flex justify-center w-full h-full items-center p-8">
                <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-gray-700/20 rounded-xl">
                    <div className="flex flex-row items-center gap-2 justify-center">
                        <FaCheck className="w-[26px] h-[26px] fill-green-700" />
                        <h1 className="text-2xl font-bold text-center">Form Submitted</h1>
                    </div>
                    <p className="text-muted-foreground text-center">
                        Thank you for submitting the form. This page will close in a few seconds.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-center w-full h-full items-center p-8">
            <div className=" max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-gray-700/20 rounded-xl">
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
    );
}
