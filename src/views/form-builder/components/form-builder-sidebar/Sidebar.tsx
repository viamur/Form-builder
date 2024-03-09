import useDesigner from '@/hooks/useDesigner';
import SidebarFormElements from '@/views/form-builder/components/form-builder-sidebar/SidebarFormElements';
import SidebarFormProperties from '@/views/form-builder/components/form-builder-sidebar/SidebarFormProperties';
import { memo } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

function Sidebar() {
    const { selectedElement } = useDesigner();
    return (
        <ScrollArea className="w-[400px] max-w-[400px] border-l-2 border-muted bg-background overflow-hidden h-full" type="auto">
            <aside className="p-4">
                {!selectedElement && <SidebarFormElements />}
                {selectedElement && <SidebarFormProperties />}
            </aside>
        </ScrollArea>
    );
}
export default memo(Sidebar);
