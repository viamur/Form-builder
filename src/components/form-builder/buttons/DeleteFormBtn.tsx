import { Button } from '@/components/ui/button';
import { MdDelete } from 'react-icons/md';
import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { DeleteForm } from '@/actions/form';
import { toast } from '@/components/ui/use-toast';
import * as AlertDialogComponents from '@/components/ui/alert-dialog';
import { FaSpinner } from 'react-icons/fa';

type Props = {
    formId: number;
};

function DeleteFormBtn({ formId }: Props) {
    const [loading, startTransition] = useTransition();
    const router = useRouter();

    async function publishForm() {
        try {
            await DeleteForm(formId);
            toast({
                title: 'Success',
                description: 'Form has been deleted'
            });
            router.replace('/');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
                variant: 'destructive'
            });
        }
    }

    return (
        <AlertDialogComponents.AlertDialog>
            <AlertDialogComponents.AlertDialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <MdDelete className="h-4 w-4" />
                    Delete
                </Button>
            </AlertDialogComponents.AlertDialogTrigger>
            <AlertDialogComponents.AlertDialogContent>
                <AlertDialogComponents.AlertDialogHeader>
                    <AlertDialogComponents.AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogComponents.AlertDialogTitle>
                    <AlertDialogComponents.AlertDialogDescription>
                        Once this form is deleted, it will be impossible to restore it.
                    </AlertDialogComponents.AlertDialogDescription>
                </AlertDialogComponents.AlertDialogHeader>
                <AlertDialogComponents.AlertDialogFooter>
                    <AlertDialogComponents.AlertDialogCancel>
                        Cancel
                    </AlertDialogComponents.AlertDialogCancel>
                    <AlertDialogComponents.AlertDialogAction
                        disabled={loading}
                        className="flex items-center gap-2 hover:bg-red-500"
                        onClick={(e) => {
                            e.preventDefault();
                            startTransition(publishForm);
                        }}
                    >
                        <span>Delete Form</span>
                        {loading && <FaSpinner className="animate-spin" />}
                    </AlertDialogComponents.AlertDialogAction>
                </AlertDialogComponents.AlertDialogFooter>
            </AlertDialogComponents.AlertDialogContent>
        </AlertDialogComponents.AlertDialog>
    );
}

export default DeleteFormBtn;
