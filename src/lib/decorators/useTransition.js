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
export const useTransition = (WrappedComponent = () => null, { transition }) =>
  class UseTransition extends Component {

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
      const { top, left, bottom, right, width } = this.component.getBoundingClientRect();

      return this.props.navigate(route, {
        ...props,
        to: 'details',
        meta: {
          from: {
            top: top - 60,
            left: left - 200,
            bottom,
            right,
            width,
            height: width
          }
        }
      });
    }

    render () {
      return (
        <div
          className={ transition && transition.className || '' }
          ref={ el => this.component = el }>
          <WrappedComponent
            { ...this.props }
            onTransition={ this.onTransition } />
        </div>
      );
    }
  };
