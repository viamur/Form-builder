'use client';

import { FormElement } from '@/components/fields/FormElements';
import { Button } from '@/components/ui/button';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';

type Props = {
    formElement: FormElement;
};

function SidebarButton({ formElement }: Props) {
    const { label, icon: Icon } = formElement.designerBtnElement;
    const draggable = useDraggable({
        id  : `designer-btn-${formElement.type}`,
        data: {
            type                : formElement.type,
            isDesignerBtnElement: true
        }
    });
    return (
        <Button
            ref={draggable.setNodeRef}
            variant="outline"
            className={cn(
                'flex flex-col gap-2 h-[120px] w-[120px] cursor-grab',
                draggable.isDragging && 'border-red-500 border-2 border-dashed bg-accent'
            )}
            {...draggable.listeners}
            {...draggable.attributes}
        >
            <Icon className="h-8 w-8 text-primary cursor-grab" />
            <p className="text-xs">{label}</p>
        </Button>
    );
}

export default SidebarButton;
