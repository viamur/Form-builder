import { TextFieldFormElement } from '@/components/form-builder/fields/text-field/TextField';
import { Dispatch, SetStateAction } from 'react';
import { TitleFieldFormElement } from '@/components/form-builder/fields/title-field/TitleField';
import { SubTitleFieldFormElement } from '@/components/form-builder/fields/subtitle-field/SubTitleField';
import { ParagraphFieldFormElement } from '@/components/form-builder/fields/paragraph-field/ParagraphField';
import { SeparatorFieldFormElement } from '@/components/form-builder/fields/separator-field/SeparatorField';
import { SpacerFieldFormElement } from '@/components/form-builder/fields/spacer-field/SpacerField';
import { NumberFieldFormElement } from '@/components/form-builder/fields/number-field/NumberField';

export type ElementsType =
    | 'TextField'
    | 'TitleField'
    | 'SubTitleField'
    | 'ParagraphField'
    | 'SeparatorField'
    | 'SpacerField'
    | 'NumberField';

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
    type: ElementsType;

    construct: (id: string) => FormElementInstance;

    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    };

    designerComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue?: SubmitFunction;
        isInvalid?: boolean;
        defaultValue?: string;
        setError?: Dispatch<SetStateAction<Record<string, boolean>>>;
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;

    validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
};

type FormElementsType = {
    [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubTitleField: SubTitleFieldFormElement,
    ParagraphField: ParagraphFieldFormElement,
    SeparatorField: SeparatorFieldFormElement,
    SpacerField: SpacerFieldFormElement,
    NumberField: NumberFieldFormElement,
};
