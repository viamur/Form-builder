import { FormElement, FormElementInstance } from '@/components/fields/FormElements';
import { BsTextParagraph } from 'react-icons/bs';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';

export const extraAttributes = {
    text: 'Text here',
};

export type CustomInstance = {
    extraAttributes: typeof extraAttributes;
} & FormElementInstance;

export const ParagraphFieldFormElement: FormElement = {
    type     : 'ParagraphField',
    construct: (id: string) => ({
        id,
        type: 'ParagraphField',
        extraAttributes,
    }),
    designerBtnElement: {
        icon : BsTextParagraph,
        label: 'Paragraph Field',
    },
    designerComponent  : DesignerComponent,
    formComponent      : FormComponent,
    propertiesComponent: PropertiesComponent,
    validate           : () => true,
};
