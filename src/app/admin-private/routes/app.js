import React from 'react';
import connect from 'components/base/connect';
import styles from './app.scss';
import Header from '../header';
import Menu from '../menu';
import apiClient from 'app/admin-private/api-client';

const scripts = `
  WebFontConfig = {google: {families: [\'Open+Sans::latin\', \'Montserrat:400,700:latin\']}};
`;

const fetchResources = () => apiClient.me();

const getObservables = (_, {resources$}) => {
  return {
    me$: resources$
  };
};

export default connect({styles, scripts, getObservables, fetchResources}, ({children}) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>Springtik</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
      <style type="text/css" ref="style">/* %CSS% */</style>
    </head>
    <body>
      <Header />
      <Menu />
      {children}
      <script>/* %JS% */</script>
      <script async src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js" />
      <script async src="/dist/bundle.js" />
    </body>
  </html>
));
