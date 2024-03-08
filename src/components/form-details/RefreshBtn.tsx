'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { IoMdRefresh } from 'react-icons/io';
import { useRouter } from 'next/navigation';

export default function RefreshBtn() {
    const router = useRouter();
    return (
        <Button variant="outline" className="gap-2" onClick={() => router.refresh()}>
            <IoMdRefresh className="h-4 w-4" />
            Refresh
        </Button>
    )
}
