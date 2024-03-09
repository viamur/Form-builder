'use client';

import { Form } from '@prisma/client';
import PublishFormBtn from '@/views/form-builder/components/buttons/PublishFormBtn';
import SaveFormBtn from '@/views/form-builder/components/buttons/SaveFormBtn';
import PreviewDialogBtn from '@/views/form-builder/components/buttons/PreviewDialogBtn';
import Designer from '@/views/form-builder/components/designer/Designer';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import DragOverlayWrapper from '@/views/form-builder/components/DragOverlayWrapper';
import React, { useEffect, useState } from 'react';
import useDesigner from '@/hooks/useDesigner';
import Loading from '@/app/(dashboard)/builder/[id]/loading';
import FormBuilderPublished from '@/views/form-builder/components/FormBuilderPublished';
import DeleteFormBtn from '@/components/buttons/DeleteFormBtn';
import EditNameFormBtn from '@/components/buttons/EditNameFormBtn';

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
                    <div className="flex items-center gap-1">
                        <h2 className="truncate font-medium">
                            <span className="text-muted-foreground mr-2">Form:</span>
                            {form.name}
                        </h2>
                        <EditNameFormBtn formId={form.id} formName={form.name} />
                    </div>
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
