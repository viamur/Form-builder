'use client';

import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import { cn, idGenerator } from '@/lib/utils';
import useDesigner from '@/hooks/useDesigner';
import { ElementsType, FormElements } from '@/components/fields/FormElements';
import FormBuilderElementWrapper from '@/views/form-builder/components/form-builder-area/FormBuilderElementWrapper';
import { ScrollArea } from '@/components/ui/scroll-area';

function FormBuilderArea() {
    const { elements, addElement, setSelectedElement, removeElement, selectedElement } =
        useDesigner();
    const droppable = useDroppable({
        id: 'designer-drop-area',
        data: {
            isDesignerDropArea: true
        }
    });

    useDndMonitor({
        onDragEnd(event: DragEndEvent) {
            const { active, over } = event;
            if (!active || !over) return;

            const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement as
                | boolean
                | undefined;
            const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea as
                | boolean
                | undefined;

            // #1
            if (isDesignerBtnElement && isDroppingOverDesignerDropArea) {
                const type = active.data?.current?.type as ElementsType;
                const newElement = FormElements[type].construct(idGenerator());
                addElement(elements.length, newElement);
            }

            const isDroppingOverDesignerElementTopHalf = over.data?.current
                ?.isTopHalfDesignerElement as boolean | undefined;
            const isDroppingOverDesignerElementBottomHalf = over.data?.current
                ?.isBottomHalfDesignerElement as boolean | undefined;

            const isDroppingOverDesignerElement =
                isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf;

            const droppingSidebarBtnOverDesignerElement =
                isDesignerBtnElement && isDroppingOverDesignerElement;

            // #2
            if (droppingSidebarBtnOverDesignerElement) {
                const type = active.data?.current?.type as ElementsType;
                const newElement = FormElements[type].construct(idGenerator());

                const overId = over.data?.current?.elementId as string;

                let overElementIndex = elements.findIndex((el) => el.id === overId);
                if (overElementIndex === -1) {
                    throw new Error('Element not found');
                }

                if (isDroppingOverDesignerElementBottomHalf) {
                    overElementIndex += 1;
                }

                addElement(overElementIndex, newElement);
            }

            const isDraggingDesignerElement = active.data?.current?.isDesignerElement as
                | boolean
                | undefined;

            const draggingDesignerElementOverAnotherDesignerElement =
                isDroppingOverDesignerElement && isDraggingDesignerElement;

            // #3
            if (draggingDesignerElementOverAnotherDesignerElement) {
                const activeId = active.data?.current?.elementId as string;
                const overId = over.data?.current?.elementId as string;

                const activeElIndex = elements.findIndex((el) => el.id === activeId);
                const overElIndex = elements.findIndex((el) => el.id === overId);

                if (activeElIndex === -1 || overElIndex === -1) {
                    throw new Error('Element not found');
                }

                const activeEl = { ...elements[activeElIndex] };
                removeElement(activeId);

                const indexForNewElement = isDroppingOverDesignerElementBottomHalf
                    ? overElIndex + 1
                    : overElIndex;
                addElement(indexForNewElement, activeEl);
            }
        }
    });
    return (
        <div
            onClick={() => {
                if (selectedElement) {
                    setSelectedElement(null);
                }
            }}
            className="flex p-4 w-full h-full flex-grow items-center justify-center relative bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]"
        >
            <div
                ref={droppable.setNodeRef}
                className={cn(
                    'bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-self-auto flex-1 overflow-y-auto',
                    droppable.isOver && 'ring-4 ring-primary ring-inset'
                )}
            >
                {!droppable.isOver && elements.length === 0 && (
                    <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
                        Drop here
                    </p>
                )}
                {droppable.isOver && elements.length === 0 && (
                    <div className="p-4 w-full">
                        <div className="h-[120px] rounded-md bg-primary/20" />
                    </div>
                )}
                {elements.length > 0 && (
                <ScrollArea className="w-full" type="auto">
                    <div className="flex flex-col w-full gap-2 p-4">
                        {elements.map((el) => (
                            <FormBuilderElementWrapper key={el.id} element={el} />
                        ))}
                    </div>
                </ScrollArea>
                )}
            </div>
        </div>
    );
}

export default FormBuilderArea;
