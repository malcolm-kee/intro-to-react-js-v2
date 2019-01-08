import { Link } from 'gatsby';
import React from 'react';

export const LinkButton = ({ to, children }) => <Link to={to}>{children}</Link>;
