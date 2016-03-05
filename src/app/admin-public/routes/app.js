import React from 'react';
import BaseComponent from 'components/base';
import styles from './app.scss';
import getObservables from './app.obs.js';

export default class App extends BaseComponent {
  getObservables = getObservables;

  styles = styles;

  render() {
    return (
      <html>
        <head>
          <meta charSet="utf-8" />
          <title>Springtik</title>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.css" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css" />
          <style type="text/css" ref="style">/* %CSS% */</style>
        </head>
        <body>
          {this.props.children}
          <script>/* %JS% */</script>
          <script async src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js" />
          <script async src="/dist/bundle.js" />
        </body>
      </html>
    );
  }
}