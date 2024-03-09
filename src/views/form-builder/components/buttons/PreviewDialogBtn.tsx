import React from 'react';
import { Button } from '@/components/ui/button';
import { MdPreview } from 'react-icons/md';
import * as DialogComponents from '@/components/ui/dialog';
import useBuilderFormContext from '@/hooks/useBuilderFormContext';
import { FormElements } from '@/components/fields/FormElements';
import { ScrollArea } from '@/components/ui/scroll-area';

function PreviewDialogBtn() {
    const { elements } = useBuilderFormContext();
    return (
        <DialogComponents.Dialog>
            <DialogComponents.DialogTrigger asChild>
                <Button variant={'outline'} className="gap-2">
                    <MdPreview className="h-6 w-6" />
                    Preview
                </Button>
            </DialogComponents.DialogTrigger>
            <DialogComponents.DialogContent className="w-screen h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
                <div className="px-4 py-2 border-b">
                    <p className="text-lg font-bold text-muted-foreground">Form preview</p>
                    <p className="text-sm text-muted-foreground">
                        This is how your form will look like to your users.
                    </p>
                </div>
                <div className="bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)] overflow-y-auto flex flex-col flex-grow items-center justify-center p-4">
                    <div className="max-w-[620px] flex-grow bg-background h-full w-full rounded-2xl">
                        <ScrollArea className="h-full w-full" type="auto">
                            <div className="flex flex-col gap-4 flex-grow h-full w-full p-8">
                                {elements.map((element) => {
                                    const FormComponent = FormElements[element.type].formComponent;
                                    return (
                                        <FormComponent elementInstance={element} key={element.id} />
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </DialogComponents.DialogContent>
        </DialogComponents.Dialog>
    );
}

export default PreviewDialogBtn;
