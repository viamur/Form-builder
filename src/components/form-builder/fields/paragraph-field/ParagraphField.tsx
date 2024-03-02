import { FormElement, FormElementInstance } from '@/components/form-builder/designer/FormElements';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';
import { BsTextParagraph } from 'react-icons/bs';

export type CustomInstance = {
    extraAttributes: typeof extraAttributes;
} & FormElementInstance;

export const extraAttributes = {
    text: 'Text here',
};

export const ParagraphFieldFormElement: FormElement = {
    type: 'ParagraphField',
    construct: (id: string) => ({
        id,
        type: 'ParagraphField',
        extraAttributes
    }),
    designerBtnElement: {
        icon: BsTextParagraph,
        label: 'Paragraph Field'
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: () => true
};
