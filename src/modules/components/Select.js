import React, {PropTypes} from 'react';
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

function Select({placeholder, value, defaultValue, options = [], className: propClassName, ...props}) {
  const className = classnames(styles.formControl, {
    [styles.foo]: !value && !defaultValue && placeholder
  }, propClassName);
  value = value || '';
  return (
    <select {...{...props, value, defaultValue, className}}>
      {placeholder ? <option value="">{placeholder}</option> : null}
      {optionsToArray(options).map(({value, label}, index) =>
        <option key={index} {...{value}}>{label}</option>
      )}
    </select>
  );
}

Select.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  children: PropTypes.node,
  options: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object
  ]).isRequired
};

export default connect({styles}, Select);
