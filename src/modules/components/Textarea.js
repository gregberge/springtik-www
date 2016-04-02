import React, {Component} from 'react';
import styles from './styles/textarea.scss';
import connect from '~/modules/gravito/connect';
import classNames from 'classnames';

export default connect({styles}, class Textarea extends Component {
  componentWillMount() {
    this.state = {
      charCount: this.getCharCountFromProps(this.props) || 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const charCount = this.getCharCountFromProps(nextProps);

    if (charCount !== null)
      this.setState({charCount});
  }

  componentDidMount() {
    if (this.refs.textarea.value)
      this.onChange({target: this.refs.textarea});
  }

  getCharCountFromProps(props) {
    return typeof props.value === 'string'
      ? props.value.length
      : typeof props.defaultValue === 'string'
        ? props.defaultValue.length
        : null;
  }

  onChange = event => {
    if (this.props.onChange)
      this.props.onChange(event);

    this.setState({charCount: event.target.value.length});
  };

  focus() {
    this.refs.textarea.focus();
  }

  render() {
    const {
      className: propClassName,
      containerClassName: propContainerClassName,
      noControl,
      counter,
      hasError,
      /* eslint-disable no-unused-vars */
      onChange,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;
    const className = classNames({
      [styles.formControl]: !noControl
    }, propClassName);
    const containerClassName = classNames(styles.controlContainer, {
      [styles.containerError]: hasError
    }, propContainerClassName);

    return (
      <span className={containerClassName}>
        <textarea
          ref="textarea"
          onChange={this.onChange}
          {...{...props, className}}
        />
        {counter ? (
          <div className={styles.counter}>
            {this.state.charCount} / {this.props.maxLength}
          </div>
        ) : null}
      </span>
    );
  }
});
