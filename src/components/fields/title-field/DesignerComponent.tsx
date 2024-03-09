import { FormElement } from '@/components/form-builder/designer/FormElements';
import { CustomInstance } from './TitleField';
import { Label } from '@/components/ui/label';
import { ComponentProps } from 'react';

type Props = ComponentProps<FormElement['designerComponent']>;

export default function DesignerComponent({ elementInstance }: Props) {
    const element = elementInstance as CustomInstance;
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">Title field</Label>
            <p className="text-xl">{element.extraAttributes.title}</p>
        </div>
    );
}
