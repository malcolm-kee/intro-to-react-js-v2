import React from 'react';
import { PageContainer } from '../components/page-container';

const Layout = ({ children, location }) => (
  <PageContainer isRoot={location.pathname === '/'}>{children}</PageContainer>
);

export default Layout;
