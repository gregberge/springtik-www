import classNames from 'classnames';
import Rc from 'modules/recompose';
import styles from './FormGroup.scss';

export default Rc.compose(
  Rc.withStyles(styles),
  Rc.withProps(({className}) => ({
    className: classNames(styles['form-group'], className),
  })),
)(Rc.nest('div'));
