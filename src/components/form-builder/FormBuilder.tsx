'use client';

import { Form } from '@prisma/client';
import PublishFormBtn from '@/components/form-builder/buttons/PublishFormBtn';
import SaveFormBtn from '@/components/form-builder/buttons/SaveFormBtn';
import PreviewDialogBtn from '@/components/form-builder/buttons/PreviewDialogBtn';
import Designer from '@/components/form-builder/designer/Designer';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import DragOverlayWrapper from '@/components/form-builder/designer/DragOverlayWrapper';
import React, { useEffect, useState } from 'react';
import useDesigner from '@/hooks/useDesigner';
import Loading from '@/app/(dashboard)/builder/[id]/loading';
import FormBuilderPublished from '@/components/form-builder/FormBuilderPublished';
import DeleteFormBtn from '@/components/form-builder/buttons/DeleteFormBtn';

type FormBuilderProps = {
    form: Form;
};

function FormBuilder({ form }: FormBuilderProps) {
    const [isReady, setIsReady] = useState(false);
    const { setElements, setSelectedElement } = useDesigner();

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10
        }
    });
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300,
            tolerance: 5
        }
    });
    const sensors = useSensors(mouseSensor, touchSensor);

    useEffect(() => {
        if (isReady) return;
        const elements = JSON.parse(form.content);
        setElements(elements);
        setSelectedElement(null);
        const readyTimeout = setTimeout(() => setIsReady(true), 500);
        return () => clearTimeout(readyTimeout);
    }, [form, setElements, isReady, setIsReady, setSelectedElement]);

    if (!isReady) {
        return <Loading />;
    }

    if (form.published) {
        return <FormBuilderPublished formId={form.id} shareURL={form.shareURL} />;
    }

    return (
        <DndContext sensors={sensors}>
            <main className="flex flex-col w-full">
                <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
                    <h2 className="truncate font-medium">
                        <span className="text-muted-foreground mr-2">Form:</span>
                        {form.name}
                    </h2>
                    <div className="flex items-center gap-2">
                        <PreviewDialogBtn />
                        {!form.published && (
                            <>
                                <SaveFormBtn id={form.id} />
                                <DeleteFormBtn formId={form.id} />
                                <PublishFormBtn id={form.id} />
                            </>
                        )}
                    </div>
                </nav>
                <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
                    <Designer />
                </div>
            </main>
            <DragOverlayWrapper />
        </DndContext>
    );
}

export default FormBuilder;
