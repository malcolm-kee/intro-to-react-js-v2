import { Link } from 'gatsby';
import { joinClassName } from 'join-string';
import React from 'react';
import moon from '../images/moon.png';
import sun from '../images/sun.png';
import { Toggle } from './toggle';

export const Navbar = ({ siteTitle, theme, hide }) => (
  <header className={joinClassName('navbar', hide && 'navbar--hide')}>
    <Link to="/">{siteTitle}</Link>
    <div className="navbar-toolbar">
      <Toggle
        className="theme-switcher"
        icons={{
          checked: (
            <img
              src={moon}
              width="16"
              height="16"
              role="presentation"
              style={{ pointerEvents: 'none' }}
              alt="Dark Mode"
            />
          ),
          unchecked: (
            <img
              src={sun}
              width="16"
              height="16"
              role="presentation"
              style={{ pointerEvents: 'none' }}
              alt="Light Mode"
            />
          )
        }}
        checked={theme === 'dark'}
        onChange={e =>
          window.__setPreferredTheme(e.target.checked ? 'dark' : 'light')
        }
      />
    </div>
  </header>
);
