import React, {PropTypes} from 'react';
import styles from './styles/button.scss';
import connect from '~/modules/gravito/connect';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const Button = ({
  className: propClassName,
  children,
  block,
  large,
  small,
  uiStyle,
  ...props
}) => {
  const uiStyleClassName = uiStyle ? `btn-${uiStyle}` : null;
  const className = cx('btn', {
    'btn-block': block,
    'btn-large': large,
    'btn-small': small
  }, uiStyleClassName, propClassName);
  return <button {...{className}} {...props}>{children}</button>;
};

Button.propTypes = {
  block: PropTypes.bool,
  large: PropTypes.bool,
  uiStyle: PropTypes.oneOf(['danger'])
};

export default connect({styles}, Button);
