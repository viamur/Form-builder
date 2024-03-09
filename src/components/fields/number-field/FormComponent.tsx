import { FormElement } from '@/components/form-builder/designer/FormElements';
import { ComponentProps, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import {
    NumberFieldFormElement,
    CustomInstance
} from './NumberField';

type Props = ComponentProps<FormElement['formComponent']>;

export default function FormComponent({
    elementInstance,
    submitValue,
    isInvalid,
    setError,
    defaultValue
}: Props) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeholder, helperText } = element.extraAttributes;

    const [value, setValue] = useState(defaultValue || '');

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className={cn(isInvalid && 'text-red-500')}>
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
                type="number"
                placeholder={placeholder}
                onChange={(e) => setValue(e.target.value)}
                onBlur={() => {
                    if (submitValue) {
                        const valid = NumberFieldFormElement.validate(element, value);
                        setError?.((prev) => ({ ...prev, [element.id]: !valid }));
                        submitValue(element.id, value);
                    }
                }}
                value={value}
            />
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
