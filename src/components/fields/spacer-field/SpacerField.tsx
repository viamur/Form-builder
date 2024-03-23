import { FormElement, FormElementInstance } from '@/components/fields/FormElements';
import { LuSeparatorHorizontal } from 'react-icons/lu';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';

export const extraAttributes = {
    height: 20,
};

export type CustomInstance = {
    extraAttributes: typeof extraAttributes;
} & FormElementInstance;

export const SpacerFieldFormElement: FormElement = {
    type     : 'SpacerField',
    construct: (id: string) => ({
        id,
        type: 'SpacerField',
        extraAttributes,
    }),
    designerBtnElement: {
        icon : LuSeparatorHorizontal,
        label: 'Spacer field',
    },
    designerComponent  : DesignerComponent,
    formComponent      : FormComponent,
    propertiesComponent: PropertiesComponent,
    validate           : () => true,
};
