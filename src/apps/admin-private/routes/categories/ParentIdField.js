import Rc from 'modules/recompose';
import FormGroup from 'modules/ui-components/FormGroup';
import Select from 'modules/components/Select';

export default Rc.compose(
  Rc.wrapIn(FormGroup),
  Rc.connectField('category', 'parentId'),
  Rc.provide(({categoryModel$, categories$, props$}) => ({
    props$: props$.combineLatest(
      categories$
        .map(categories => (
          categories
            .filter(({level}) => level === 1)
            .map(({id, name}) => ({value: id, label: name}))
        )),
      categoryModel$.pluck('level'),
      (props, options, level) => ({
        ...props,
        options,
        show: level === 2,
      }),
    ),
  })),
  Rc.branch(
    ({show}) => !show,
    Rc.renderNothing,
    Rc.identity,
  ),
  Rc.omitProps('show'),
  Rc.addProps({
    instanceId: 'parentId',
    placeholder: 'Catégorie parente',
    required: true,
  }),
)(Select);
