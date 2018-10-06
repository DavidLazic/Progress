import React, { Component } from 'react';
import t from 'prop-types';
import { augmentComponent } from 'react-augment';
import { useForm } from 'src/lib/decorators';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const MODEL = {
  email: { placeholder: 'Email', type: 'text', values: '' },
  password: { placeholder: 'Password', type: 'password', values: '' }
};

@augmentComponent([
  useForm
], { form: MODEL })
class FormLogin extends Component {

  static propTypes = {
    onSubmit: t.func.isRequired,
    onCancel: t.func,
    setValue: t.func.isRequired,
    data: t.object,
    error: t.object
  }

  static defaultProps = {
    data: null,
    error: null,
    onCancel: null
  }

  onSubmit = event => {
    event.persist();
    event.preventDefault();
    return this.props.onSubmit(event);
  }

  onCancel = () => this.props.onCancel()

  render () {
    const { onCancel, setValue, data } = this.props;

    return (
      <form className="form form--login" onSubmit={ this.onSubmit }>
        {
          Object.keys(MODEL).map((key, index) => (
            <TextField
              key={ index }
              name={ key }
              type={ MODEL[key].type }
              label={ MODEL[key].placeholder }
              value={ data[key] }
              onChange={ setValue } />
          ))
        }

        <Button
          onClick={ this.onSubmit }
          color="primary"
          type="submit">
          Login
        </Button>

        {
          onCancel
          && (
            <Button
              onClick={ this.onCancel }
              color="secondary"
              type="button">
              Cancel
            </Button>
          )
        }

        {
          this.props.error
          && <div className="form__error">{ this.props.error.message }</div>
        }
      </form>
    );
  }
}

export default FormLogin;
