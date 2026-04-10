import * as React from 'react';
import { useScrollRestoration } from '@/shared/lib/hooks/useScrollRestoration';

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useScrollRestoration();
  return <>{children}</>;
};