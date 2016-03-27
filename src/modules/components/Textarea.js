import React, {Component, PropTypes} from 'react';
import styles from './styles/textarea.scss';
import connect from '~/modules/gravito/connect';
import classNames from 'classnames';

export default connect({styles}, class Textarea extends Component {
  componentWillMount() {
    const charCount = this.props.value
      ? this.props.value.length
      : this.props.defaultValue
        ? this.props.defaultValue.length
        : 0;

    this.state = {charCount};
  }

  componentDidMount() {
    if (this.refs.textarea.value)
      this.onChange({target: this.refs.textarea});
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
    const {className: propClassName, onChange, counter, hasError, ...props} = this.props;
    const className = classNames(styles.formControl, propClassName);
    const containerClassName = classNames(styles.controlContainer, {
      [styles.containerError]: hasError
    });

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
