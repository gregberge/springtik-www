import Rc from 'modules/recompose';
import FormGroup from 'modules/ui-components/FormGroup';
import Select from 'modules/components/Select';

export default Rc.compose(
  Rc.wrapIn(FormGroup),
  Rc.connectField('category', 'keywords'),
  Rc.provide(({categories$, props$}) => ({
    props$: props$.combineLatest(
      categories$
        .map(categories => {
          return Array.from(
            new Set(
              categories.reduce((all, {keywords}) => all.concat(keywords), [])
            )
          ).map(value => ({value, label: value}));
        }),
      (props, options) => ({...props, options}),
    ),
  })),
  Rc.withHandlers({
    onChange: ({onChange}) => value => onChange(value ? value.split(',') : []),
  }),
  Rc.addProps({
    allowCreate: true,
    instanceId: 'keywords',
    multi: true,
    placeholder: 'Mots clefs',
    required: true,
  }),
)(Select);
