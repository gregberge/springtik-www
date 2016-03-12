import React from 'react';
import styles from './styles/form-group.scss';
import connect from '~/modules/gravito/connect';

const FormGroup = ({children}) =>
  <div className={styles.formGroup}>{children}</div>;

export default connect({styles}, FormGroup);
