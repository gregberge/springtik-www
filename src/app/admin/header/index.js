import React from 'react';
import styles from './header.scss';
import BaseComponent from 'components/base';
import {Link} from 'react-router';

export default class Header extends BaseComponent {
  styles = styles;

  render() {
    return (
      <header className={styles.header}>
        <div className={styles.logo} />
        <nav className={styles.nav}>
          <Link to="/login">
            <i className="fa fa-sign-in" /> Se connecter
          </Link>
        </nav>
      </header>
    );
  }
}
