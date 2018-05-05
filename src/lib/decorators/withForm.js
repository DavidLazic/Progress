import React, { Component } from 'react';
import t from 'prop-types';

/**
 * @description
 * Higher order component
 * Component wrapper used for forms
 *
 * @param  {Function} WrappedComponent
 * @return {Object}
 * @public
 */
export const withForm = (WrappedComponent = () => null, { form } = {}) =>
  class WithForm extends Component {

    static propTypes = {
      prepopulate: t.object,
      onSubmit: t.func.isRequired
    }

    static defaultProps = {
      prepopulate: null
    }

    state = { form: {} }

    componentWillMount = () =>
      this.setState({
        form: Object.keys(this.props.prepopulate || form).reduce((acc, key) =>
          Object.assign(acc, { [key]: this.props.prepopulate ? this.props.prepopulate[key] : form[key].values }), {})
      })

    /**
     * @description
     * Set current field value.
     *
     * @param {Object} event
     * @param {Object} secondary
     * @return {Function}
     * @private
     */
    setValue = (event, secondary) =>
      this.setState({
        form: {
          ...this.state.form,
          [event.target.name]: event.target.value,
          ...(secondary ? { [secondary.target.name]: secondary.target.value } : {})
        }
      })

    /**
     * @description
     * On submit form fn
     *
     * @param {Object} event
     * @return {Function}
     * @private
     */
    onSubmit = () => this.props.onSubmit(this.state.form)

    render () {
      return (
        <WrappedComponent
          { ...this.props }
          data={ this.state.form }
          setValue={ this.setValue }
          onSubmit={ this.onSubmit } />
      );
    }
  };
