import React, {PropTypes} from 'react';
import styles from './styles/button.scss';
import connect from '~/modules/gravito/connect';
import classnames from 'classnames';

const Button = ({className: propClassName, children, block, large, ...props}) => {
  const className = classnames(styles.btn, {
    [styles.btnBlock]: block,
    [styles.btnLarge]: large
  }, propClassName);
  return <button {...{className}} {...props}>{children}</button>;
};

Button.propTypes = {
  block: PropTypes.bool,
  large: PropTypes.bool
};

export default connect({styles}, Button);
