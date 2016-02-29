import React from 'react';
import {Link} from 'react-router';
import BaseComponent from 'components/base';

export default class Home extends BaseComponent {
  render() {
    return <div>WWW <Link to="/test">test</Link></div>;
  }
}
