import React, { Component } from 'react';
import t from 'prop-types';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default class Create extends Component {

  static propTypes = {
    onCreate: t.func.isRequired,
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
          title={ `Create ${this.props.type}` }
          open={ this.props.open }
          autoScrollBodyContent={ true }>
          { this.props.children }
        </Dialog>

        <RaisedButton
          onClick={ this.props.onCreate }
          label="Create"
          type="button"
          secondary />
      </div>
    );
  }
}
