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
export const useTransition = (WrappedComponent = () => null, config = {}) =>
  class UseTransition extends Component {

    static propTypes = {
      navigate: t.func.isRequired,
      onTransition: t.func
    }

    static defaultProps = {
      onTransition: null
    }

    state = { animating: false }

    /**
     * @description
     * On animate bubble effect
     *
     * @param  {Object} e
     * @return {Function}
     * @public
     */
    onAnimate = e => {
      e.persist();
      if (this.props.onTransition) this.props.onTransition();

      return !this.state.animating &&
            this.setState({ animating: true }, () => {
              const span = document.createElement('span');
              span.className = 'h__bubble';
              span.style.top = `${e.nativeEvent.offsetY }px`;
              span.style.left = `${e.nativeEvent.offsetX }px`;
              e.target.appendChild(span);
              return setTimeout(() => this.setState({ animating: false }, () => e.target.removeChild(span)), 650);
            });
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
          from: { top, right, bottom, left, width, height }
        }
      });
    }

    render () {
      return (
        <div
          className={ config.transition.className }
          onClick={ this.onAnimate }
          ref={ el => this.component = el }>
          <WrappedComponent
            { ...this.props }
            onChange={ this.onTransition } />
        </div>
      );
    }
  };
