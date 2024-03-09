'use client';

import { FormElementInstance } from '@/components/form-builder/designer/FormElements';
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from 'react';

type DesignerContextType = {
    elements: FormElementInstance[];
    addElement: (index: number, element: FormElementInstance) => void;
    removeElement: (id: string) => void;
    setElements: Dispatch<SetStateAction<FormElementInstance[]>>;

    selectedElement: FormElementInstance | null;
    setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
    updateElement: (id: string, element: FormElementInstance) => void;
};

export const DesignerProvider = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({ children }: PropsWithChildren) {
    const [elements, setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null);

    const addElement = (index: number, element: FormElementInstance) => {
        setElements((prevElements) => {
            const newElements = [...prevElements];
            newElements.splice(index, 0, element);
            return newElements;
        });
    };

    const removeElement = (id: string) => {
        setElements((prevElements) => prevElements.filter((element) => element.id !== id));
    };

    const updateElement = (id: string, element: FormElementInstance) => {
        setElements((prevElements) => {
            const index = prevElements.findIndex((element) => element.id === id);
            const newElements = [...prevElements];
            newElements[index] = element;
            return newElements;
        });
    };

    const value = {
        elements,
        addElement,
        removeElement,
        setElements,

        selectedElement,
        setSelectedElement,
        updateElement
    };

    return <DesignerProvider.Provider value={value}>{children}</DesignerProvider.Provider>;
}
