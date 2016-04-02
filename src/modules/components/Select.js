import React from 'react';
import Select from 'react-select';
import connect from '~/modules/gravito/connect';
import styles from './styles/select.scss';

export default connect({styles}, ({
  addLabelText = 'Ajouter "{label}" ?',
  ...props
}) =>
  <Select {...{addLabelText, ...props}} />
);
