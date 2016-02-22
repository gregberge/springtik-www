import React from 'react';

export default ({children}) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>Springtik</title>
    </head>
    <body>
      {children}
      <script src="/dist/bundle.js" />
    </body>
  </html>
);
