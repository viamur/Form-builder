import { FormElement } from '@/components/fields/FormElements';
import { Label } from '@/components/ui/label';
import { ComponentProps } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { CustomInstance } from './CheckboxField';

type Props = ComponentProps<FormElement['designerComponent']>;

export default function DesignerComponent({ elementInstance }: Props) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;
    const id = `checkbox-${element.id}`;
    return (
        <div className="flex items-start space-x-2">
            <Checkbox id={id} />
            <div className="grid gap-1.5 leading-none">
                <Label htmlFor={id}>
                    {label}
                    {required && <span className="text-red-500">*</span>}
                </Label>
                {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
            </div>
        </div>
    );
}
