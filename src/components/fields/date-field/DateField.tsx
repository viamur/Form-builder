import { BsFillCalendarDateFill } from 'react-icons/bs';
import { FormElement, FormElementInstance } from '../FormElements';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';

export const extraAttributes = {
    label     : 'Date field',
    helperText: 'Pick a date',
    required  : false,
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

export const DateFieldFormElement: FormElement = {
    type     : 'DateField',
    construct: (id: string) => ({
        id,
        type: 'DateField',
        extraAttributes,
    }),
    designerBtnElement: {
        icon : BsFillCalendarDateFill,
        label: 'Date field',
    },
    designerComponent  : DesignerComponent,
    formComponent      : FormComponent,
    propertiesComponent: PropertiesComponent,
    validate           : validateExtraAttributes,
};
