'use client';

import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';
import DesignerSideBar from '@/components/form-builder/designer/DesignerSideBar';
import { cn, idGenerator } from '@/lib/utils';
import useDesigner from '@/hooks/useDesigner';
import { ElementsType, FormElements } from '@/components/form-builder/designer/FormElements';
import DesignerElementWrapper from '@/components/form-builder/designer/DesignerElementWrapper';

function Designer() {
    const {elements, addElement} = useDesigner();
    const droppable = useDroppable({
        id: 'designer-drop-area',
        data: {
            isDesignerDropArea: true,
        }
    })

    useDndMonitor({
        onDragEnd(event: DragEndEvent) {
            const {active, over} = event;
            if (!active || !over) return;
            const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement as boolean | undefined;
            if (isDesignerBtnElement) {
                const type = active.data?.current?.type as ElementsType;
                const newElement = FormElements[type].construct(idGenerator())
                addElement(0, newElement)
            }
        }
    })
    return (
        <div className="flex w-full h-full">
            <div className="p-4 w-full">
                <div
                    ref={droppable.setNodeRef}
                    className={cn("bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-self-auto flex-1 overflow-y-auto",
                            droppable.isOver && 'ring-2 ring-primary/20'
                        )}>
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
                        <div className="flex flex-col w-full gap-2 p-4">
                            {elements.map((el) => (
                                <DesignerElementWrapper key={el.id} element={el} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <DesignerSideBar />
        </div>
    )
}

export default Designer;
