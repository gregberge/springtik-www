import React from 'react';
import styles from './header.scss';
import BaseComponent from 'components/base';

export default class Header extends BaseComponent {
  styles = styles;

  render() {
    return (
      <header className={styles.header}>
        <div className={styles.logo} />
        <nav className={styles.nav}>
          Se connecter
        </nav>
      </header>
    );
  }
}
