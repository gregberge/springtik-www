import React from 'react';
import ReactDOMServer from 'react-dom/server';
import match from 'react-router/lib/match';
import createInjector from '~/components/base/create-injector';

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

    Promise.all(props.components.map(Comp => {
      if (!Comp.fetchResources)
        return Promise.resolve();

      return Comp.fetchResources()
        .then(resources => ({[Comp.displayName]: resources}));
    })).then(resources => {
      const initialResources = resources
        .reduce((all, res) => ({...all, ...res}), {});

      const Injector = createInjector({css, initialResources});

      const content = ReactDOMServer.renderToString(
        React.createElement(Injector, props)
      );

      res.render(layout, {
        content,
        css: css.join(''),
        resources: JSON.stringify(initialResources)
      });
    })
    .catch(err => next(err));
  });
};
