import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { HiSaveAs } from 'react-icons/hi';
import { FaSpinner } from 'react-icons/fa';
import useBuilderFormContext from '@/hooks/useBuilderFormContext';
import { UpdateFormContent } from '@/server-actions/server-actions';
import { toast } from '@/components/ui/use-toast';

type Props = {
    id: number;
};

function SaveFormBtn({ id }: Props) {
    const [loading, startTransition] = useTransition();
    const { elements } = useBuilderFormContext();

    const onSave = async () => {
        try {
            const jsonElements = JSON.stringify(elements);
            await UpdateFormContent(id, jsonElements);
            toast({
                title      : 'Success',
                description: 'Your form has been saved'
            });
        } catch (error) {
            toast({
                title      : 'Error',
                description: 'Something went wrong',
                variant    : 'destructive'
            });
            console.error(error);
        }
    };

    return (
        <Button
            variant={'outline'}
            className="gap-2"
            disabled={loading}
            onClick={() => startTransition(onSave)}
        >
            <HiSaveAs className="h-4 w-4" />
            Save
            {loading && <FaSpinner className="animate-spin" />}
        </Button>
    );
}

export default SaveFormBtn;
