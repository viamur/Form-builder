import { FormElement, FormElementInstance } from '@/components/form-builder/designer/FormElements';
import { MdTextFields } from 'react-icons/md';
import DesignerComponent from '@/components/form-builder/fields/text-field/DesignerComponent';
import PropertiesComponent from '@/components/form-builder/fields/text-field/PropertiesComponent';
import { z } from 'zod';

export type CustomInstance = {
    extraAttributes: typeof extraAttributes
} & FormElementInstance;

export const extraAttributes = {
    label: 'Text Field',
    helperText: 'Helper text',
    placeholder: 'Enter your text here',
    required: false,
}

export const TextFieldFormElement: FormElement = {
    type: 'TextField',
    construct: (id: string) => ({
        id,
        type: 'TextField',
        extraAttributes
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: 'Text Field',
    },
    designerComponent: DesignerComponent,
    formComponent: () => <div>Form component</div>,
    propertiesComponent: PropertiesComponent,
    validate: () => true,
}
