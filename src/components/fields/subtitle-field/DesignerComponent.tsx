import { FormElement } from '@/components/fields/FormElements';
import { Label } from '@/components/ui/label';
import { ComponentProps } from 'react';
import { CustomInstance } from './SubTitleField';

type Props = ComponentProps<FormElement['designerComponent']>;

export default function DesignerComponent({ elementInstance }: Props) {
    const element = elementInstance as CustomInstance;
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">SubTitle field</Label>
            <p className="text-lg">{element.extraAttributes.title}</p>
        </div>
    );
}
