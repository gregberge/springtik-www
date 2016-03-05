import React, {PropTypes} from 'react';
import styles from './button.scss';
import Component from 'components/base';
import classnames from 'classnames';

export default class Button extends Component {
  static propTypes = {
    block: PropTypes.bool,
    large: PropTypes.bool
  };

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
