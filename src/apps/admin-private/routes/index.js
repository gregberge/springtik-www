import React from 'react';
import Route from 'react-router/lib/Route';
import connectRoute from '~/modules/gravito/connectRoute';
import App, {routeStore as appStore} from './App';
import Categories, {routeStore as categoriesStore} from './categories/Categories';
import CategoriesNew from './categories/CategoriesNew';
import CategoriesEdit from './categories/CategoriesEdit';
import Activities from './activities/Activities';

export default [
  <Route path="/" component={connectRoute({store: appStore()}, App)}>
    <Route path="categories" component={connectRoute({store: categoriesStore()}, Categories)}>
      <Route path="new" component={CategoriesNew} />
      <Route path="edit/:id" component={CategoriesEdit} />
    </Route>
    <Route path="activities" component={Activities} />
  </Route>
];
