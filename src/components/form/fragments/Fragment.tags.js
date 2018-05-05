import React, { Component } from 'react';
import t from 'prop-types';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';

export default class Tags extends Component {

  static propTypes = {
    name: t.string.isRequired,
    label: t.string.isRequired,
    tags: t.object.isRequired,
    onChange: t.func.isRequired
  }

  state = { tag: '' }

  onTagAdd = () =>
    this.state.tag.length && (
      this.props.onChange({
        target: { name: this.props.name, value: { ...this.props.tags, [this.state.tag]: true } }
      }),
      this.setState({ tag: '' })
    )

  onTagRemove = tag => {
    const { [tag]: undefined, ...rest } = this.props.tags;
    this.props.onChange({
      target: { name: this.props.name, value: { ...rest } }
    });
  }


  render () {
    return (
      <div className="form__tags">
        <div>
          <TextField
            name={ this.props.name }
            className="form__field"
            floatingLabelText={ this.props.label }
            value={ this.state.tag }
            onChange={ e => this.setState({ tag: e.target.value }) } />
          <RaisedButton
            className="form__tags--add"
            onClick={ this.onTagAdd }
            label="Add Tag"
            type="button"
            backgroundColor="#483d8b" />
        </div>

        <div>
          {
            Object.keys(this.props.tags).map((tag, index) => (
              <Chip
                key={ index }
                onRequestDelete={ () => this.onTagRemove(tag) }>
                { tag }
              </Chip>
            ))
          }
        </div>
      </div>
    );
  }
}
