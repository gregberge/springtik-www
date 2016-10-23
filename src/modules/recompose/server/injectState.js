import {PropTypes} from 'react';
import withContext from 'recompose/withContext';

export default initialState => withContext(
  {initialState: PropTypes.object.isRequired},
  () => ({initialState}),
);
