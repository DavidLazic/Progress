import React, { Component } from 'react';
import t from 'prop-types';
import { augmentComponent } from 'react-augment';
import HOC from 'src/lib/decorators';
// import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';

const MODEL = {
  email: {
    placeholder: 'Email',
    type: 'text'
  },
  password: {
    placeholder: 'Password',
    type: 'password'
  }
};

@augmentComponent([
  HOC.withForm
], MODEL)
export default class FormProject extends Component {

    static propTypes = {
      onSubmit: t.func.isRequired,
      // setValue: t.func.isRequired,
      // data: t.object,
      error: t.object
    }

    static defaultProps = {
      // data: null,
      error: null
    }

    onSubmit = event => {
      event.persist();
      event.preventDefault();
      return this.props.onSubmit(event);
    }

    render () {
      return (
        <form className="form" onSubmit={ this.onSubmit }>
          {
            // Object.keys(MODEL).map((key, index) => (
            //   <TextField
            //     key={ index }
            //     name={ key }
            //     type={ MODEL[key].type }
            //     floatingLabelText={ MODEL[key].placeholder }
            //     value={ this.props.data[key] }
            //     onChange={ this.props.setValue } />
            // ))
          }

          {
            // <RaisedButton
            // onClick={ this.onSubmit }
            // label="Submit"
            // type="submit"
            // primary={ true } />
          }

          {
            this.props.error &&
            <div className="form__error">{ this.props.error.message }</div>
          }
        </form>
      );
    }
}
