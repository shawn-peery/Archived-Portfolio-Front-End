import React, { FC } from 'react';
import styles from './Top-Nav-Bar.module.scss';

interface TopNavBarProps {}

const TopNavBar: FC<TopNavBarProps> = () => (
  <div className={styles.TopNavBar} data-testid="TopNavBar">
    TopNavBar Component
  </div>
);

export default TopNavBar;
