import React from 'react';
import Header from './header';

export default class App extends React.Component {
  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Springtik</title>
          <style type="text/css" ref="style">
            // %CSS%
          </style>
        </head>
        <body>
          <Header />
          {this.props.children}
          <script src="/dist/bundle.js" />
        </body>
      </html>
    );
  }
}
