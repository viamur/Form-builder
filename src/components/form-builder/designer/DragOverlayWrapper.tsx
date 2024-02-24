import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { SideBarBtnElementDragOverlay } from '@/components/form-builder/designer/SideBarBtnElement';
import { ElementsType, FormElements } from '@/components/form-builder/designer/FormElements';

export default function DragOverlayWrapper() {
    const [draggedItem, setDraggedItem] = useState<Active | null>(null)
    let node = <div>test</div>
    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active)
        },
        onDragCancel: () => {
            setDraggedItem(null)
        },
        onDragEnd: () => {
            setDraggedItem(null)
        }
    })
    const isSideBarBtnElement = draggedItem?.data?.current?.isDesignerBtnElement as boolean | undefined;
    if (isSideBarBtnElement) {
        const type = draggedItem?.data?.current?.type as ElementsType | undefined;
        if (type) {
            node = <SideBarBtnElementDragOverlay formElement={FormElements[type]} />
        }
    }
    return (
        <DragOverlay>{node}</DragOverlay>
    )
}
