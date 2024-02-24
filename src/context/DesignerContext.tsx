'use client';

import { FormElementInstance } from '@/components/form-builder/designer/FormElements';
import { createContext, PropsWithChildren, useState } from 'react';

type DesignerContextType = {
    elements: FormElementInstance[];
    addElement: (index: number, element: FormElementInstance) => void;
    removeElement: (id: string) => void;
}

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({children}: PropsWithChildren) {
    const [elements, setElements] = useState<FormElementInstance[]>([]);
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
        removeElement
    }

    return (
        <DesignerContext.Provider value={value}>
            {children}
        </DesignerContext.Provider>
    )
}
