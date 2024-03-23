import { FormElement, FormElementInstance } from '@/components/fields/FormElements';
import { Bs123 } from 'react-icons/bs';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';

export const extraAttributes = {
    label      : 'Number field',
    helperText : 'Helper text',
    placeholder: '0',
    required   : false,
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

export const NumberFieldFormElement: FormElement = {
    type     : 'NumberField',
    construct: (id: string) => ({
        id,
        type: 'NumberField',
        extraAttributes,
    }),
    designerBtnElement: {
        icon : Bs123,
        label: 'Number field',
    },
    designerComponent  : DesignerComponent,
    formComponent      : FormComponent,
    propertiesComponent: PropertiesComponent,
    validate           : validateExtraAttributes,
};
