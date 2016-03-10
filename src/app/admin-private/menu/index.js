import React from 'react';
import styles from './menu.scss';
import connect from 'components/base/connect';
import Link from 'react-router/lib/Link';

export default connect({styles}, () => (
  <nav className={styles.menu}>
    <ul>
      <li>
        <Link to="/activities" activeClassName={styles.active}>Activités</Link>
      </li>
    </ul>
  </nav>
));
