'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react';
import { Toaster } from './ui/toaster';

const ProviderWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <SessionProvider>
            <NextUIProvider>{children}</NextUIProvider>
            <Toaster />
        </SessionProvider>
    );
};

export default ProviderWrapper;
