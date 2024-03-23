import { FormElement } from '@/components/fields/FormElements';
import { Label } from '@/components/ui/label';
import { ComponentProps } from 'react';
import { CustomInstance } from './ParagraphField';

type Props = ComponentProps<FormElement['designerComponent']>;

export default function DesignerComponent({ elementInstance }: Props) {
    const element = elementInstance as CustomInstance;
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">Paragraph field</Label>
            <p>{element.extraAttributes.text}</p>
        </div>
    );
}
