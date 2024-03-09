import useDesigner from '@/hooks/useDesigner';
import FormElementsSidebar from '@/views/form-builder/components/designer/FormElementsSidebar';
import PropertiesFormSidebar from '@/views/form-builder/components/designer/PropertiesFormSidebar';

function DesignerSideBar() {
    const { selectedElement } = useDesigner();
    return (
        <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2 border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
            {!selectedElement && <FormElementsSidebar />}
            {selectedElement && <PropertiesFormSidebar />}
        </aside>
    );
}
export default DesignerSideBar;
