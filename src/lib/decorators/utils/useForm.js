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
export const useForm = (WrappedComponent = () => null, model = {}) =>
  class UseForm extends Component {

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
        form: Object.keys(this.props.prepopulate || model).reduce((acc, key) =>
          Object.assign(acc, { [key]: this.props.prepopulate ? this.props.prepopulate[key] : '' }), {})
      })

    /**
     * @description
     * Set current field value.
     *
     * @param {Object} event
     * @return {Function}
     * @private
     */
    setValue = event =>
      this.setState({
        form: {
          ...this.state.form,
          [event.target.name]: event.target.value
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
