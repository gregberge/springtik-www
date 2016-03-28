import React, {PropTypes} from 'react';
import createElement from 'recompose/createElement';
import BaseInput from './Input';
import BaseTextarea from './Textarea';
import BaseSelect from './Select';

function inForm(Control, {
  extractValueFromOnChange = event => event.target.value
} = {}) {
  return class WrappedControl extends React.Component {
    static propTypes = {
      name: PropTypes.string.isRequired
    };

    static contextTypes = {
      form: PropTypes.object.isRequired
    };

    componentWillMount() {
      this.state = {
        value: this.context.form.getValue(this.props.name)
      };
    }

    onChange = (...args) => {
      if (this.props.onChange)
        this.props.onChange(...args);

      const value = extractValueFromOnChange(...args);
      this.context.form.setValue(this.props.name, value);
      this.setState({value});
    }

    render() {
      return createElement(Control, {
        ...this.props,
        ...this.state,
        onChange: this.onChange
      });
    }
  };
}

export const Input = inForm(BaseInput);
export const Select = inForm(BaseSelect, {
  extractValueFromOnChange: item => {
    if (typeof item === 'string')
      return item ? Array.from(new Set(item.toLowerCase().split(','))) : [];

    return item.value;
  }
});
export const Textarea = inForm(BaseTextarea);

export default class Form extends React.Component {
  static propTypes = {
    model: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  static childContextTypes = {
    form: PropTypes.object
  };

  getChildContext() {
    return {
      form: {
        getValue: this.getValue,
        setValue: this.setValue
      }
    };
  }

  componentWillMount() {
    this.state = {model: this.props.model};
  }

  getValue = name => {
    return this.state.model[name];
  };

  setValue = (name, value) => {
    const model = {...this.state.model, [name]: value};
    this.setState({model});
  };

  onSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.model, event);
  };

  render() {
    const {children, model, onSubmit, ...props} = this.props;

    return (
      <form {...props} onSubmit={this.onSubmit}>
        {children}
      </form>
    );
  }
}
