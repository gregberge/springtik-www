import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import connect from '~/modules/gravito/connect';
import styles from './styles/select.scss';

function optionsToArray(options) {
  if (!Array.isArray(options))
    return Object.keys(options)
      .map(key =>
        ({value: String(key), label: options[key]})
      );

  return options.map(entry =>
    typeof entry === 'string' ? ({value: entry, label: entry}) : entry
  );
}

class Select extends Component {
  static propTypes = {
    options: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object
    ]).isRequired
  };

  componentWillMount() {
    const {value, defaultValue, placeholder} = this.props;
    this.state = {placeholder: !value && !defaultValue && placeholder};
  }

  onChange = event => {
    if (this.props.onChange)
      this.props.onChange(event);

    const {placeholder} = this.props;
    this.setState({placeholder: !event.target.value && placeholder});
  };

  render() {
    const {
      placeholder,
      options = [],
      className: propClassName,
      onChange,
      ...props
    } = this.props;

    const className = classnames(styles.formControl, {
      [styles.placeholder]: this.state.placeholder
    }, propClassName);

    return (
      <select
        {...{...props, className}}
        onChange={this.onChange}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {optionsToArray(options).map(({value, label}, index) =>
          <option key={index} {...{value}}>{label}</option>
        )}
      </select>
    );
  }
}

export default connect({styles}, Select);
