import { FormElement } from '@/components/fields/FormElements';
import { ComponentProps, useState } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckboxFieldFormElement, CustomInstance } from './CheckboxField';

type Props = ComponentProps<FormElement['formComponent']>

export default function FormComponent({
    elementInstance,
    submitValue,
    isInvalid,
    setError,
    defaultValue,
}: Props) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;

    const [value, setValue] = useState<boolean>(defaultValue === 'true');

    const id = `checkbox-${element.id}`;
    return (
        <div className="flex items-start space-x-2">
            <Checkbox
                id={id}
                checked={value}
                className={cn(isInvalid && 'border-red-500')}
                onCheckedChange={(checked) => {
                    const value = checked === true;
                    setValue(value);
                    if (!submitValue) return;
                    const valid = CheckboxFieldFormElement.validate(element, value.toString());
                    if (setError) {
                        setError((prev) => ({ ...prev, [element.id]: !valid }));
                    }
                    submitValue(element.id, value.toString());
                }}
            />
            <div className="grid gap-1.5 leading-none">
                <Label htmlFor={id} className={cn(isInvalid && 'text-red-500')}>
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </Label>
                {helperText && (
                    <p
                        className={cn(
                            'text-muted-foreground text-[0.8rem]',
                            isInvalid && 'text-red-500',
                        )}
                    >
                        {helperText}
                    </p>
                )}
            </div>
        </div>
    );
}
