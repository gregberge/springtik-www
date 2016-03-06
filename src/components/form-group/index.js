import React from 'react';
import styles from './form-group.scss';
import connect from 'components/base/connect';

const FormGroup = ({children}) =>
  <div className={styles.formGroup}>{children}</div>;

export default connect({styles}, FormGroup);
