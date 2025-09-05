'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface DemoUser {
  id: string;
  email: string;
  name: string;
  image?: string;
}

interface AuthContextType {
  user: DemoUser | null;
  isDemo: boolean;
  loginDemo: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [isDemo, setIsDemo] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user is in demo mode
    const demoUser = localStorage.getItem('demo-user');
    if (demoUser) {
      setUser(JSON.parse(demoUser));
      setIsDemo(true);
    }
  }, []);

  const loginDemo = () => {
    const demoUser: DemoUser = {
      id: 'demo-user-1',
      email: 'demo@adsyntho.com',
      name: 'Demo User',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
    };
    
    localStorage.setItem('demo-user', JSON.stringify(demoUser));
    setUser(demoUser);
    setIsDemo(true);
  };

  const logout = () => {
    localStorage.removeItem('demo-user');
    setUser(null);
    setIsDemo(false);
  };

  return (
    <AuthContext.Provider value={{ user, isDemo, loginDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}