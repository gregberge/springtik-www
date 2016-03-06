import React from 'react';
import ReactDOMServer from 'react-dom/server';
import match from 'react-router/lib/match';
import createInjector from '~/components/base/create-injector';
import Rx from '@doctolib/rx';

export default ({routesPath}) => (req, res, next) => {
  const css = [];
  const js = [];

  const Injector = createInjector({css, js});

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

      return Comp.fetchResources().then(resources => {
        Comp.resources$ = Rx.Observable.just(resources);
      });
    })).then(() => {
      let content = ReactDOMServer.renderToString(
        React.createElement(Injector, props)
      );

      content = content
        .replace('/* %CSS% */', css.join(''))
        .replace('/* %JS% */', js.join(''));

      res.send(`<!DOCTYPE html>${content}`);
    })
    .catch(err => next(err));
  });
};
