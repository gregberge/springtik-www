import provide from './provide';
import {combineLatest} from 'rxjs/observable/combineLatest';
import {map} from 'rxjs/operator/map';
import {pluck} from 'rxjs/operator/pluck';

export default (form, field) => provide(({
  props$,
  [`${form}ModelChange$`]: change$,
  [`${form}Model$`]: model$,
  [`${form}Ready$`]: ready$,
}) => {
  const onChange = value => {
    change$.next({[field]: value});
  };

  return {
    props$: combineLatest(
      props$,
      model$::pluck(field),
      ready$::map(ready => !ready),
      (props, value, disabled) => ({
        ...props,
        disabled,
        onChange,
        value,
      })
    ),
  };
});
