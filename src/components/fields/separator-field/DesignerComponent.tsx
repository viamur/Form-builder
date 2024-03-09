import { FormElement } from '@/components/form-builder/fields/FormElements';
import { Label } from '@/components/ui/label';
import { ComponentProps } from 'react';
import { Separator } from '@/components/ui/separator';

type Props = ComponentProps<FormElement['designerComponent']>;

export default function DesignerComponent({}: Props) {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className="text-muted-foreground">Separator field</Label>
            <Separator />
        </div>
    );
}
