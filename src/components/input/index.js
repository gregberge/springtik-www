import React, {PropTypes} from 'react';
import styles from './input.scss';
import Component from 'components/base';
import classnames from 'classnames';

export default class Input extends Component {
  static propTypes = {
    icon: PropTypes.string
  };

  styles = styles;

  focus() {
    this.refs.input.focus();
  }

  componentDidMount() {
    if (this.refs.input.value) {
      const event = new Event('change');
      this.refs.input.dispatchEvent(event);
    }
  }

  render() {
    const {className: propClassName, icon, hasError, ...props} = this.props;
    const className = classnames(styles.formControl, propClassName);
    const inputElement = <input ref="input" {...{className}} {...props} />;

    return (
      <span className={hasError ? styles.containerError : null}>
        {icon
          ? <div className={`${styles.inputIcon} fa fa-${this.props.icon}`} />
          : null}
        {inputElement}
      </span>
    );
  }
}
