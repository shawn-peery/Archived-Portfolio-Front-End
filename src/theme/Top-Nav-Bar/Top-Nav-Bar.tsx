import React, { FC } from 'react';
import { Link } from 'gatsby';

import * as styles from './Top-Nav-Bar.module.scss';

interface TopNavBarProps {}

const TopNavBar = ({}: TopNavBarProps) => (
  <nav className={styles.TopNavBar}>
    <Link to="/index">Home</Link>
    <Link to="/profile">Profile</Link>
  </nav>
);

export default TopNavBar;
