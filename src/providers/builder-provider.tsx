'use client';

import { FormElementInstance } from '@/components/fields/FormElements';
import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useCallback,
    useMemo,
    useState,
} from 'react';

type BuilderFormContextType = {
    elements: FormElementInstance[];
    addElement: (index: number, element: FormElementInstance) => void;
    removeElement: (id: string) => void;
    setElements: Dispatch<SetStateAction<FormElementInstance[]>>;

    selectedElement: FormElementInstance | null;
    setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
    updateElement: (id: string, element: FormElementInstance) => void;
};

export const BuilderProvider = createContext<BuilderFormContextType | null>(null);

export default function BuilderContextProvider({ children }: PropsWithChildren) {
    const [elements, setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null);

    const addElement = useCallback(
        (index: number, element: FormElementInstance) => {
            setElements((prevElements) => {
                const newElements = [...prevElements];
                newElements.splice(index, 0, element);
                return newElements;
            });
        },
        [setElements],
    );

    const removeElement = useCallback(
        (id: string) => {
            setElements((prevElements) => prevElements.filter((element) => element.id !== id));
        },
        [setElements],
    );

    const updateElement = useCallback(
        (id: string, element: FormElementInstance) => {
            setElements((prevElements) => {
                const index = prevElements.findIndex((element) => element.id === id);
                const newElements = [...prevElements];
                newElements[index] = element;
                return newElements;
            });
        },
        [setElements],
    );

    const value = useMemo(
        () => ({
            elements,
            addElement,
            removeElement,
            setElements,

            selectedElement,
            setSelectedElement,
            updateElement,
        }),
        [
            elements,
            addElement,
            removeElement,
            setElements,
            selectedElement,
            setSelectedElement,
            updateElement,
        ],
    );

    return <BuilderProvider.Provider value={value}>{children}</BuilderProvider.Provider>;
}
