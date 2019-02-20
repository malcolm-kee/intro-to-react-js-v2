import React from 'react';
import { PageContainer } from '../components/page-container';

const Layout = ({ children, pageContext }) => (
  <PageContainer isRoot={pageContext.isRoot}>{children}</PageContainer>
);

export default Layout;
