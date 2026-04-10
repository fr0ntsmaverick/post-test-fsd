import { HashRouter } from 'react-router-dom';
import * as React from 'react';

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  return <HashRouter>{children}</HashRouter>;
};