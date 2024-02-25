import React, { PropsWithChildren } from 'react';

function layout({ children }: PropsWithChildren) {
    return <span className="flex w-full flex-col flex-grow mx-auto">{children}</span>;
}

export default layout;
