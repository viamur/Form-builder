import EditNameFormBtn from '@/components/buttons/EditNameFormBtn';
import DeleteFormBtn from '@/components/buttons/DeleteFormBtn';
import RefreshBtn from '@/views/form-details/components/buttons/RefreshBtn';
import VisitFormBtn from '@/views/form-details/components/buttons/VisitFormBtn';
import React from 'react';

type Props = {
    formId: number;
    formName: string;
    formShareURL: string;
}

export default function FormDetailsHeader({ formId, formShareURL, formName }: Props) {
    return (
        <div className="py-10 border-b border-muted">
            <div className="flex justify-between container">
                <div className="flex items-center gap-1">
                    <h1 className="text-4xl font-bold truncate">{formName}</h1>
                    <EditNameFormBtn formId={formId} formName={formName} />
                </div>
                <div className="flex items-center gap-2">
                    <DeleteFormBtn formId={formId} />
                    <RefreshBtn />
                    <VisitFormBtn shareURL={formShareURL} />
                </div>
            </div>
        </div>
    )
}
