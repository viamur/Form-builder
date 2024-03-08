'use client';

import { DeleteForm} from '@/actions/form';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useTransition } from 'react';
import { FaSpinner } from 'react-icons/fa';
import * as AlertDialogComponents from '../ui/alert-dialog';
import { toast } from '../ui/use-toast';

type Props = PropsWithChildren<{
    id: number;
}>

function DeleteFormDialog({ id, children }: Props) {
    const [loading, startTransition] = useTransition();
    const router = useRouter();

    async function publishForm() {
        try {
            await DeleteForm(id);
            toast({
                title: 'Success',
                description: 'Form has been deleted',
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
                {children}
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

export default DeleteFormDialog;
