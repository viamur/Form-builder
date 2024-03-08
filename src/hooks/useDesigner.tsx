'use client';

import { useContext } from 'react';
import { DesignerProvider } from '@/providers/designer-provider';

function useDesigner() {
    const context = useContext(DesignerProvider);
    if (!context) {
        throw new Error('useDesigner must be used within a DesignerContextProvider');
    }
    return context;
}

export default useDesigner;
