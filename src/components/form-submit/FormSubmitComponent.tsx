'use client';

import { FormElementInstance, FormElements } from '@/components/form-builder/designer/FormElements';

type Props = {
    formUrl: string;
    content: FormElementInstance[];
}
export default function FormSubmitComponent({ formUrl, content }: Props) {
    return (
        <div className="flex justify-center w-full h-full items-center p-8">
            <div className=" max-w-[620px] flex flex-col gap-4 flex-grow bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-gray-700/20 rounded-xl">
                {content.map((element) => {
                    const FormElement = FormElements[element.type].formComponent;
                    return <FormElement key={element.id} elementInstance={element} />;
                })}
            </div>
        </div>
    )
}
