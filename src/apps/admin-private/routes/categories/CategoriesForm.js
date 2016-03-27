import React from 'react';
import FormGroup from '~/modules/components/FormGroup';
import Form, {Input, Select, Textarea} from '~/modules/components/Form';
import Button from '~/modules/components/Button';

const levelOptions = {
  '1': 'Premier niveau',
  '2': 'Second niveau'
};

export default ({
  onSubmit,
  onDelete,
  result: {progress},
  deleteResult,
  category
}) => {
  return (
    <Form model={category} onSubmit={onSubmit}>
      <FormGroup>
        <Input
          autoFocus
          name="name"
          placeholder="Titre de la catégorie"
          required
        />
      </FormGroup>
      <FormGroup>
        <Select
          name="level"
          placeholder="Niveau de la catégorie"
          options={levelOptions}
          required
        />
      </FormGroup>
      <FormGroup>
        <Textarea
          counter
          name="description"
          maxLength={180}
          rows={4}
          placeholder="Description courte"
        />
      </FormGroup>
      <Button
        large
        disabled={progress}
      >
        {category.id ? 'Mettre à jour la catégorie' : 'Créer la catégorie'}
      </Button>
      {category.id ? (
        <Button
          large
          type="button"
          uiStyle="danger"
          onClick={onDelete}
          disabled={deleteResult.progress}
        >
          Supprimer
        </Button>
      ) : null}
    </Form>
  );
};
