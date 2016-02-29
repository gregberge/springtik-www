import React from 'react';
import Header from './header';
import BaseComponent from 'components/base';
import styles from './styles/index.scss';

export default class App extends BaseComponent {
  styles = styles;

  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Springtik</title>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans|Montserrat:400,700" rel="stylesheet" type="text/css" />
          <style type="text/css" ref="style">
            // %CSS%
          </style>
        </head>
        <body>
          <Header />
          {this.props.children}
          <script async src="/dist/bundle.js" />
        </body>
      </html>
    );
  }
}
