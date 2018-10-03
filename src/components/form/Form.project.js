import React, { Component, Fragment } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import { augmentComponent } from 'react-augment';
import { useForm } from 'src/lib/decorators';
import { Moment } from 'src/lib/utils';
import { withStyles } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tags from './fragments/Fragment.tags';
import Dates from './fragments/Fragment.dates';

const MODEL = {
  title: { label: 'Title', values: '', type: 'TextField' },
  subtitle: { label: 'Subtitle', values: '', type: 'TextField' },
  url: { label: 'URL', values: '', type: 'TextField' },
  description: { label: 'Description', values: '', type: 'TextField' },
  content: { label: 'Content', values: '', props: { multiline: true, rows: 10 }, type: 'TextField' },
  tags: { label: 'Tags', tags: true, values: {}, type: 'Tags' },
  periods: { values: {}, disabled: true },
  frames: { values: [], date: true, type: 'Dates' }
};

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

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
    error: t.object,
    classes: t.object.isRequired
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

  getFrames = ({ start, end, key, index }) =>
    this.props.data[key].map((item, i) =>
      (i === index) ? { start, end } : item)

  setDates = ({ start, end, period, key, index }) =>
    this.props.setValue({
      target: {
        name: key,
        value: this.props.data[key].length
          ? this.getFrames({ start, end, index, key })
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

  renderTextField = ({ key, index, classes }) => (
    <Input
      key={ index }
      name={ key }
      className={ classNames(classes.margin) }
      fullWidth
      placeholder={ MODEL[key].label }
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
    const { classes } = this.props;

    return (
      <Fragment>
        <DialogTitle>
          { this.props.prepopulate && 'Edit Project' || 'New Project' }
        </DialogTitle>

        <DialogContent>
          <form className="form" onSubmit={ this.onSubmit }>
            {
              Object.keys(MODEL).map((key, index) =>
                !MODEL[key].disabled
                && this[`render${MODEL[key].type}`]({ key, index, classes })
              )
            }

            <div className="form__frame">
              <Button
                className="form__submit"
                variant="outlined"
                type="button"
                color="secondary"
                onClick={ this.onAddFrame }>
                Add Frame
              </Button>
            </div>

            {
              this.props.error
              && <div className="form__error">{ this.props.error.message }</div>
            }
          </form>
        </DialogContent>

        <DialogActions>

          {
            this.props.onCancel
            && (
              <Button
                className={ classes.margin }
                onClick={ this.props.onCancel }
                color="primary">
                Cancel
              </Button>
            )
          }

          <Button
            className={ classes.margin }
            onClick={ this.onSubmit }
            color="primary"
            variant="contained"
            type="submit"
            autoFocus>
            { this.props.prepopulate && 'Save' || 'Create' }
          </Button>

        </DialogActions>
      </Fragment>


    );
  }
}

export default withStyles(styles)(FormProject);
