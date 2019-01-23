import { Link } from 'gatsby';
import React from 'react';
import { joinClassName } from 'join-string';

export const LinkButton = ({ to, children, primary, large }) => (
  <Link
    className={joinClassName(
      'button',
      large && 'button--large',
      primary && 'button--primary'
    )}
    to={to}
  >
    {children}
  </Link>
);
