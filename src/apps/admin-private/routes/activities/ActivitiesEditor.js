import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './activities.scss';
import {Textarea} from '~/modules/components/Form';

export default class ActivitiesEditor extends React.Component {
  render() {
    const {disabled, text} = this.props;

    return (
      <div className={styles.editor}>
        <Textarea
          name="text"
          placeholder="Contenu de l'activité (description, tarifs, etc...)"
          disabled={disabled}
          noControl
          className={styles.editorTextarea}
          containerClassName={styles.editorInput}
        />
        <ReactMarkdown
          className={styles.editorPreview}
          source={text || ''}
        />
        <div className={styles.previewLabel}>Preview</div>
      </div>
    );
  }
}
