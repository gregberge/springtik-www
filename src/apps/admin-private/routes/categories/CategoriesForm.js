import React from 'react';
import FormGroup from '~/modules/components/FormGroup';
import Form, {Input, Select, Textarea} from '~/modules/components/Form';
import Button from '~/modules/components/Button';

const levelOptions = [
  {value: 1, label: 'Premier niveau'},
  {value: 2, label: 'Second niveau'}
];

export default ({
  onSubmit,
  onDelete,
  onCategoryChange,
  result,
  deleteResult,
  category = {},
  disabled,
  keywords
}) => {
  return (
    <Form
      model={category}
      onModelChange={onCategoryChange}
      onSubmit={onSubmit}
    >
      <FormGroup>
        <Input
          autoFocus
          name="name"
          placeholder="Titre de la catégorie"
          disabled={disabled}
          required
        />
      </FormGroup>
      <FormGroup>
        <Select
          name="level"
          placeholder="Niveau de la catégorie"
          options={levelOptions}
          disabled={disabled}
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
          disabled={disabled}
        />
      </FormGroup>
      <FormGroup>
        <Select
          multi
          allowCreate
          name="keywords"
          placeholder="Mots clefs"
          options={keywords && keywords.map(value => ({value, label: value}))}
          disabled={disabled}
        />
      </FormGroup>
      <Button
        large
        disabled={result.progress || disabled}
      >
        {category.id ? 'Mettre à jour la catégorie' : 'Créer la catégorie'}
      </Button>
      {category.id ? (
        <Button
          large
          type="button"
          uiStyle="danger"
          onClick={onDelete}
          disabled={deleteResult.progress || disabled}
        >
          Supprimer
        </Button>
      ) : null}
    </Form>
  );
};
