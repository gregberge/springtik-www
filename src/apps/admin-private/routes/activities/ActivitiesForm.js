import React from 'react';
import FormGroup from '~/modules/components/FormGroup';
import Form, {Input, Textarea, Select} from '~/modules/components/Form';
import Button from '~/modules/components/Button';
import Toolbar from '~/modules/components/Toolbar';
import styles from './activities.scss';
import ActivitiesEditor from './ActivitiesEditor';

const statusOptions = [
  {value: 'review', label: 'À relire'},
  {value: 'published', label: 'Publiée'}
];

export default ({
  onSubmit,
  onDelete,
  onActivityChange,
  result,
  deleteResult,
  activity = {},
  categories,
  disabled
}) => {
  return (
    <Form
      model={activity}
      onModelChange={onActivityChange}
      onSubmit={onSubmit}
    >
      <div className={styles['form-section-fields']}>
        <FormGroup className={styles['form-group-small']}>
          <Input
            autoFocus={!activity.id}
            name="name"
            placeholder="Titre de l'activité"
            disabled={disabled}
            required
          />
        </FormGroup>
        <FormGroup className={styles['form-group-small']}>
          <Select
            name="status"
            placeholder="Status"
            options={statusOptions}
            disabled={disabled}
            required
          />
        </FormGroup>
        <FormGroup className={styles['form-group-small']}>
          <Textarea
            counter
            name="description"
            maxLength={180}
            rows={4}
            placeholder="Description courte"
            disabled={disabled}
          />
        </FormGroup>
        <FormGroup className={styles['form-group-small']}>
          <Select
            name="categoryId"
            placeholder="Catégorie"
            options={categories && categories.map(({id, name}) =>
              ({value: id, label: name})
            )}
            disabled={disabled}
            required
          />
        </FormGroup>
        <FormGroup className={styles['form-group-small']}>
          <Input
            name="address"
            maxLength={255}
            placeholder="Adresse"
            disabled={disabled}
            required
          />
        </FormGroup>
        <FormGroup className={styles['form-group-small']}>
          <Input
            name="zipcode"
            maxLength={5}
            placeholder="Code postal"
            pattern="[0-9]{5}"
            disabled={disabled}
            required
          />
        </FormGroup>
        <FormGroup className={styles['form-group-small']}>
          <Input
            name="city"
            maxLength={50}
            placeholder="Ville"
            disabled={disabled}
            required
          />
        </FormGroup>
        <FormGroup>
          <ActivitiesEditor text={activity.text} {...{disabled}} />
        </FormGroup>
      </div>
      <Toolbar className={styles['form-section-toolbar']}>
        <Button
          small
          disabled={result.progress || disabled}
        >
          {activity.id ? 'Mettre à jour' : 'Créer'}
        </Button>
        {activity.id ? (
          <Button
            small
            type="button"
            uiStyle="danger"
            onClick={onDelete}
            disabled={deleteResult.progress || disabled}
          >
            <i className="fa fa-trash" />Supprimer
          </Button>
        ) : null}
      </Toolbar>
    </Form>
  );
};
