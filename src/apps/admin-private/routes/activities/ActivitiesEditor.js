import React, {PropTypes} from 'react';
import ReactMarkdown from 'react-markdown';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {Textarea} from '~/modules/components/Form';
import styles from './activities.scss';

export const ActivitiesEditor = ({
  disabled,
  text,
}) => (
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

ActivitiesEditor.propTypes = {
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(ActivitiesEditor);
