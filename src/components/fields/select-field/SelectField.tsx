import { FormElement, FormElementInstance } from '@/components/fields/FormElements';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';
import { RxDropdownMenu } from 'react-icons/rx';

export type CustomInstance = {
    extraAttributes: typeof extraAttributes;
} & FormElementInstance;

export const extraAttributes = {
    label: 'Select field',
    helperText: 'Helper text',
    placeholder: 'Select an option',
    required: false,
    options: []
};

function validateExtraAttributes(formElement: FormElementInstance, currentValue: string) {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
        return currentValue.length > 0;
    }
    return true;
}

export const SelectFieldFormElement: FormElement = {
    type: 'SelectField',
    construct: (id: string) => ({
        id,
        type: 'SelectField',
        extraAttributes
    }),
    designerBtnElement: {
        icon: RxDropdownMenu,
        label: 'Select field'
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: validateExtraAttributes
};
