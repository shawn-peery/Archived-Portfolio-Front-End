import React, { FC } from 'react';
import { Link } from 'gatsby';

import * as styles from './Top-Nav-Bar.module.scss';

interface TopNavBarProps {}

const TopNavBar = ({}: TopNavBarProps) => (
  <nav className={styles.TopNavBar}>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    </ul>
  </nav>
);

export default TopNavBar;
