import React from 'react';
import createHelper from 'recompose/createHelper';
import createEagerElement from 'recompose/createEagerElement';

export default createHelper((Wrapper, wrapperProps) => Component => props => (
  <Wrapper {...wrapperProps}>
    {createEagerElement(Component, props)}
  </Wrapper>
), 'wrapIn');
