import React from 'react';
import styles from './header.css';
import BaseComponent from 'components/base';

export default class Header extends BaseComponent {
  styles = styles;

  render() {
    return (
      <header className={styles.header}>
        <div>dd</div>
      </header>
    );
  }
}
