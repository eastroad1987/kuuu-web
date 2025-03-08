'use client';

import { createContext, useContext } from 'react';
import { UseAuthType } from '@/types/types';

const AuthContext = createContext<UseAuthType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
  value: UseAuthType;
}

function AuthProvider({ children, value }: AuthProviderProps): JSX.Element {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuthContext(): UseAuthType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Auth compound components must be used within Auth');
  }
  return context;
}

export { AuthProvider, useAuthContext };
export type { UseAuthType, AuthProviderProps };