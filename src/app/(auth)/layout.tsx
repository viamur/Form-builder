import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <main className="w-screen h-screen flex items-center justify-center content-center bg-accent">
            {children}
        </main>
    );
}
