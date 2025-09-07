// components/auth/AuthProvider.tsx
"use client";

import React, { createContext, useContext } from "react";

import { useAuth } from "../../@modal/(.)auth/hooks/useAuth";

interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: { email: string; password: string }) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  // const auth = useAuth();

  // return (
  //   <AuthContext.Provider value={auth}>
  //     {children}
  //   </AuthContext.Provider>
  // );
  return <>{children}</>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
