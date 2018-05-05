import React, { Component } from 'react';
import t from 'prop-types';

import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

export default class Create extends Component {

  static propTypes = {
    type: t.string.isRequired,
    children: t.object
  }

  static defaultProps = {
    children: null
  }

  state = {
    type: this.props.type,
    active: false
  }

  onCreate = () => !this.state.active && this.setState({ active: true })

  onCancel = () => this.setState({ active: false })

  render () {
    return (
      <div className="h__create">
        <Dialog
          title={ `Create ${this.props.type}` }
          open={ this.state.active }
          autoScrollBodyContent={ true }>
          { React.cloneElement(this.props.children, { onCancel: this.onCancel }) }
        </Dialog>

        <RaisedButton
          onClick={ this.onCreate }
          label="Create"
          type="button"
          secondary />
      </div>
    );
  }
}
