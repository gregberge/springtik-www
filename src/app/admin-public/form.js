import React from 'react';
import {Form, wrapInput, registerTheme} from 'react-reform';
import 'react-reform/opt/validators';
import BaseInput from 'components/input';
import FormGroup from 'components/form-group';
import Button from 'components/button';

registerTheme('default', (FormContainer, Fields, {status, formProps}) => (
  <FormContainer noValidate>
    <Fields>
      {(Field, {validations}) => {
        const hasError = validations.some(({isValid}) => isValid === false);
        const showError = status === 'preSubmitFail' && hasError;

        return (
          <FormGroup>
            <Field hasError={showError} />
          </FormGroup>
        );
      }}
    </Fields>
    <Button disabled={formProps.progress} block large>Se connecter</Button>
  </FormContainer>
));

export const Input = wrapInput('Input', BaseInput, {
  extractValueFromOnChange: event => event.target.value
});
export {Form};
