import { FormElement } from '@/components/fields/FormElements';
import { ComponentProps } from 'react';
import { Separator } from '@/components/ui/separator';

type Props = ComponentProps<FormElement['formComponent']>;

export default function FormComponent({}: Props) {
    return <Separator />;
}
