import { FormElement } from '@/components/form-builder/designer/FormElements';
import { ComponentProps } from 'react';
import { CustomInstance } from './SpacerField';

type Props = ComponentProps<FormElement['formComponent']>;

export default function FormComponent({ elementInstance }: Props) {
    const element = elementInstance as CustomInstance;
    const { height } = element.extraAttributes;

    return <div style={{ height, width: '100%'}} />;
}
