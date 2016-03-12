import React, {PropTypes} from 'react';
import styles from './styles/alert.scss';
import connect from '~/modules/gravito/connect';
import classnames from 'classnames';

const Alert = ({uiStyle, className: propClassName, children, ...props}) => {
  const uiStyleClassName = uiStyle ? styles[uiStyle] : null;
  const className = classnames(styles.alert, uiStyleClassName, propClassName);

  return (
    <div {...{...props, className}}>
      {children}
    </div>
  );
};

Alert.propTypes = {
  uiStyle: PropTypes.oneOf([
    'danger'
  ])
};

export default connect({styles}, Alert);
