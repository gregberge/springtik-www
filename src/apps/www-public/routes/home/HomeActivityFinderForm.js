import React from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import TextBox from 'modules/ui-components/TextBox';
import Button from 'modules/ui-components/Button';
import styles from './HomeActivityFinderForm.scss';

export const HomeActivityFinderForm = () => (
  <form className={styles.activityFinderForm}>
    <TextBox
      block="sm"
      groupedLeft="lg"
      placeholder="Où ? (adresse, ville...)"
      size="xl"
      spaced="sm"
    />
    <Button
      lgGroupedRight
      smBlock
    >
      Rechercher
    </Button>
  </form>
);

export default compose(
  withStyles(styles),
  pure,
)(HomeActivityFinderForm);
