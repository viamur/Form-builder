import { FormElement } from '@/components/form-builder/fields/FormElements';
import { ComponentProps } from 'react';
import { CustomInstance } from './ParagraphField';

type Props = ComponentProps<FormElement['formComponent']>;

export default function FormComponent({ elementInstance }: Props) {
    const element = elementInstance as CustomInstance;

    return <p>{element.extraAttributes.text}</p>;
}
