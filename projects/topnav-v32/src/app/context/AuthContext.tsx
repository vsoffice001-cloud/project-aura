/**
 * AuthContext - Global authentication state management
 * 
 * Manages:
 * - User authentication state (logged in/out)
 * - User profile data (name, email, company, designation)
 * - Auth flow mode (signin vs signup)
 * - Login/logout actions
 * 
 * Prototype behavior: No real backend — state is in-memory only.
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface UserProfile {
  email: string;
  name: string;
  company: string;
  designation: string;
  initials: string;
}

export type AuthMode = 'signin' | 'signup';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  authMode: AuthMode;
  authEmail: string;
  setAuthMode: (mode: AuthMode) => void;
  setAuthEmail: (email: string) => void;
  login: (profile: UserProfile) => void;
  loginQuick: (email: string) => void; // For sign-in (no profile completion)
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Utility: extract company name from email domain
export function extractCompanyFromEmail(email: string): string {
  const domain = email.split('@')[1];
  if (!domain) return '';
  const name = domain.split('.')[0];
  // Capitalize first letter of each word
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// Utility: extract initials from name
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return (parts[0]?.[0] || 'U').toUpperCase();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [authMode, setAuthMode] = useState<AuthMode>('signin');
  const [authEmail, setAuthEmail] = useState('');

  const login = useCallback((profile: UserProfile) => {
    setUser({ ...profile, initials: getInitials(profile.name) });
    setIsAuthenticated(true);
  }, []);

  const loginQuick = useCallback((email: string) => {
    const company = extractCompanyFromEmail(email);
    const name = email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const profile: UserProfile = {
      email,
      name,
      company,
      designation: '',
      initials: getInitials(name),
    };
    setUser(profile);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    setAuthEmail('');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        authMode,
        authEmail,
        setAuthMode,
        setAuthEmail,
        login,
        loginQuick,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
