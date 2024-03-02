import { FormElement, FormElementInstance } from '@/components/form-builder/designer/FormElements';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';
import { LuHeading1 } from 'react-icons/lu';

export type CustomInstance = {
    extraAttributes: typeof extraAttributes;
} & FormElementInstance;

export const extraAttributes = {
    title: 'Title Field'
};

export const TitleFieldFormElement: FormElement = {
    type: 'TitleField',
    construct: (id: string) => ({
        id,
        type: 'TitleField',
        extraAttributes
    }),
    designerBtnElement: {
        icon: LuHeading1,
        label: 'Title field'
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true
};
