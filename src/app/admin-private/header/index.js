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

  onClickUser = () => this.setState({showNav: !this.state.showNav});

  render() {
    return (
      <header className={styles.header}>
        {JSON.stringify(this.props.me)}
        <div className={styles.logo} />
        <div className={styles.user} onClick={this.onClickUser} />
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
