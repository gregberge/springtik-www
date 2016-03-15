import React, {Component, PropTypes} from 'react';
import styles from './styles/input.scss';
import connect from '~/modules/gravito/connect';
import classnames from 'classnames';

export default connect({styles}, class Input extends Component {
  static propTypes = {
    icon: PropTypes.string
  };

  componentDidMount() {
    if (this.refs.input.value)
      this.props.onChange({target: this.refs.input});
  }

  focus() {
    this.refs.input.focus();
  }

  render() {
    const {className: propClassName, icon, hasError, ...props} = this.props;
    const className = classnames(styles.formControl, {
      [styles.withIcon]: icon
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
});
