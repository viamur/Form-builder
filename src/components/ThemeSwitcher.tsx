'use client';

import {useTheme} from 'next-themes';
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useEffect, useState} from 'react';
import {MoonIcon, SunIcon, DesktopIcon} from '@radix-ui/react-icons';

const ICONS = {
    light: <SunIcon className="h-[1.2rem] w-[1.2rem]" />,
    dark: <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />,
    system: <DesktopIcon className="h-[1.2rem] w-[1.2rem]" />,
} as const;

const THEMES = [
    'light',
    'dark',
    'system',
] as const;

export default function ThemeSwitcher() {
    const {theme, setTheme} = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;
    return (
        <Tabs defaultValue={theme}>
            <TabsList className="border">
                {THEMES.map((theme) => (
                    <TabsTrigger key={theme} value={theme} onClick={() => setTheme(theme)}>
                        {ICONS[theme]}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    )
}
