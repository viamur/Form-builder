import React, { ReactNode } from 'react';
import ThemeSwitcher from '../../../components/header/ThemeSwitcher';
import Logo from '../../../components/header/Logo';

function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen min-w-full max-h-screen h-screen overflow-hidden">
            <nav className="flex justify-between items-center bg-background
            border-b border-border h-[60px] flex-shrink-0 px-4 py-2"
            >
                <Logo />
                <ThemeSwitcher />
            </nav>
            <main className="overflow-hidden flex-grow bg-accent">{children}</main>
        </div>
    );
}

export default Layout;
