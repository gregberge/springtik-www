import React, {PropTypes} from 'react';
import styles from './alert.scss';
import Component from 'components/base';
import classnames from 'classnames';

export default class Alert extends Component {
  static propTypes = {
    uiStyle: PropTypes.oneOf([
      'danger'
    ])
  };

  styles = styles;

  render() {
    const {uiStyle, className: propClassName, children, ...props} = this.props;
    const uiStyleClassName = uiStyle ? styles[uiStyle] : null;
    const className = classnames(styles.alert, uiStyleClassName, propClassName);

    return (
      <div {...{...props, className}}>
        {children}
      </div>
    );
  }
}
