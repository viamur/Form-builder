import { FormElement } from '@/components/form-builder/designer/FormElements';
import { ComponentProps, useEffect } from 'react';

type Props = ComponentProps<FormElement['propertiesComponent']>;

export default function PropertiesComponent({}: Props) {
    return <p>No properties for this element</p>;
}
