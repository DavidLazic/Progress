import React, { Component } from 'react';
import t from 'prop-types';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

export default class Tags extends Component {

  static propTypes = {
    name: t.string.isRequired,
    label: t.string.isRequired,
    tags: t.object,
    onChange: t.func.isRequired
  }

  static defaultProps = {
    tags: {}
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
          <Input
            name={ this.props.name }
            className="form__field"
            placeholder={ this.props.label }
            value={ this.state.tag }
            onChange={ e => this.setState({ tag: e.target.value }) } />
          <Button
            variant="outlined"
            className="form__tags--add"
            onClick={ this.onTagAdd }
            type="button"
            color="secondary">
            Add Tag
          </Button>
        </div>

        <div>
          {
            Object.keys(this.props.tags).map((tag, index) => (
              <Chip
                key={ index }
                label={ tag }
                onDelete={ () => this.onTagRemove(tag) } />
            ))
          }
        </div>
      </div>
    );
  }
}
