import { FormElement, FormElementInstance } from '@/components/fields/FormElements';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';
import { BsTextareaResize } from 'react-icons/bs';

export type CustomInstance = {
    extraAttributes: typeof extraAttributes;
} & FormElementInstance;

export const extraAttributes = {
    label      : 'Text area',
    helperText : 'Helper text',
    placeholder: 'Enter your text here',
    rows       : 3,
    required   : false
};

function validateExtraAttributes(formElement: FormElementInstance, currentValue: string) {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
        return currentValue.length > 0;
    }
    return true;
}

export const TextAreaFieldFormElement: FormElement = {
    type     : 'TextAreaField',
    construct: (id: string) => ({
        id,
        type: 'TextAreaField',
        extraAttributes
    }),
    designerBtnElement: {
        icon : BsTextareaResize,
        label: 'TextArea field'
    },
    designerComponent  : DesignerComponent,
    formComponent      : FormComponent,
    propertiesComponent: PropertiesComponent,
    validate           : validateExtraAttributes
};
