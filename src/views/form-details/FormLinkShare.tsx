'use client';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import CopyLinkBtn from '@/views/form-details/buttons/CopyLinkBtn';

type FormLinkShareProps = {
    shareURL: string;
};
export default function FormLinkShare({ shareURL }: FormLinkShareProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    const shareLink = `${window.location.origin}/submit/${shareURL}`;

    return (
        <div className="flex flex-grow gap-4 items-center container">
            <Input value={shareLink} readOnly />
            <CopyLinkBtn link={shareLink} />
        </div>
    );
}
