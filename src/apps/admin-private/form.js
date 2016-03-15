import React from 'react';
import {Form, wrapInput, registerTheme} from 'react-reform';
import 'react-reform/opt/validators';
import BaseInput from '~/modules/components/Input';
import BaseSelect from '~/modules/components/Select';
import FormGroup from '~/modules/components/FormGroup';
import Button from '~/modules/components/Button';

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
    <Button disabled={formProps.progress} block>
      {formProps.submitText}
    </Button>
  </FormContainer>
));

export const Input = wrapInput('Input', BaseInput, {
  extractValueFromOnChange: event => event.target.value
});

export const Select = wrapInput('Select', BaseSelect, {
  extractValueFromOnChange: event => event.target.value
});


export {Form};
