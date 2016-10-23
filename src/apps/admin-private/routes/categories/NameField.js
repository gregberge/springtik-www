import Rc from 'modules/recompose';
import FormGroup from 'modules/ui-components/FormGroup';
import Input from 'modules/components/Input';

export default Rc.compose(
  Rc.wrapIn(FormGroup),
  Rc.connectField('category', 'name'),
  Rc.eventToValue,
  Rc.addProps({
    placeholder: 'Titre de la catégorie',
    required: true,
  }),
)(Input);
