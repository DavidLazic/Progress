import React, { Component } from 'react';
import classNames from 'classnames';
import t from 'prop-types';

export default class AnimateGrow extends Component {

  static propTypes = {
    position: t.object,
    active: t.bool.isRequired
  }

  static defaultProps = {
    position: {}
  }

  getScale () {
    return Math.min(
      window.innerWidth / this.grow.offsetWidth,
      window.innerHeight / this.grow.offsetHeight
    ) * 2.5;
  }

  render () {
    return (
      <div
        ref={ grow => this.grow = grow }
        className={ classNames({
          h__transition__grow: true,
          active: this.props.active
        }) }
        style={ {
          ...this.props.position,
          ...(this.props.active ? { transform: `scale(${this.getScale()})` } : {})
        } }>
      </div>
    );
  }
}
