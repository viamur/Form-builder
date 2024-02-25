import { FormElement } from '@/components/form-builder/designer/FormElements';
import { ComponentProps } from 'react';
import { CustomInstance } from '@/components/form-builder/fields/text-field/TextField';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type Props = ComponentProps<FormElement['formComponent']>

export default function FormComponent({ elementInstance }: Props) {
    const element = elementInstance as CustomInstance;
    const {label, required, placeholder, helperText} = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Input placeholder={placeholder} />
            {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
        </div>
    )
}
