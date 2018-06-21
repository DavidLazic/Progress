import React, { Component } from 'react';
import t from 'prop-types';
import { augmentComponent } from 'react-augment';
import { useForm } from 'src/lib/decorators';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

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
    return (
      <form className="form" onSubmit={ this.onSubmit }>
        {
          Object.keys(MODEL).map((key, index) => (
            <TextField
              key={ index }
              name={ key }
              type={ MODEL[key].type }
              floatingLabelText={ MODEL[key].placeholder }
              value={ this.props.data[key] }
              onChange={ this.props.setValue } />
          ))
        }

        <FlatButton
          onClick={ this.onCancel }
          label="Cancel"
          type="button" />

        <RaisedButton
          onClick={ this.onSubmit }
          label="Submit"
          type="submit"
          primary={ true } />

        {
          this.props.error &&
          <div className="form__error">{ this.props.error.message }</div>
        }
      </form>
    );
  }
}

export default FormLogin;
