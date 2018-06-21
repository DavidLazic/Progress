import React, { Component } from 'react';
import t from 'prop-types';
import { augmentComponent } from 'react-augment';
import { useForm } from 'src/lib/decorators';
import { Moment } from 'src/lib/utils';
import Dates from './fragments/Fragment.dates';
import Tags from './fragments/Fragment.tags';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

const MODEL = {
  title: { label: 'Title', values: '', type: 'TextField' },
  subtitle: { label: 'Subtitle', values: '', type: 'TextField' },
  url: { label: 'URL', values: '', type: 'TextField' },
  description: { label: 'Description', values: '', type: 'TextField' },
  content: { label: 'Content', values: '', props: { multiLine: true, rows: 10 }, type: 'TextField' },
  tags: { label: 'Tags', tags: true, values: {}, type: 'Tags' },
  periods: { values: {}, disabled: true },
  frames: { values: [], date: true, type: 'Dates' }
};

@augmentComponent([
  useForm
], { form: MODEL })
class FormProject extends Component {

  static propTypes = {
    prepopulate: t.object,
    onSubmit: t.func.isRequired,
    onCancel: t.func,
    setValue: t.func.isRequired,
    data: t.object,
    error: t.object
  }

  static defaultProps = {
    data: null,
    error: null,
    prepopulate: null,
    onCancel: null
  }

  onSubmit = event => {
    event.persist();
    event.preventDefault();
    return this.props.onSubmit(event);
  }

  getFrames = ({ start, end, key, idx }) =>
    this.props.data[key].map((item, i) =>
      (i === idx) ? { start, end } : item)

  setDates = ({ start, end, period, key, idx }) =>
    this.props.setValue({
      target: {
        name: key,
        value: this.props.data[key].length
          ? this.getFrames({ start, end, idx, key })
          : [{ start, end }] }
    }, {
      target: {
        name: 'periods',
        value: { ...this.props.data.periods, [period]: true }
      }
    })

  onAddFrame = () =>
    this.props.setValue({
      target: {
        name: 'frames',
        value: [...this.props.data.frames, { start: Moment.toDate(new Date()), end: Moment.toDate(new Date()) }]
      }
    })

  renderTextField = ({ key, index }) => (
    <TextField
      key={ index }
      name={ key }
      className="form__field"
      floatingLabelText={ MODEL[key].label }
      value={ this.props.data[key] }
      onChange={ this.props.setValue }
      { ...MODEL[key].props } />
  )

  renderDates = ({ key }) =>
    this.props.data[key].map((value, i) => (
      <Dates
        onChange={ props => this.setDates({ ...props, key }) }
        key={ `${key}-${i}` }
        name={ key }
        frame={ value }
        index={ i } />
    ))

  renderTags = ({ key, index }) => (
    <Tags
      key={ index }
      name={ key }
      label={ MODEL[key].label }
      tags={ this.props.data[key] }
      onChange={ this.props.setValue } />
  )

  render () {
    return (
      <form className="form" onSubmit={ this.onSubmit }>
        {
          Object.keys(MODEL).map((key, index) =>
            !MODEL[key].disabled &&
            this[`render${MODEL[key].type}`]({ key, index })
          )
        }

        <div className="form__frame">
          <RaisedButton
            className="form__submit"
            label="Add Frame"
            type="button"
            backgroundColor="#483d8b"
            onClick={ this.onAddFrame } />
        </div>

        <div className="form__actions">
          {
            this.props.onCancel &&
            <FlatButton
              onClick={ this.props.onCancel }
              label="Cancel"
              type="button" />
          }

          <FlatButton
            className="form__submit"
            label={ this.props.prepopulate && 'Save' || 'Create' }
            type="submit"
            primary={ true }
            onClick={ this.onSubmit } />
        </div>

        {
          this.props.error &&
          <div className="form__error">{ this.props.error.message }</div>
        }
      </form>
    );
  }
}

export default FormProject;
