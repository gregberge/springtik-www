import React, {PropTypes} from 'react';
import compose from 'recompose/compose';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import pure from 'recompose/pure';
import classNames from 'classnames';
import styles from './TextBox.scss';

const styleProp = (name, value) => {
  if (value === true) {
    return name;
  } else if (typeof value === 'string') {
    return `${value}-${name}`;
  }
};

const styleProps = (styles, props) => {
  return Object.entries(props)
    .map(([name, value]) => styles[styleProp(name, value)]);
};

const stylePropType = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.string.isRequired,
]);

export const TextBox = ({
  bordered,
  block,
  groupedLeft,
  icon,
  size,
  spaced,
  value,
  ...props,
}) => (
  <span
    className={classNames(
      styles.textBox,
      styleProps(styles, {bordered, block, groupedLeft, spaced}),
      {
        [styles[`${size}-size`]]: size,
        [styles.withIcon]: icon,
      }
    )}
  >
    {icon ? (
      <div className={styles.icon}>
        {icon}
      </div>
    ) : null}
    <input
      className={styles.input}
      value={value}
      {...props}
    />
  </span>
);

TextBox.propTypes = {
  bordered: stylePropType,
  block: stylePropType,
  groupedLeft: stylePropType,
  icon: PropTypes.node,
  size: PropTypes.oneOf(['xl']),
  spaced: stylePropType,
  value: PropTypes.string,
};

export default compose(
  withStyles(styles),
  pure
)(TextBox);
