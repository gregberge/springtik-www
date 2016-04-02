import React from 'react';
import styles from './styles/list.scss';
import connect from '~/modules/gravito/connect';
import classNames from 'classnames';

const List = ({
  className: propClassName,
  children,
  ...props
}) => {
  const className = classNames(styles.list, propClassName);
  return <ul {...{className}} {...props}>{children}</ul>;
};

export default connect({styles}, List);
