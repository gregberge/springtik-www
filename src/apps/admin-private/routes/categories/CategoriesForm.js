import React from 'react';
import FormGroup from '~/modules/components/FormGroup';
import Input from '~/modules/components/Input';
import Select from '~/modules/components/Select';
import Button from '~/modules/components/Button';

const levelOptions = {
  1: 'Premier niveau',
  2: 'Second niveau'
};

export default ({onSubmit, result: {progress}, category}) => {
  if (!category)
    return <div />;

  function sub(e) {
    e.preventDefault();
  }

  function onChange(e) {
    console.log(arguments);
  }

  return (
    <form onChange={onChange} onSubmit={sub}>
      <FormGroup>
        <Input
          autoFocus
          name="name"
          placeholder="Titre de la catégorie"
        />
      </FormGroup>
      <FormGroup>
        <Select
          name="level"
          placeholder="Niveau de la catégorie"
          options={levelOptions}
        />
        <Button disabled={progress} block>
          {category.id ? 'Enregistrer' : 'Créer la catégorie'}
        </Button>
        {category.id ? (
          <Button uiStyle="danger" block>
            Supprimer
          </Button>
        ) : null}
      </FormGroup>
    </form>
  );
};
