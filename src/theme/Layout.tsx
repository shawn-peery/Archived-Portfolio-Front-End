import React, { ReactNode } from 'react';

import { MsalProvider } from '@azure/msal-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  console.log('DEBUGGING - RENDERING LAYOUT COMPONENT');

  console.log('GLOBAL:');
  console.log(global);
  return <>{children}</>;
};

export default Layout;
