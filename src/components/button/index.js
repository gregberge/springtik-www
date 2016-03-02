import React from 'react';
import styles from './button.scss';
import BaseComponent from 'components/base';
import classnames from 'classnames';

export default class Button extends BaseComponent {
  // static propTypes = {
  //   block: PropTypes.bool,
  //   large: PropTypes.bool
  // };

  styles = styles;

  render() {
    const {className: propClassName, children, block, large, ...props} = this.props;
    const className = classnames(styles.btn, {
      [styles.btnBlock]: block,
      [styles.btnLarge]: large
    }, propClassName);
    return <button {...{className}} {...props}>{children}</button>;
  }
}
