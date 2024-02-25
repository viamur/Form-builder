import React, { useTransition } from 'react';
import { Button } from '../../ui/button';
import { HiSaveAs } from 'react-icons/hi';
import { FaSpinner } from 'react-icons/fa';
import useDesigner from '@/hooks/useDesigner';
import { UpdateFormContent } from '@/actions/form';
import { toast } from '@/components/ui/use-toast';

function SaveFormBtn({ id }: { id: number }) {
    const [loading, startTransition] = useTransition();
    const { elements } = useDesigner();

    const onSave = async () => {
        try {
            const jsonElements = JSON.stringify(elements);
            await UpdateFormContent(id, jsonElements);
            toast({
                title: 'Success',
                description: 'Your form has been saved'
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
                variant: 'destructive'
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
