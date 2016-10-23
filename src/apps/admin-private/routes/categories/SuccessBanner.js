import React from 'react';
import Rc from 'modules/recompose';
import Banner from 'modules/components/Banner';

export default Rc.compose(
  Rc.provide(({result$}) => ({
    props$: result$
      .map(({success}) => ({show: success}))
      .startWith({show: false}),
  })),
)(({show}) => (
  <Banner show={show} uiStyle="success">
    La catégorie a bien été modifiée.
  </Banner>
));
