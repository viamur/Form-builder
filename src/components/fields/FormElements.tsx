import { TextFieldFormElement } from '@/components/fields/text-field/TextField';
import React, { Dispatch, SetStateAction } from 'react';
import { TitleFieldFormElement } from '@/components/fields/title-field/TitleField';
import { SubTitleFieldFormElement } from '@/components/fields/subtitle-field/SubTitleField';
import { ParagraphFieldFormElement } from '@/components/fields/paragraph-field/ParagraphField';
import { SeparatorFieldFormElement } from '@/components/fields/separator-field/SeparatorField';
import { SpacerFieldFormElement } from '@/components/fields/spacer-field/SpacerField';
import { NumberFieldFormElement } from '@/components/fields/number-field/NumberField';
import { TextAreaFieldFormElement } from '@/components/fields/textarea-field/TextAreaField';
import { DateFieldFormElement } from '@/components/fields/date-field/DateField';
import { SelectFieldFormElement } from '@/components/fields/select-field/SelectField';
import { CheckboxFieldFormElement } from '@/components/fields/checkbox-field/CheckboxField';

export type ElementsType =
    | 'TextField'
    | 'TitleField'
    | 'SubTitleField'
    | 'ParagraphField'
    | 'SeparatorField'
    | 'SpacerField'
    | 'NumberField'
    | 'TextAreaField'
    | 'DateField'
    | 'SelectField'
    | 'CheckboxField';

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
    extraAttributes?: Record<string, string | number | boolean | string[]>;
};

type FormElementsType = {
    [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
    TextField     : TextFieldFormElement,
    TitleField    : TitleFieldFormElement,
    SubTitleField : SubTitleFieldFormElement,
    ParagraphField: ParagraphFieldFormElement,
    SeparatorField: SeparatorFieldFormElement,
    SpacerField   : SpacerFieldFormElement,
    NumberField   : NumberFieldFormElement,
    TextAreaField : TextAreaFieldFormElement,
    DateField     : DateFieldFormElement,
    SelectField   : SelectFieldFormElement,
    CheckboxField : CheckboxFieldFormElement
};
