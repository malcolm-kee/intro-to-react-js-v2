import { Link } from 'gatsby';
import React from 'react';

export const LinkButton = ({ to, children }) => (
  <Link
    to={to}
    style={{
      display: 'flex',
      justifyContent: 'center',
      textDecoration: 'none'
    }}
  >
    {children}
  </Link>
);
