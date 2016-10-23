import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import styles from './Select.scss';

/**
 * Get an array of options from props.
 *
 * @returns {{value: string, label: string}[]}
 */
export const optionsToArray = options => {
  if (!Array.isArray(options)) {
    return Object.keys(options).map(key => ({
      value: String(key),
      label: options[key],
    }));
  }

  return options.map(entry => (
    typeof entry === 'string'
      ? ({
        value: entry,
        label: entry,
      })
      : entry
    ));
};

export const optionsPropType = React.PropTypes.oneOfType([
  React.PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.node,
      }),
    ]),
  ),
  React.PropTypes.object,
]).isRequired;

export const Select = ({
  block,
  className: propClassName,
  placeholder,
  value,
  defaultValue,
  options,
  ...props,
}) => {
  const className = classNames(styles.select, {
    [styles.placeholder]: !value && !defaultValue && placeholder,
    [styles.block]: block,
  }, propClassName);

  return (
    <span className={className}>
      <select
        {...props}
        value={value}
        defaultValue={defaultValue}
      >
        {placeholder ? (
          <option value="">
            {placeholder}
          </option>
        ) : null}
        {optionsToArray(options).map(({value, label}, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </select>
    </span>
  );
};

Select.propTypes = {
  block: PropTypes.bool,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  defaultValue: PropTypes.any,
  options: optionsPropType,
};

Select.defaultProps = {
  block: false,
  options: [],
};

export default compose(
  withStyles(styles),
  pure,
)(Select);
