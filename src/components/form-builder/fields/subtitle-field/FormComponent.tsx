import { FormElement } from '@/components/form-builder/designer/FormElements';
import { ComponentProps } from 'react';
import { CustomInstance } from './SubTitleField';

type Props = ComponentProps<FormElement['formComponent']>;

export default function FormComponent({ elementInstance }: Props) {
    const element = elementInstance as CustomInstance;
    const { title } = element.extraAttributes;

    return <p className="text-lg">{title}</p>;
}
