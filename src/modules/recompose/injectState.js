import {PropTypes} from 'react';
import withContext from 'recompose/withContext';

export default withContext(
  {initialState: PropTypes.object.isRequired},
  () => ({initialState: window.__OBSERVO_STATE__}),
);
