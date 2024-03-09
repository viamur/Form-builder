import { FormElement, FormElementInstance } from '@/components/form-builder/fields/FormElements';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';
import { IoMdCheckbox } from 'react-icons/io';

export type CustomInstance = {
    extraAttributes: typeof extraAttributes;
} & FormElementInstance;

export const extraAttributes = {
    label: 'Checkbox field',
    helperText: 'Helper text',
    required: false
};

function validateExtraAttributes(formElement: FormElementInstance, currentValue: string) {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
        return currentValue === 'true';
    }
    return true;
}

export const CheckboxFieldFormElement: FormElement = {
    type: 'CheckboxField',
    construct: (id: string) => ({
        id,
        type: 'CheckboxField',
        extraAttributes
    }),
    designerBtnElement: {
        icon: IoMdCheckbox,
        label: 'Checkbox field'
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: validateExtraAttributes
};
