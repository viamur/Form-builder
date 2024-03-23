import { FormElement, FormElementInstance } from '@/components/fields/FormElements';
import { RxDropdownMenu } from 'react-icons/rx';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';

export const extraAttributes = {
    label      : 'Select field',
    helperText : 'Helper text',
    placeholder: 'Select an option',
    required   : false,
    options    : [],
};

export type CustomInstance = {
    extraAttributes: typeof extraAttributes;
} & FormElementInstance;

function validateExtraAttributes(formElement: FormElementInstance, currentValue: string) {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
        return currentValue.length > 0;
    }
    return true;
}

export const SelectFieldFormElement: FormElement = {
    type     : 'SelectField',
    construct: (id: string) => ({
        id,
        type: 'SelectField',
        extraAttributes,
    }),
    designerBtnElement: {
        icon : RxDropdownMenu,
        label: 'Select field',
    },
    designerComponent  : DesignerComponent,
    formComponent      : FormComponent,
    propertiesComponent: PropertiesComponent,
    validate           : validateExtraAttributes,
};
