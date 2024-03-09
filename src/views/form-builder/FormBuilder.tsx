'use client';

import { Form } from '@prisma/client';
import PublishFormBtn from '@/views/form-builder/components/buttons/PublishFormBtn';
import SaveFormBtn from '@/views/form-builder/components/buttons/SaveFormBtn';
import PreviewDialogBtn from '@/views/form-builder/components/buttons/PreviewDialogBtn';
import FormBuilderArea from '@/views/form-builder/components/form-builder-area/FormBuilderArea';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import DragOverlayWrapper from '@/views/form-builder/components/DragOverlayWrapper';
import React, { useEffect, useState } from 'react';
import useDesigner from '@/hooks/useDesigner';
import Loading from '@/app/(dashboard)/builder/[id]/loading';
import FormBuilderPublished from '@/views/form-builder/components/FormBuilderPublished';
import DeleteFormBtn from '@/components/buttons/DeleteFormBtn';
import EditNameFormBtn from '@/components/buttons/EditNameFormBtn';
import FormBuilderHeader from '@/views/form-builder/components/FormBuilderHeader';
import Sidebar from '@/views/form-builder/components/form-builder-sidebar/Sidebar';

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
            <main className="flex flex-col w-full overflow-hidden">
                <FormBuilderHeader formId={form.id} formName={form.name} isPublished={form.published} />

                <div className="flex flex-grow w-full h-full overflow-hidden">
                    <FormBuilderArea />
                    <Sidebar />
                </div>

            </main>
            <DragOverlayWrapper />
        </DndContext>
    );
}

export default FormBuilder;
