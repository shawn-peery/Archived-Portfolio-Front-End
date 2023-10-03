import React, { FC } from 'react';
import { Link } from 'gatsby';

import * as styles from './Top-Nav-Bar.module.scss';

interface TopNavBarProps {}

const TopNavBar: FC<TopNavBarProps> = () => (
  <div className={styles.TopNavBar} data-testid="TopNavBar">
    <Link to="/profile">Profile</Link>
    {/* <button>Test</button> */}
  </div>
);

export default TopNavBar;
