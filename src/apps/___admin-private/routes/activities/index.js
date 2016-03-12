import React, {Component} from 'react';
import styles from './activities.scss';
import connect from 'components/base/connect';
import ReactMarkdown from 'react-markdown';

export default connect({styles}, class Activities extends Component {
  state = {input: ''};

  onEditorChange = domEvent => {
    this.setState({input: domEvent.target.value});
  };

  render() {
    return (
      <div className={styles.activities}>
        <div className={styles.activityList}>
          <div className={styles.toolbar}>
            <i className="fa fa-plus-circle" />
            <i className="fa fa-trash" />
          </div>
        </div>
        <div className={styles.editor}>
          <form>
            <input type="text" name="name" placeholder="Titre de l'activité" />
            <textarea placeholder="Description de l'activité" onChange={this.onEditorChange} />
          </form>
        </div>
        <ReactMarkdown className={styles.preview} source={this.state.input} />
      </div>
    );
  }
});
