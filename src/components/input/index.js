import React, {PropTypes} from 'react';
import styles from './input.scss';
import BaseComponent from 'components/base';
import classnames from 'classnames';

export default class Input extends BaseComponent {
  static propTypes = {
    icon: PropTypes.string
  };

  styles = styles;

  render() {
    const {className: propClassName, icon, ...props} = this.props;
    const className = classnames(styles.formControl, propClassName);
    const inputElement = <input {...{className}} {...props} />;

    if (icon)
      return (
        <span>
          <div className={`${styles.inputIcon} fa fa-${this.props.icon}`} />
          {inputElement}
        </span>
      );

    return inputElement;
  }
}
