import { Button } from '@/components/ui/button';
import { MdDelete } from 'react-icons/md';
import DeleteFormDialog from '@/components/form-details/DeleteFormDialog';
import React from 'react';

type Props = {
    formId: number;
}

export default function DeleteFormBtn({ formId }: Props) {
    return (
        <DeleteFormDialog id={formId}>
            <Button variant="outline" className="gap-2">
                <MdDelete className="h-4 w-4" />
                Delete
            </Button>
        </DeleteFormDialog>
    )
}
