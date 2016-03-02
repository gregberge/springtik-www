import React from 'react';
import styles from './form-group.scss';
import BaseComponent from 'components/base';

export default class FormGroup extends BaseComponent {
  styles = styles;

  render() {
    return <div className={styles.formGroup}>{this.props.children}</div>;
  }
}
