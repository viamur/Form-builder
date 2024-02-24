import { FormElement } from '@/components/form-builder/designer/FormElements';
import { MdTextFields } from 'react-icons/md';

export const TextFieldFormElement: FormElement = {
    type: 'TextField',
    construct: (id: string) => ({
        id,
        type: 'TextField',
        extraAttributes: {
            label: 'Text Field',
            helperText: 'Helper text',
            placeholder: 'Enter your text here',
            required: false,
        }
    }),
    designerBtnElement: {
        icon: MdTextFields,
        label: 'Text Field',
    },
    designerComponent: () => <div>Designer component</div>,
    formComponent: () => <div>Form component</div>,
    propertiesComponent: () => <div>Properties component</div>,
    validate: () => true,
}
