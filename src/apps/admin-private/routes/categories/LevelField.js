import Rc from 'modules/recompose';
import FormGroup from 'modules/ui-components/FormGroup';
import Select from 'modules/components/Select';

const options = [
  {value: 1, label: 'Premier niveau'},
  {value: 2, label: 'Second niveau'},
];

export default Rc.compose(
  Rc.wrapIn(FormGroup),
  Rc.connectField('category', 'level'),
  Rc.addProps({
    instanceId: 'level',
    options,
    placeholder: 'Niveau de la catégorie',
    required: true,
  }),
)(Select);
