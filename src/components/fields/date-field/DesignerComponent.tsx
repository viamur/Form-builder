import { FormElement } from '@/components/fields/FormElements';
import { CustomInstance } from './DateField';
import { Label } from '@/components/ui/label';
import { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from '@radix-ui/react-icons';

type Props = ComponentProps<FormElement['designerComponent']>;

export default function DesignerComponent({ elementInstance }: Props) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>Pick a date</span>
            </Button>
            {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
        </div>
    );
}
