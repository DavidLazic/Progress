import React, { Component } from 'react';
import classNames from 'classnames';
import t from 'prop-types';

export default class AnimateRipple extends Component {

  static propTypes = {
    children: t.oneOfType([
      t.object,
      t.array
    ]),
    duration: t.number,
    theme: t.string
  }

  static defaultProps = {
    children: null,
    duration: 1000,
    theme: 'light'
  }

  state = { animating: false }

  componentDidMount () {
    this.ripple.addEventListener('mousedown', this.addRipple);
    this.ripple.addEventListener('mouseup', this.cleanRipple);
  }

  componentWillUnmount () {
    this.ripple.removeEventListener('mousedown', this.addRipple);
    this.ripple.removeEventListener('mouseup', this.cleanRipple);
  }

  addRipple = e => {
    const { left, top, width } = this.ripple.getBoundingClientRect();
    const rippler = document.createElement('span');
    const x = e.pageX - left - (width / 2);
    const y = e.pageY - top - (width / 2);
    const style = `top:${y}px; left:${x}px; height:${width}px; width:${width}px;`;
    this.container.appendChild(rippler);
    rippler.setAttribute('style', style);
  }

  cleanRipple = () =>
    setTimeout(() =>
      this.container.firstChild
        && this.container.removeChild(this.container.firstChild), this.props.duration)


  render () {
    return (
      <div
        className={ classNames({
          h__ripple: true,
          [`h__ripple--${this.props.theme}`]: true
        }) }
        ref={ el => this.ripple = el }>
        <div className="h__ripple__container" ref={ el => this.container = el }></div>
        { this.props.children }
      </div>
    );
  }
}
