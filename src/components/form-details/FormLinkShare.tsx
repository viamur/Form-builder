'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { FaRegCopy } from "react-icons/fa";

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
        <div className="flex flex-grow gap-4 items-center">
            <Input value={shareLink} readOnly />
            <Button
                className="w-[200px] flex-shrink-0"
                onClick={() => {
                    navigator.clipboard.writeText(shareLink).then(() => {
                        toast({
                            title: 'Copied!',
                            description: 'Link copied to clipboard'
                        });
                    });
                }}
            >
                <FaRegCopy className="mr-2 h-4 w-4" />
                Copy link
            </Button>
        </div>
    );
}
