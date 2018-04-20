import React, { Component } from 'react';
import t from 'prop-types';
import { augmentComponent } from 'react-augment';
import HOC from 'src/lib/decorators';
// import Utils from 'src/lib/utils';
// import TextField from 'material-ui/TextField';
// import RaisedButton from 'material-ui/RaisedButton';
// import MonthPickerInput from 'react-month-picker-input';

const MODEL = {
  name: { label: 'Project Name' },
  url: { label: 'Project URL' },
  description: { label: 'Project Description' },
  content: { label: 'Project Content', props: { multiLine: true, rows: 10 } },
  tags: { label: 'Project Tags' },
  startTime: { label: 'Start Date', date: true },
  endTime: { label: 'End Date', date: true }
};

@augmentComponent([
  HOC.useForm
], MODEL)
export default class FormProject extends Component {

    static propTypes = {
      // prepopulate: t.object,
      onSubmit: t.func.isRequired,
      // setValue: t.func.isRequired,
      // data: t.object,
      error: t.object
    }

    static defaultProps = {
      // data: null,
      error: null
      // prepopulate: null
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
            //   !MODEL[key].date ?

            //     <TextField
            //       key={ index }
            //       name={ key }
            //       className="form__field"
            //       floatingLabelText={ MODEL[key].label }
            //       value={ this.props.data[key] }
            //       onChange={ this.props.setValue }
            //       { ...MODEL[key].props } /> :

            //     <div className="calendar" key={ index }>
            //       <div className="calendar__label">{ `${MODEL[key].label}:` }</div>
            //       <MonthPickerInput
            //         year={ this.props.data[key] && Utils.date.getYear(this.props.data[key]) || null }
            //         month={ this.props.data[key] && Utils.date.getMonth(this.props.data[key]) || null }
            //         onChange={ selected => this.props.setValue({
            //           target: { name: key, value: Utils.date.toUnix(selected) }
            //         }) } />
            //     </div>

            // ))
          }

          {
            // <RaisedButton
            // className="form__submit"
            // fullWidth={ true }
            // label={ this.props.prepopulate && 'Save' || 'Create' }
            // type="submit"
            // backgroundColor="#483d8b"
            // onClick={ this.onSubmit } />
          }

          {
            this.props.error &&
            <div className="form__error">{ this.props.error.message }</div>
          }
        </form>
      );
    }
}
