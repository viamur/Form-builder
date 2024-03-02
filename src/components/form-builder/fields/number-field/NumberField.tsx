import { FormElement, FormElementInstance } from '@/components/form-builder/designer/FormElements';
import DesignerComponent from '@/components/form-builder/fields/text-field/DesignerComponent';
import PropertiesComponent from '@/components/form-builder/fields/text-field/PropertiesComponent';
import FormComponent from '@/components/form-builder/fields/text-field/FormComponent';
import { Bs123 } from 'react-icons/bs';

export type CustomInstance = {
    extraAttributes: typeof extraAttributes;
} & FormElementInstance;

export const extraAttributes = {
    label: 'Number field',
    helperText: 'Helper text',
    placeholder: '0',
    required: false
};

function validateExtraAttributes(formElement: FormElementInstance, currentValue: string) {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
        return currentValue.length > 0;
    }
    return true;
}

export const NumberFieldFormElement: FormElement = {
    type: 'NumberField',
    construct: (id: string) => ({
        id,
        type: 'NumberField',
        extraAttributes
    }),
    designerBtnElement: {
        icon: Bs123,
        label: 'Number field'
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: validateExtraAttributes
};
