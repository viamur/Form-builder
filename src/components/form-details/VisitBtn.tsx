'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

type VisitBtnProps = {
    shareURL: string;
};
export default function VisitBtn({ shareURL }: VisitBtnProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const shareLink = `${window.location.origin}/submit/${shareURL}`;
    return (
        <Button
            className="w-[200px]"
            onClick={() => {
                window.open(shareLink, '_blank');
            }}
        >
            Visit
        </Button>
    );
}
