import {PropTypes} from 'react';
import branch from 'recompose/branch';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import renderNothing from 'recompose/renderNothing';
import identity from 'lodash/fp/identity';

export default compose(
  getContext({$window: PropTypes.object.isRequired}),
  branch(
    ({$window}) => !$window,
    renderNothing,
    identity,
  )
);
