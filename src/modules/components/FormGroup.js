import React from 'react';
import classNames from 'classnames';
import connect from '~/modules/gravito/connect';
import styles from './styles/form-group.scss';

const FormGroup = ({
  className: propClassName,
  children
}) => {
  const className = classNames(styles.formGroup, propClassName);
  return (
    <div {...{className}}>
      {children}
    </div>
  );
};

export default connect({styles}, FormGroup);
