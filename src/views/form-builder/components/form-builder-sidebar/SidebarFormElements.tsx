import SidebarButton from '@/views/form-builder/components/form-builder-sidebar/SidebarButton';
import { FormElements } from '@/components/fields/FormElements';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export default function SidebarFormElements() {
    return (
        <div className="flex flex-col flex-grow">
            <div className="flex items-center h-[36px]">
                <p className="text-sm text-foreground/70">Drag and drop elements</p>
            </div>
            <Separator className="mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
                <Badge
                    className="col-span-1 md:col-span-2 my-2 place-self-start"
                    variant="secondary"
                >
                    Layout elements
                </Badge>
                <SidebarButton formElement={FormElements.TitleField} />
                <SidebarButton formElement={FormElements.SubTitleField} />
                <SidebarButton formElement={FormElements.ParagraphField} />
                <SidebarButton formElement={FormElements.SeparatorField} />
                <SidebarButton formElement={FormElements.SpacerField} />

                <Badge
                    className="col-span-1 md:col-span-2 my-2 place-self-start mt-4"
                    variant="secondary"
                >
                    Form elements
                </Badge>
                <SidebarButton formElement={FormElements.TextField} />
                <SidebarButton formElement={FormElements.NumberField} />
                <SidebarButton formElement={FormElements.TextAreaField} />
                <SidebarButton formElement={FormElements.DateField} />
                <SidebarButton formElement={FormElements.SelectField} />
                <SidebarButton formElement={FormElements.CheckboxField} />
            </div>
        </div>
    );
}
