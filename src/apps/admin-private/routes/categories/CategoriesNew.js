import React from 'react';
import {Form, Input, Select} from '~/apps/admin-private/form';
import apiClient from '~/apps/admin-private/apiClient';
import connect from '~/modules/gravito/connect';
import Rx from 'rxjs/Rx';
import '~/modules/rx-extended/watchTask';
import {PROGRESS} from '~/modules/rx-extended/taskStates';

const levelOptions = {
  1: 'Premier niveau',
  2: 'Second niveau'
};

export const store = () => () => {
  const submit$ = new Rx.Subject();
  const result$ = submit$
    .map(model => ({
      ...model,
      level: Number(model.level)
    }))
    .watchTask(model => apiClient.categories.create(model))
    .publishReplay(null, 1)
    .refCount();

  const progress$ = result$.map(({state}) => state === PROGRESS);

  return {submit$, progress$};
};

export default connect(({store: store()}), ({onSubmit, progress}) =>
  <Form submitText="Créer la catégorie" {...{onSubmit, progress}}>
    <Input
      autoFocus
      name="name"
      placeholder="Titre de la catégorie"
      is-required
    />
    <Select
      autoFocus
      name="level"
      placeholder="Niveau de la catégorie"
      options={levelOptions}
      is-required
    />
  </Form>
);
