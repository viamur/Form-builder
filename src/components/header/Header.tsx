import Logo from '@/components/header/Logo';
import ThemeSwitcher from '@/components/header/ThemeSwitcher';
import { UserButton } from '@clerk/nextjs';
import React from 'react';

export default function Header() {
    return (
        <nav className="flex justify-between items-center border-b border-border h-[60px] px-4 py-2">
            <Logo />
            <div className="flex gap-4 items-center min-w-[190px] justify-between">
                <ThemeSwitcher />
                <UserButton afterSignOutUrl="/sign-in" />
            </div>
        </nav>
    )
}
