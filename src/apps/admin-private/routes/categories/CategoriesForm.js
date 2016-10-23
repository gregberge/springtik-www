import React from 'react';
import Rc from 'modules/recompose';
import Toolbar from 'modules/components/Toolbar';
import NameField from './NameField';
import LevelField from './LevelField';
import ParentIdField from './ParentIdField';
import DescriptionField from './DescriptionField';
import KeywordsField from './KeywordsField';
import Submit from './Submit';
import DeleteButton from './DeleteButton';
import ErrorBanner from './ErrorBanner';
import SuccessBanner from './SuccessBanner';
import styles from './categories.scss';

export default Rc.compose(
  Rc.connectForm('category'),
  Rc.provide(({categoryModel$}) => ({
    isNew$: categoryModel$.pluck('id').map(Boolean),
  })),
)(({onSubmit}) => (
  <div className={styles.section}>
    <ErrorBanner />
    <SuccessBanner />
    <form onSubmit={onSubmit}>
      <div className={styles['form-section-fields']}>
        <NameField />
        <LevelField />
        <ParentIdField />
        <DescriptionField />
        <KeywordsField />
      </div>
      <Toolbar className={styles['form-section-toolbar']}>
        <Submit />
        <DeleteButton />
      </Toolbar>
    </form>
  </div>
));
