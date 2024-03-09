import { SignIn } from '@clerk/nextjs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Sign In'
};

export default function Home() {
    return <SignIn />;
}
