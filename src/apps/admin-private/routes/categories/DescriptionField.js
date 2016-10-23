import Rc from 'modules/recompose';
import FormGroup from 'modules/ui-components/FormGroup';
import Textarea from 'modules/components/Textarea';

export default Rc.compose(
  Rc.wrapIn(FormGroup),
  Rc.connectField('category', 'description'),
  Rc.eventToValue,
  Rc.addProps({
    counter: true,
    maxLength: 180,
    placeholder: 'Description de la catégorie',
    rows: 4,
  }),
)(Textarea);
