import React, { FC } from 'react';
import styles from './Top-Nav-Bar.module.scss';
import { Link } from 'gatsby';

interface TopNavBarProps {}

const TopNavBar: FC<TopNavBarProps> = () => (
  <div className={styles.TopNavBar} data-testid="TopNavBar">
    TopNavBar Component
    <Link to="/profile">Profile</Link>
    {/* <button>Test</button> */}
  </div>
);

export default TopNavBar;
