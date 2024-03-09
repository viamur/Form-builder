import EditNameFormBtn from '@/components/buttons/EditNameFormBtn';
import PreviewDialogBtn from '@/views/form-builder/components/buttons/PreviewDialogBtn';
import SaveFormBtn from '@/views/form-builder/components/buttons/SaveFormBtn';
import DeleteFormBtn from '@/components/buttons/DeleteFormBtn';
import PublishFormBtn from '@/views/form-builder/components/buttons/PublishFormBtn';
import React from 'react';

type Props = {
    formId: number;
    formName: string;
    isPublished: boolean;
};

export default function FormBuilderHeader({ formId, formName, isPublished }: Props) {
    return (
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
            <div className="flex items-center gap-1">
                <h2 className="truncate font-medium">
                    <span className="text-muted-foreground mr-2">Form:</span>
                    {formName}
                </h2>
                <EditNameFormBtn formId={formId} formName={formName} />
            </div>
            <div className="flex items-center gap-2">
                <PreviewDialogBtn />
                {!isPublished && (
                    <>
                        <SaveFormBtn id={formId} />
                        <DeleteFormBtn formId={formId} />
                        <PublishFormBtn id={formId} />
                    </>
                )}
            </div>
        </nav>
    );
}
