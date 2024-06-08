'use client';

import { useContext } from 'react';
import { BuilderProvider } from '@/providers/builder-provider';

function useBuilderFormContext() {
    const context = useContext(BuilderProvider);
    if (!context) {
        throw new Error('useBuilderFormContext must be used within a BuilderContextProvider');
    }
    return context;
}

export default useBuilderFormContext;

// Test 2
