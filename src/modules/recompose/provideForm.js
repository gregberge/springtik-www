import provide from './provide';
import {Subject} from 'rxjs/Subject';
import {merge} from 'rxjs/observable/merge';
import {of} from 'rxjs/observable/of';
import {map} from 'rxjs/operator/map';
import {mapTo} from 'rxjs/operator/mapTo';
import {startWith} from 'rxjs/operator/startWith';
import {withLatestFrom} from 'rxjs/operator/withLatestFrom';
import {store} from 'modules/rxjs/operator/store';

export const provideFormObservables = ({name, initial$}) => {
  const submit$ = new Subject();
  const modelChange$ = new Subject();
  const model$ = merge(
    initial$,
    modelChange$::map(changes => model => ({...model, ...changes})),
  )::store({});
  const submitted$ = submit$::withLatestFrom(model$, (_, model) => model);
  const ready$ = initial$::mapTo(true)::startWith(false);

  return {
    [`${name}Ready$`]: ready$,
    [`${name}ModelChange$`]: modelChange$,
    [`${name}Model$`]: model$,
    [`${name}Submit$`]: submit$,
    [`${name}Submitted$`]: submitted$,
  };
};

export default ({name, fields}) => provide(() => {
  return provideFormObservables({
    name,
    initial$: of(fields.reduce((o, f) => ({...o, [f]: ''}), {})),
  });
});
