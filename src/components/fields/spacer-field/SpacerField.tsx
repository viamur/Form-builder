import { FormElement, FormElementInstance } from '@/components/form-builder/designer/FormElements';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';
import { LuSeparatorHorizontal } from 'react-icons/lu';

export type CustomInstance = {
    extraAttributes: typeof extraAttributes;
} & FormElementInstance;

export const extraAttributes = {
    height: 20
};

export const SpacerFieldFormElement: FormElement = {
    type: 'SpacerField',
    construct: (id: string) => ({
        id,
        type: 'SpacerField',
        extraAttributes
    }),
    designerBtnElement: {
        icon: LuSeparatorHorizontal,
        label: 'Spacer field'
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true
};
