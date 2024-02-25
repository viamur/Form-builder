'use client';

import { FormElementInstance } from '@/components/form-builder/designer/FormElements';
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

type DesignerContextType = {
    elements: FormElementInstance[];
    addElement: (index: number, element: FormElementInstance) => void;
    removeElement: (id: string) => void;

    selectedElement: FormElementInstance | null;
    setSelectedElement:  Dispatch<SetStateAction<FormElementInstance | null>>;
}

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({children}: PropsWithChildren) {
    const [elements, setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null);

    const addElement = (index: number, element: FormElementInstance) => {
        setElements((prevElements) => {
            const newElements = [...prevElements];
            newElements.splice(index, 0, element);
            return newElements;
        })
    }

    const removeElement = (id: string) => {
        setElements((prevElements) =>
            prevElements.filter((element) => element.id !== id));
    }

    const value = {
        elements,
        addElement,
        removeElement,

        selectedElement,
        setSelectedElement,
    }

    return (
        <DesignerContext.Provider value={value}>
            {children}
        </DesignerContext.Provider>
    )
}
