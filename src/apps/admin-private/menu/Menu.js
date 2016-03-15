import React from 'react';
import styles from './menu.scss';
import connect from '~/modules/gravito/connect';
import Link from 'react-router/lib/Link';

export default connect({styles}, () => (
  <nav className={styles.menu}>
    <ul>
      <li>
        <Link to="/categories" activeClassName={styles.active}>Catégories</Link>
        <Link to="/activities" activeClassName={styles.active}>Activités</Link>
      </li>
    </ul>
  </nav>
));
