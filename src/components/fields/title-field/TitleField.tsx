import { FormElement, FormElementInstance } from '@/components/fields/FormElements';
import { LuHeading1 } from 'react-icons/lu';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';

export const extraAttributes = {
    title: 'Title Field',
};

export type CustomInstance = {
    extraAttributes: typeof extraAttributes;
} & FormElementInstance;

export const TitleFieldFormElement: FormElement = {
    type     : 'TitleField',
    construct: (id: string) => ({
        id,
        type: 'TitleField',
        extraAttributes,
    }),
    designerBtnElement: {
        icon : LuHeading1,
        label: 'Title field',
    },
    designerComponent  : DesignerComponent,
    formComponent      : FormComponent,
    propertiesComponent: PropertiesComponent,
    validate           : () => true,
};
