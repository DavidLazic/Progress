import React, { Component } from 'react';
import classNames from 'classnames';
import t from 'prop-types';

import IconBack from 'material-ui/svg-icons/navigation/arrow-back';

export default class AnimateDetails extends Component {

  static propTypes = {
    onBack: t.func,

    position: t.object.isRequired,
    active: t.bool.isRequired,
    children: t.oneOfType([
      t.object,
      t.array
    ]).isRequired
  }

  static defaultProps = {
    onBack: null
  }

  render () {
    return (
      <div
        className={ classNames({
          'h__transition': true,
          'h__transition--project': true,
          'active': this.props.active
        }) }
        style={ this.props.position }>

        <span className="h__transition-back" onClick={ this.props.onBack }>
          <IconBack />
        </span>

        <div className="h__transition-inner">
          { this.props.children }
        </div>
      </div>
    );
  }
}
