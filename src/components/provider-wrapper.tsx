'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';

const ProviderWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
            <NextUIProvider>{children}</NextUIProvider>
        </SessionProvider>
    );
};

export default ProviderWrapper;
