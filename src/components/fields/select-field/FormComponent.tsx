import { FormElement } from '@/components/form-builder/fields/FormElements';
import { ComponentProps, useState } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { SelectFieldFormElement, CustomInstance } from './SelectField';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';

type Props = ComponentProps<FormElement['formComponent']>;

export default function FormComponent({
    elementInstance,
    submitValue,
    isInvalid,
    setError,
    defaultValue
}: Props) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeholder, helperText, options } = element.extraAttributes;

    const [value, setValue] = useState(defaultValue || '');

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className={cn(isInvalid && 'text-red-500')}>
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Select
                defaultValue={value}
                onValueChange={(value) => {
                    setValue(value);
                    if (!submitValue) return;
                    const valid = SelectFieldFormElement.validate(element, value);
                    submitValue(element.id, value);
                    if (!setError) return;
                    setError((prev) => ({ ...prev, [element.id]: !valid }));
                }}
            >
                <SelectTrigger className={cn('w-full', isInvalid && 'border-red-500')}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem value={option} key={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {helperText && (
                <p
                    className={cn(
                        'text-muted-foreground text-[0.8rem]',
                        isInvalid && 'text-red-500'
                    )}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
}
