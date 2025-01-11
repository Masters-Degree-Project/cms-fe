/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import type {
  ReactNode} from 'react';
import { useContext
,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { usePathname } from 'next/navigation';

type Props = {
  children: ReactNode;
};

const defaultState = {
  loading: false,
  setLoading: (bool: boolean) => {},
};

export const LoadingContext = createContext(defaultState);

function LoadingProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(false);



  const pathname = usePathname();

  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  const value = useMemo(
    () => ({
      loading,
      setLoading
    }),
    [loading, setLoading]
  );


return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

export default LoadingProvider;

export const useLoading = () => {
  return useContext(LoadingContext);
};
