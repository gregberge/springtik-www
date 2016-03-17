import React from 'react';
import {Form, Input, Select, Button} from '~/modules/components/form';

const levelOptions = {
  1: 'Premier niveau',
  2: 'Second niveau'
};

export default ({onSubmit, result: {progress}, category = {}}) => (
  <Form
    model={category}
    submitText="Créer la catégorie"
    buttons={
      category.id ? <Button uiStyle="danger">Supprimer</Button> : null
    }
    {...{onSubmit, progress}}
  >
    <Input
      autoFocus
      name="name"
      placeholder="Titre de la catégorie"
      is-required
    />
    <Select
      autoFocus
      name="level"
      placeholder="Niveau de la catégorie"
      options={levelOptions}
      is-required
    />
  </Form>
);
