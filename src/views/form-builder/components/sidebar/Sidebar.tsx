import useDesigner from '@/hooks/useDesigner';
import SidebarFormElements from '@/views/form-builder/components/sidebar/SidebarFormElements';
import SidebarFormProperties from '@/views/form-builder/components/sidebar/SidebarFormProperties';

function Sidebar() {
    const { selectedElement } = useDesigner();
    return (
        <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
            {!selectedElement && <SidebarFormElements />}
            {selectedElement && <SidebarFormProperties />}
        </aside>
    );
}
export default Sidebar;
