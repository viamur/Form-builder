'use client';

import { Button } from '@/components/ui/button';
import { MdModeEdit } from 'react-icons/md';
import React, { useTransition } from 'react';
import { EditFormName } from '@/server-actions/server-actions';
import { toast } from '@/components/ui/use-toast';
import * as DialogComponents from '@/components/ui/dialog';
import { FaSpinner } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import * as FormComponents from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import * as TooltipComponents from '@/components/ui/tooltip';

const schema = z.object({
    name: z.string().min(4).max(50)
});

type DefaultValues = z.infer<typeof schema>;

type Props = {
    formId: number;
    formName: string;
};

function EditNameFormBtn({ formId, formName }: Props) {
    const [isOpened, setIsOpened] = React.useState(false);
    const [loading, startTransition] = useTransition();

    const form = useForm<DefaultValues>({
        defaultValues: { name: '' },
        values: { name: formName },
        resolver: zodResolver(schema),
        mode: 'onBlur'
    });

    async function submit({ name }: DefaultValues) {
        try {
            const validation = schema.safeParse({ name });
            if (!validation.success) {
                throw new Error('name not valid');
            }
            await EditFormName(formId, name);
            setIsOpened(false);
            toast({
                title: 'Success',
                description: 'Name has been updated'
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
                variant: 'destructive'
            });
        }
    }

    return (
        <DialogComponents.Dialog open={isOpened} onOpenChange={setIsOpened}>
            <TooltipComponents.TooltipProvider delayDuration={0}>
                <TooltipComponents.Tooltip>
                    <TooltipComponents.TooltipTrigger>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            onClick={() => setIsOpened(true)}
                        >
                            <MdModeEdit className="h-4 w-4" />
                        </Button>
                    </TooltipComponents.TooltipTrigger>
                    <TooltipComponents.TooltipContent>Edit Name</TooltipComponents.TooltipContent>
                </TooltipComponents.Tooltip>
            </TooltipComponents.TooltipProvider>
            <DialogComponents.DialogContent className="w-[400px]">
                <DialogComponents.DialogHeader>
                    <DialogComponents.DialogTitle className="mb-4">
                        Edit Form Name
                    </DialogComponents.DialogTitle>
                    <FormComponents.Form {...form}>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                startTransition(form.handleSubmit(submit));
                            }}
                        >
                            <FormComponents.FormField
                                control={form.control}
                                defaultValue={formName}
                                name="name"
                                render={({ field }) => (
                                    <FormComponents.FormItem>
                                        <FormComponents.FormControl>
                                            <Input {...field} />
                                        </FormComponents.FormControl>
                                        <FormComponents.FormMessage />
                                    </FormComponents.FormItem>
                                )}
                            />
                        </form>
                    </FormComponents.Form>
                </DialogComponents.DialogHeader>
                <DialogComponents.DialogFooter>
                    <DialogComponents.DialogClose>Cancel</DialogComponents.DialogClose>
                    <Button
                        disabled={loading || !form.formState.isDirty}
                        className="flex items-center gap-2 min-w-[100px]"
                        onClick={(e) => {
                            startTransition(form.handleSubmit(submit));
                        }}
                    >
                        <span>Save</span>
                        {loading && <FaSpinner className="animate-spin" />}
                    </Button>
                </DialogComponents.DialogFooter>
            </DialogComponents.DialogContent>
        </DialogComponents.Dialog>
    );
}

export default EditNameFormBtn;
