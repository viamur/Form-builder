import { FormElementInstance, FormElements } from '@/components/form-builder/designer/FormElements';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BiSolidTrash } from 'react-icons/bi';
import useDesigner from '@/hooks/useDesigner';

type Props = {
    element: FormElementInstance;
}

export default function DesignerElementWrapper({ element }: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false);

    const {removeElement, setSelectedElement} = useDesigner();

    const DesignerElement = FormElements[element.type].designerComponent;
    const topHalf = useDroppable({
        id: element.id + "-top",
        data: {
            type: element.type,
            elementId: element.id,
            isTopHalfDesignerElement: true,
        }
    })
    const bottomHalf = useDroppable({
        id: element.id + "-bottom",
        data: {
            type: element.type,
            elementId: element.id,
            isBottomHalfDesignerElement: true,
        }
    })

    const draggable = useDraggable({
        id: element.id + '-drag-handler',
        data: {
            type: element.type,
            elementId: element.id,
            isDesignerElement: true,
        }
    })

    if (draggable.isDragging) return null;

    return (
        <div
            ref={draggable.setNodeRef}
            {...draggable.attributes}
            {...draggable.listeners}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
            onClick={(e) => {
                e.stopPropagation();
                setSelectedElement(element);
            }}
            className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset">
            <div
                ref={topHalf.setNodeRef}
                className='absolute top-0 w-full h-1/2 rounded-t-md'
            />
            <div
                ref={bottomHalf.setNodeRef}
                className='absolute bottom-0 w-full h-1/2 rounded-b-md'
            />
            {mouseIsOver && (
                <>
                    <div className="absolute right-0 h-full">
                        <Button
                            variant='outline'
                            onClick={(e) => {
                                e.stopPropagation();
                                removeElement(element.id);
                            }}
                            className="flex justify-center h-full border rounded-md rounded-l-none bg-red-500">
                            <BiSolidTrash className="w-6 h-6" />
                        </Button>
                    </div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
                        <p className="text-muted-foreground text-sm">
                            Click for properties or drag to move
                        </p>
                    </div>
                </>
            )}
            {topHalf.isOver && (
                <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
            )}
            <div className={cn('flex w-full h-[120px] items-center rounded-md bg-accent/40 px-4 py-2 pointer-events-none opacity-100', mouseIsOver && 'opacity-30')}>
                <DesignerElement elementInstance={element} />
            </div>
            {bottomHalf.isOver && (
                <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
            )}
        </div>
    )
}
