import { FormElement, FormElementInstance } from '@/components/form-builder/designer/FormElements';
import { CustomInstance } from '@/components/form-builder/fields/text-field/TextField';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ComponentProps } from 'react';

type Props = ComponentProps<FormElement['designerComponent']>;

export default function DesignerComponent({ elementInstance }: Props) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeholder, helperText } = element.extraAttributes;
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Input readOnly disabled placeholder={placeholder} />
            {helperText && <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>}
        </div>
    );
}
