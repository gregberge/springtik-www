import React, {PropTypes} from 'react';
import styles from './styles/toolbar.scss';
import connect from '~/modules/gravito/connect';
import classnames from 'classnames';

const Toolbar = ({className: propClassName, children, ...props}) => {
  const className = classnames(styles.toolbar, propClassName);

  return (
    <div {...{...props, className}}>
      {children}
    </div>
  );
};

export default connect({styles}, Toolbar);
