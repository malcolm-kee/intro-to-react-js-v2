import { Link } from 'gatsby';
import React from 'react';

export const PageContainer = ({ title, children }) => (
  <div>
    <header
      style={{
        background: '#61dafb',
        padding: 16,
        position: 'fixed',
        top: 0,
        width: '100%'
      }}
    >
      <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
        {title}
      </Link>
    </header>
    <main style={{ padding: '64px 32px 32px' }}>{children}</main>
  </div>
);
