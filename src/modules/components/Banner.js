import React, {PropTypes} from 'react';
import styles from './styles/banner.scss';
import connect from '~/modules/gravito/connect';
import classnames from 'classnames';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Banner = ({uiStyle, show, className: propClassName, children, ...props}) => {
  const uiStyleClassName = uiStyle ? styles[`banner-${uiStyle}`] : null;
  const className = classnames(styles.banner, uiStyleClassName, propClassName);

  return (
    <ReactCSSTransitionGroup
      transitionName="bannerFromTop"
      transitionEnterTimeout={250}
      transitionLeaveTimeout={500}
    >
      {show ? (
        <div key="banner" {...{...props, className}}>
          {children}
        </div>
      ) : null}
    </ReactCSSTransitionGroup>
  );
};

Banner.propTypes = {
  uiStyle: PropTypes.oneOf([
    'info',
    'danger',
    'warning',
    'success'
  ])
};

export default connect({styles}, Banner);
