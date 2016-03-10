import React, {Component, PropTypes} from 'react';
import styles from './header.scss';
import connect from 'components/base/connect';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const obsTypes = {
  me: PropTypes.shape({
    avatar200x200: PropTypes.string
  })
};

export default connect({styles, obsTypes}, class extends Component {
  state = {showNav: false};

  onFocusUser = () => this.setState({showNav: true});
  onBlurUser = () => this.setState({showNav: false});

  render() {
    const {me} = this.props;
    const userStyle = me ? {backgroundImage: `url(${me.avatar200x200})`} : null;

    return (
      <header className={styles.header}>
        <div className={styles.logo} />
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
