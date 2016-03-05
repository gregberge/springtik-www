import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import path from 'path';

export default ({configPath}) => (req, res, next) => {
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

  const config = require(configPath).default;
  const serverPath = path.join(config[1].output.path, config[1].output.filename);
  const routes = require(serverPath).default;

  match({routes, location: req.url}, (error, redirectLocation, props) => {
    if (error) {
      next(error);
      return;
    }

    if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      return;
    }

    if (!props) {
      res.status(404).send('Not found');
      return;
    }

    let content = ReactDOMServer.renderToString(
      React.createElement(ContextInjector, props)
    );

    content = content
      .replace('/* %CSS% */', css.join(''))
      .replace('/* %JS% */', 'WebFontConfig = {google: {families: [\'Open+Sans::latin\', \'Montserrat:400,700:latin\']}};');

    res.send(`<!DOCTYPE html>${content}`);
  });
};
