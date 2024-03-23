import { FormElement } from '@/components/fields/FormElements';
import { RiSeparator } from 'react-icons/ri';
import DesignerComponent from './DesignerComponent';
import PropertiesComponent from './PropertiesComponent';
import FormComponent from './FormComponent';

// eslint-disable-next-line import/prefer-default-export
export const SeparatorFieldFormElement: FormElement = {
    type     : 'SeparatorField',
    construct: (id: string) => ({
        id,
        type: 'SeparatorField',
    }),
    designerBtnElement: {
        icon : RiSeparator,
        label: 'Separator field',
    },
    designerComponent  : DesignerComponent,
    formComponent      : FormComponent,
    propertiesComponent: PropertiesComponent,
    validate           : () => true,
};
