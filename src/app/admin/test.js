import React from 'react';
import {Link} from 'react-router';
import styles from './test.scss';
import BaseComponent from 'components/base';

export default class Test extends BaseComponent {
  styles = styles;

  render() {
    return <div className={styles.aa}>POOOO <Link to="/">home</Link></div>;
  }
}
