import { Link } from 'gatsby';
import React from 'react';
import { joinClassName } from 'join-string';

export const LinkButton = ({
  to,
  children,
  primary,
  large,
  className,
  ...linkProps
}) => (
  <Link
    {...linkProps}
    className={joinClassName(
      'button',
      large && 'button--large',
      primary && 'button--primary',
      className
    )}
    to={to}
  >
    {children}
  </Link>
);
