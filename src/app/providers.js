'use client';

import { StaticDataProvider } from "@/context/StaticDataContext";

export function Providers({ children }) { 
  return (
      <StaticDataProvider>{children}</StaticDataProvider>
  );
}