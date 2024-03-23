import { FormElement, FormElementInstance } from '@/components/fields/FormElements';
import { IoMdCheckbox } from 'react-icons/io';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';

export const extraAttributes = {
    label     : 'Checkbox field',
    helperText: 'Helper text',
    required  : false,
};

export type CustomInstance = {
    extraAttributes: typeof extraAttributes;
} & FormElementInstance;

function validateExtraAttributes(formElement: FormElementInstance, currentValue: string) {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
        return currentValue === 'true';
    }
    return true;
}

export const CheckboxFieldFormElement: FormElement = {
    type     : 'CheckboxField',
    construct: (id: string) => ({
        id,
        type: 'CheckboxField',
        extraAttributes,
    }),
    designerBtnElement: {
        icon : IoMdCheckbox,
        label: 'Checkbox field',
    },
    designerComponent  : DesignerComponent,
    formComponent      : FormComponent,
    propertiesComponent: PropertiesComponent,
    validate           : validateExtraAttributes,
};
