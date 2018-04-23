import React, { Component } from 'react';
import t from 'prop-types';

/**
 * @description
 * Higher order component
 * Component wrapper used for route transition and modal showing
 *
 * @param  {Function} WrappedComponent
 * @return {Object}
 * @public
 */
export const withTransition = (WrappedComponent = () => null, config = {}) =>
  class WithTransition extends Component {

    static propTypes = {
      navigate: t.func.isRequired
    }

    /**
     * @description
     * On transition start
     * Navigate to specified route, forward props from component
     * and append initial component position
     *
     * @return {Function}
     * @public
     */
    onTransition = (route, props) => {
      const { top, right, bottom, left, width, height } = this.component.getBoundingClientRect();

      return this.props.navigate(route, {
        ...props,
        to: 'modal',
        meta: {
          from: {
            top,
            right,
            bottom,
            left: left - 200,
            width,
            height
          }
        }
      });
    }

    render () {
      return (
        <div
          className={ config.transition.className }
          ref={ el => this.component = el }>
          <WrappedComponent
            { ...this.props }
            onChange={ this.onTransition } />
        </div>
      );
    }
  };
