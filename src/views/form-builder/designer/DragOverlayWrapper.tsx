import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { SideBarBtnElementDragOverlay } from '@/views/form-builder/designer/SideBarBtnElement';
import { ElementsType, FormElements } from '@/components/fields/FormElements';
import useDesigner from '@/hooks/useDesigner';

export default function DragOverlayWrapper() {
    const [draggedItem, setDraggedItem] = useState<Active | null>(null);
    const { elements } = useDesigner();

    let node = <div>No drag overlay</div>;
    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active);
        },
        onDragCancel: () => {
            setDraggedItem(null);
        },
        onDragEnd: () => {
            setDraggedItem(null);
        }
    });

    const isSideBarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement as
        | boolean
        | undefined;
    if (isSideBarBtnElement) {
        const type = draggedItem?.data?.current?.type as ElementsType | undefined;
        if (type) {
            node = <SideBarBtnElementDragOverlay formElement={FormElements[type]} />;
        }
    }

    const isDesignerElement = draggedItem?.data?.current?.isDesignerElement as boolean | undefined;
    if (isDesignerElement) {
        const elementId = draggedItem?.data?.current?.elementId as string | undefined;
        const element = elements.find((e) => e.id === elementId);
        if (!element) {
            node = <div>Element not found</div>;
        } else {
            const DesignerComponent = FormElements[element.type].designerComponent;
            node = (
                <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4 opacity-80 pointer-events-none">
                    <DesignerComponent elementInstance={element} />
                </div>
            );
        }
    }

    return <DragOverlay>{node}</DragOverlay>;
}
