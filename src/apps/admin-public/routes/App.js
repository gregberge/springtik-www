import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './app.scss';

export default withStyles(styles)(
  ({children}) => children
);
