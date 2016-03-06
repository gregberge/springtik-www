import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {match, RouterContext} from 'react-router';

export default ({configureStore, routesPath}) => {
  const store = configureStore();
  const routes = require(routesPath);
  const initialState = store.getState();
  const css = [];

  class ContextInjector extends React.Component {
    static childContextTypes = {
      insertCss: React.PropTypes.func.isRequired
    };

    getChildContext() {
      return {
        insertCss: styles =>
          css.push(styles._getCss())
      };
    }

    render() {
      return React.createElement(RouterContext, this.props);
    }
  }

  return (req, res, next) => {
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
      if (error)
        return next(error);

      if (redirectLocation)
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);

      if (!renderProps)
        return res.status(404).send('Not found');

      let content = ReactDOMServer.renderToString(
        React.createElement(ContextInjector, renderProps)
      );

      content = content
        .replace('/* %CSS% */', css.join(''))
        .replace('/* %JS% */', 'WebFontConfig = {google: {families: [\'Open+Sans::latin\', \'Montserrat:400,700:latin\']}};');

      res.send(`<!DOCTYPE html>${content}`);

      res.status(404).send('Not found');
    });
  };
};
