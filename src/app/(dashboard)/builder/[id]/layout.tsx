import React, { PropsWithChildren } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Create Form',
};

function layout({ children }: PropsWithChildren) {
    return <div className="flex w-full flex-grow mx-auto overflow-hidden">{children}</div>;
}

export default layout;
