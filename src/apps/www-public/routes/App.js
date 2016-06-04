import React, {PropTypes} from 'react';
import theme from './App.scss';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';

export const App = ({
  children,
}, {
  router,
}) => (
  <div className={theme.app}>
    <AppHeader background={!router.isActive('/', true)} />
    {children}
    <AppFooter />
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

App.contextTypes = {
  router: PropTypes.shape({
    isActive: PropTypes.func.isRequired,
  }).isRequired,
};

export default withStyles(theme)(App);
