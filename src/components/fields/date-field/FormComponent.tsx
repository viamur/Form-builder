import { FormElement } from '@/components/fields/FormElements';
import { ComponentProps, useState } from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { CustomInstance, DateFieldFormElement } from './DateField';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';

type Props = ComponentProps<FormElement['formComponent']>;

export default function FormComponent({
    elementInstance,
    submitValue,
    isInvalid,
    setError,
    defaultValue
}: Props) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;

    const [value, setValue] = useState(defaultValue ? new Date(defaultValue) : undefined);

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className={cn(isInvalid && 'text-red-500')}>
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            'w-full justify-start text-left font-normal',
                            !value && 'text-muted-foreground',
                            isInvalid && 'border-red-500'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? format(value, 'PPP') : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={value}
                        initialFocus
                        onSelect={(date) => {
                            setValue(date);
                            if (!submitValue) return;
                            const value = date?.toUTCString() || '';
                            const valid = DateFieldFormElement.validate(element, value);
                            if (!setError) return;
                            setError((prev) => ({ ...prev, [element.id]: !valid }));
                            submitValue(element.id, value);
                        }}
                    />
                </PopoverContent>
            </Popover>
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
