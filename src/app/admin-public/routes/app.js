import connect from 'components/base/connect';
import styles from './app.scss';
import getObservables from './app.obs.js';

export default connect({styles, getObservables}, ({children}) => children);
