import withStyles from 'isomorphic-style-loader/lib/withStyles';
import branch from 'recompose/branch';
import compose from 'recompose/compose';
import getContext from 'recompose/getContext';
import nest from 'recompose/nest';
import renderNothing from 'recompose/renderNothing';
import withContext from 'recompose/withContext';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';
import addProps from './addProps';
import connectField from './connectField';
import connectForm from './connectForm';
import eventToValue from './eventToValue';
import handle from './handle';
import injectState from './injectState';
import omitProps from './omitProps';
import onlyClientSide from './onlyClientSide';
import provide from './provide';
import provideForm from './provideForm';
import universalProvide from './universalProvide';
import wrapIn from './wrapIn';
import identity from 'lodash/fp/identity';

export default {
  addProps,
  branch,
  compose,
  connectField,
  connectForm,
  eventToValue,
  getContext,
  handle,
  identity,
  injectState,
  nest,
  omitProps,
  onlyClientSide,
  provide,
  provideForm,
  universalProvide,
  renderNothing,
  withContext,
  withHandlers,
  withProps,
  withStyles,
  wrapIn,
};
