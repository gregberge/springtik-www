import React, {Component, PropTypes} from 'react';
import styles from './styles/input.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classnames from 'classnames';

export class Input extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    icon: PropTypes.string,
    className: PropTypes.string,
    hasError: PropTypes.bool,
  };

  componentDidMount() {
    if (this.refs.input.value && this.props.onChange)
      this.props.onChange({target: this.refs.input});
  }

  focus() {
    this.refs.input.focus();
  }

  render() {
    const {
      className: propClassName,
      icon,
      hasError,
      ...props,
    } = this.props;

    const className = classnames(styles.formControl, {
      [styles.withIcon]: icon,
    }, propClassName);
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

export default withStyles(styles)(Input);
