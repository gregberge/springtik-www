import React, {Component} from 'react';
import styles from './header.scss';
import connect from '~/modules/gravito/connect';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Link from 'react-router/lib/Link';

export default connect({styles}, class extends Component {
  state = {showNav: false};

  onFocusUser = () => this.setState({showNav: true});
  onBlurUser = () => this.setState({showNav: false});

  render() {
    const {me} = this.props;
    const userStyle = me ? {backgroundImage: `url(${me.avatar200x200})`} : null;

    return (
      <header className={styles.header}>
        <Link to="/">
          <div className={styles.logo} />
          <div className={styles.admin}>
            admin
          </div>
        </Link>
        <div
          tabIndex={-1}
          className={styles.user}
          onFocus={this.onFocusUser}
          onBlur={this.onBlurUser}
          style={userStyle}
        />
        <ReactCSSTransitionGroup
          transitionName="opacity"
          transitionEnterTimeout={300}
          transitionLeaveTimeout={200}
        >
          {this.state.showNav ? <nav className={styles.nav}>
            <ul>
              <li>
                <a href="/logout">
                  <i className="fa fa-power-off" />Déconnexion
                </a>
              </li>
            </ul>
          </nav> : null}
        </ReactCSSTransitionGroup>
      </header>
    );
  }
});
