import React, { ReactNode } from 'react';

import { MsalProvider } from '@azure/msal-react';
import TopNavBar from './Top-Nav-Bar/Top-Nav-Bar';

import './global.scss';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  console.log('DEBUGGING - RENDERING LAYOUT COMPONENT');

  console.log('GLOBAL:');
  console.log(global);
  return (
    <>
      <TopNavBar />
      {children}
    </>
  );
};

export default Layout;
