import React from 'react';
import Rx from 'modules/rxjs';
import Rc from 'modules/recompose';
import Button from 'modules/components/Button';

export default Rc.compose(
  Rc.provide(({isNew$, result$}) => ({
    props$: Rx.Observable.combineLatest(
      result$.pluck('progress').startWith(false),
      isNew$,
      (progress, isNew) => ({progress, isNew}),
    ),
  })),
)(({isNew, progress}) => (
  <Button disabled={progress} small>
    {isNew ? 'Mettre à jour' : 'Créer'}
  </Button>
));
