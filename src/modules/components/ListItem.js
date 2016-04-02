import React from 'react';
import styles from './styles/list.scss';
import connect from '~/modules/gravito/connect';
import classNames from 'classnames';

const ListItem = ({
  className: propClassName,
  children,
  ...props
}) => {
  const className = classNames(styles.listItem, propClassName);
  return <li {...{className}} {...props}>{children}</li>;
};

export default connect({styles}, ListItem);
