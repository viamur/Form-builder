import { FormElement, FormElementInstance } from '@/components/form-builder/designer/FormElements';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';
import { LuHeading2 } from 'react-icons/lu';

export type CustomInstance = {
    extraAttributes: typeof extraAttributes;
} & FormElementInstance;

export const extraAttributes = {
    title: 'SubTitle Field'
};

export const SubTitleFieldFormElement: FormElement = {
    type: 'SubTitleField',
    construct: (id: string) => ({
        id,
        type: 'SubTitleField',
        extraAttributes
    }),
    designerBtnElement: {
        icon: LuHeading2,
        label: 'SubTitle field'
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true
};
