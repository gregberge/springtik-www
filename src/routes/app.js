import React from 'react';
import Header from './header';

export default ({children}) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>Springtik</title>
      <link rel="stylesheet" media="all" href="/dist/index.css" />
    </head>
    <body>
      <Header />
      {children}
      <script src="/dist/bundle.js" />
    </body>
  </html>
);
