import { FormElement } from '@/components/form-builder/designer/FormElements';
import { MdTextFields } from 'react-icons/md';
import DesignerComponent from '@/components/form-builder/fields/text-field/DesignerComponent';

export const extraAttributes = {
    label: 'Text Field',
    helperText: 'Helper text',
    placeholder: 'Enter your text here',
    required: false,
}

export const TextFieldFormElement: FormElement = {
    type: 'TextField',
    construct: (id: string) => ({
        id,
        type: 'TextField',
        extraAttributes
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: 'Text Field',
    },
    designerComponent: DesignerComponent,
    formComponent: () => <div>Form component</div>,
    propertiesComponent: () => <div>Properties component</div>,
    validate: () => true,
}
