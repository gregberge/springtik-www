import React from 'react';
import styles from './form-group.scss';
import Component from 'components/base';

export default class FormGroup extends Component {
  styles = styles;

  render() {
    return <div className={styles.formGroup}>{this.props.children}</div>;
  }
}
