import React from 'react';
import Rc from 'modules/recompose';
import Button from 'modules/components/Button';

export default Rc.compose(
  Rc.provide(({isNew$, deletionResult$}) => {
    let props$ = isNew$.map(({isNew}) => ({isNew}));

    if (deletionResult$) {
      props$ = props$
        .combineLatest(
          deletionResult$.pluck('progress').startWith(false),
          (props, progress) => ({...props, progress}),
        );
    }

    return props$;
  }),
  Rc.branch(
    ({isNew}) => isNew,
    Rc.renderNothing,
    Rc.identity,
  ),
)(({onDelete, progress}) => (
  <Button
    small
    type="button"
    uiStyle="danger"
    onClick={onDelete}
    disabled={progress}
  >
    Supprimer
  </Button>
));
