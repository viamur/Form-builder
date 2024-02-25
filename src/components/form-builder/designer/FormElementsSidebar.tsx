import SideBarBtnElement from '@/components/form-builder/designer/SideBarBtnElement';
import { FormElements } from '@/components/form-builder/designer/FormElements';

export default function FormElementsSidebar() {
    return (
        <div>
            Elements
            <SideBarBtnElement formElement={FormElements.TextField} />
        </div>
    )
}
