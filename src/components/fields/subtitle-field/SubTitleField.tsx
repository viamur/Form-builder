import { FormElement, FormElementInstance } from '@/components/fields/FormElements';
import { LuHeading2 } from 'react-icons/lu';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';

export const extraAttributes = {
    title: 'SubTitle Field',
};

export type CustomInstance = {
    extraAttributes: typeof extraAttributes;
} & FormElementInstance;

export const SubTitleFieldFormElement: FormElement = {
    type     : 'SubTitleField',
    construct: (id: string) => ({
        id,
        type: 'SubTitleField',
        extraAttributes,
    }),
    designerBtnElement: {
        icon : LuHeading2,
        label: 'SubTitle field',
    },
    designerComponent  : DesignerComponent,
    formComponent      : FormComponent,
    propertiesComponent: PropertiesComponent,
    validate           : () => true,
};
