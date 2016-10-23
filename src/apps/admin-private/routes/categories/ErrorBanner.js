import React from 'react';
import Rc from 'modules/recompose';
import Banner from 'modules/components/Banner';

export default Rc.compose(
  Rc.provide(({deleteResult$, result$}) => {
    let props$ = result$.map(({error}) => ({show: error}));

    if (deleteResult$) {
      props$ = result$.combineLatest(deleteResult$, (props, {error}) => ({
        show: props.error || error,
      }));
    }

    return {
      props$: props$.startWith({show: false}),
    };
  }),
)(({show}) => (
  <Banner show={show} uiStyle="danger">
    Une erreur est survenue, veuillez réessayer.
  </Banner>
));
