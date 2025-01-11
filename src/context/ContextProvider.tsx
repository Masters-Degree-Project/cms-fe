'use client';

import type { ReactNode } from 'react';

import LoadingProvider from './LoadingContext'
import { MessageProvider } from '@/context/MessageContext'

type Props = {
  children: ReactNode;
};

function ContextProviders({ children }: Props) {
  return (
      <LoadingProvider>
        <MessageProvider>
          {children}
        </MessageProvider>
      </LoadingProvider>
  );
}

export default ContextProviders;
