import React, { Component } from 'react';
import t from 'prop-types';

import Dialog from 'material-ui/Dialog';

export default class AdminNew extends Component {

  static propTypes = {
    open: t.bool.isRequired,
    type: t.string.isRequired,
    children: t.object
  }

  static defaultProps = {
    children: null
  }

  render () {
    return (
      <div className="h__create">
        <Dialog
          title={ `New ${this.props.type}` }
          open={ this.props.open }
          autoScrollBodyContent={ true }>
          { this.props.children }
        </Dialog>
      </div>
    );
  }
}
