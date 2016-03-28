import React, {Component, PropTypes} from 'react';
import Select from 'react-select';
import classnames from 'classnames';
import connect from '~/modules/gravito/connect';
import styles from './styles/select.scss';

export default connect({styles}, ({
  addLabelText = 'Ajouter "{label}" ?',
  ...props
}) =>
  <Select {...{addLabelText, ...props}} />
);
