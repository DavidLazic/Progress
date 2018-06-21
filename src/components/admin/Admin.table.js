import React, { Component } from 'react';
import t from 'prop-types';
import { FormProject } from 'src/components/form';
import CircularProgress from 'material-ui/CircularProgress';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

export default class AdminTable extends Component {

  static propTypes = {
    data: t.object,
    loading: t.bool.isRequired,
    onEdit: t.func.isRequired,
    onDelete: t.func.isRequired,
    error: t.object,
    type: t.string.isRequired
  }

  static defaultProps = {
    data: {},
    error: {}
  }

  state = {
    id: null,
    item: null,
    edit: false,
    confirm: false
  }

  reset () {
    return this.setState({
      id: null,
      item: null,
      edit: false,
      confirm: false
    });
  }

  onEdit = (id, item) =>
    this.setState({ id, item, edit: true })

  itemEdit = item => {
    this.props.onEdit(this.state.id, item);
    return this.reset();
  }

  onDeleteConfirm = (id, item) =>
    this.setState({ id, item, confirm: true })

  itemDelete = () => {
    this.props.onDelete(this.state.id, this.state.item);
    return this.reset();
  }

  render () {
    return !this.props.loading ?
      <div>
        {
          this.props.data &&
          <Table>
            <TableHeader adjustForCheckbox={ false } displaySelectAll={ false }>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Actions</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={ false }>
              {
                Object.keys(this.props.data).map(key => (
                  <TableRow key={ key }>
                    <TableRowColumn>{ this.props.data[key].title }</TableRowColumn>
                    <TableRowColumn>
                      <IconEdit
                        className="h__btn h__btn--action"
                        onClick={ () => this.onEdit(key, this.props.data[key]) } />
                      <IconDelete
                        className="h__btn h__btn--action"
                        onClick={ () => this.onDeleteConfirm(key, this.props.data[key]) } />
                    </TableRowColumn>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        }

        {
          this.props.error && <div>{ this.props.error.message }</div>
        }

        {
          this.state.confirm &&
          <Dialog
            title={ `Delete ${this.state.item.title}` }
            open={ this.state.confirm }
            autoScrollBodyContent={ true }
            actions={ [
              <FlatButton
                label="Cancel"
                onClick={ () => this.reset() } />,
              <FlatButton
                label="Submit"
                primary={ true }
                onClick={ this.itemDelete } />
            ] }>
          </Dialog>
        }

        {
          this.state.edit &&
          <Dialog
            title={ `Edit ${this.props.type}` }
            open={ this.state.edit }
            autoScrollBodyContent={ true }>
            <FormProject
              prepopulate={ this.state.item }
              onSubmit={ this.itemEdit }
              onCancel={ () => this.reset() } />
          </Dialog>
        }

      </div> : <CircularProgress />;
  }
}
