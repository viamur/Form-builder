import Link from 'next/link'
import { Button } from '@/components/ui/button';
import React from 'react';

export default function NotFound() {
    return (
        <div className="flex w-full h-full flex-col items-center justify-center gap-4">
            <h2 className="text-4xl">Form not found!</h2>
            <Button asChild>
                <Link href={'/'}>Go back to home</Link>
            </Button>
        </div>
    )
}
