import React from 'react';
import ReactDOMServer from 'react-dom/server';
import match from 'react-router/lib/match';
import RouterContext from 'react-router/lib/RouterContext';
import connect from '~/modules/gravito/server/connect';
import resolve from '~/modules/gravito/server/resolve';

export default ({routesPath, layout}) => (req, res, next) => {
  const css = [];

  const routes = require(routesPath).default({req});

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

    resolve(props, (err, routeStores) => {
      if (err)
        return next(err);

      const content = ReactDOMServer.renderToString(
        React.createElement(connect({
          routeStores,
          insertCss: styles => css.push(styles)
        }, RouterContext), props)
      );

      res.render(layout, {
        content,
        css: css.join(''),
        routeStores: JSON.stringify(routeStores) || 'null'
      });
    });
  });
};
