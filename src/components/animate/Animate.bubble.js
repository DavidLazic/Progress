import React, { Component } from 'react';
import t from 'prop-types';

export default class AnimateBubble extends Component {

  static propTypes = {
    children: t.oneOfType([
      t.object,
      t.array
    ])
  }

  static defaultProps = {
    children: null
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

    return !this.state.animating &&
      this.setState({ animating: true }, () => {
        const span = document.createElement('span');
        span.className = 'h__bubble';
        span.style.top = `${e.nativeEvent.offsetY }px`;
        span.style.left = `${e.nativeEvent.offsetX }px`;
        e.target.appendChild(span);
        return setTimeout(() =>
          this.setState({ animating: false }, () =>
            e.target.removeChild(span)), 650);
      });
  }

  render () {
    return (
      <span onClick={ this.onAnimate }>
        { this.props.children }
      </span>
    );
  }
}
