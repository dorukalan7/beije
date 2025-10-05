'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface PackageContextType {
  selectedOptions: string[];
  toggleOption: (option: string) => void;
  counts: Record<string, number>;
  increment: (item: string, step?: number) => void;
  decrement: (item: string, step?: number) => void;
}

const PackageContext = createContext<PackageContextType | undefined>(undefined);

interface ProviderProps {
  children: ReactNode;
}

export default function PackageProvider({ children }: ProviderProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('counts');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  // count state'i localStorage'a save
  useEffect(() => {
    localStorage.setItem('counts', JSON.stringify(counts));
  }, [counts]);

   const toggleOption = (option: string) => {
    setSelectedOptions(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const increment = (item: string, step: number = 1) => {
    setCounts(prev => ({ ...prev, [item]: (prev[item] || 0) + step }));
  };

  const decrement = (item: string, step: number = 1) => {
    setCounts(prev => ({
      ...prev,
      [item]: Math.max((prev[item] || 0) - step, 0),
    }));
  };

  return (
    <PackageContext.Provider value={{ selectedOptions, toggleOption, counts, increment, decrement }}>
      {children}
    </PackageContext.Provider>
  );
}

export const usePackage = () => {
  const context = useContext(PackageContext);
  if (!context) throw new Error('usePackage must be used within PackageProvider');
  return context;
};
