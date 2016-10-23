import React, {PropTypes} from 'react';
import ReactSelect from 'react-select';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './styles/select.scss';

const Select = ({
  allowCreate,
  promptTextCreator = label => `Ajouter "${label}" ?`,
  ...props,
}) => {
  const Component = allowCreate ? ReactSelect.Creatable : ReactSelect;
  return (
    <Component
      simpleValue
      promptTextCreator={promptTextCreator}
      {...props}
    />
  );
};

Select.propTypes = {
  allowCreate: PropTypes.bool,
  promptTextCreator: PropTypes.func,
};

export default withStyles(styles)(Select);
