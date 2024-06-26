import { FormElement } from '@/components/fields/FormElements';
import { Label } from '@/components/ui/label';
import { ComponentProps } from 'react';
import { LuSeparatorHorizontal } from 'react-icons/lu';
import { CustomInstance } from './SpacerField';

type Props = ComponentProps<FormElement['designerComponent']>;

export default function DesignerComponent({ elementInstance }: Props) {
    const element = elementInstance as CustomInstance;
    return (
        <div className="flex flex-col gap-2 w-full items-center">
            <Label className="text-muted-foreground">{`Spacer field: ${element.extraAttributes.height}px`}</Label>
            <LuSeparatorHorizontal className="h-8 w-8" />
        </div>
    );
}
