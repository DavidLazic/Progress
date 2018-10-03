import React, { Component } from 'react';
import t from 'prop-types';
import { FormProject } from 'src/components/form';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

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
    return !this.props.loading
      ? (
        <div>
          {
            this.props.data
            && (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    Object.keys(this.props.data).map(key => (
                      <TableRow key={ key }>
                        <TableCell>{ this.props.data[key].title }</TableCell>
                        <TableCell>
                          <IconEdit
                            className="h__btn h__btn--action"
                            onClick={ () => this.onEdit(key, this.props.data[key]) } />
                          <IconDelete
                            className="h__btn h__btn--action"
                            onClick={ () => this.onDeleteConfirm(key, this.props.data[key]) } />
                        </TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            )
          }

          {
            this.props.error && <div>{ this.props.error.message }</div>
          }

          {
            this.state.confirm
            && (
              <Dialog
                title={ `Delete ${this.state.item.title}` }
                open={ this.state.confirm }
                actions={ [
                  <Button
                    label="Cancel"
                    onClick={ () => this.reset() } />,
                  <Button
                    label="Submit"
                    primary={ true }
                    onClick={ this.itemDelete } />
                ] }>
              </Dialog>
            )
          }

          {
            this.state.edit
            && (
              <Dialog
                title={ `Edit ${this.props.type}` }
                open={ this.state.edit }>
                <FormProject
                  prepopulate={ this.state.item }
                  onSubmit={ this.itemEdit }
                  onCancel={ () => this.reset() } />
              </Dialog>
            )
          }

        </div>
      ) : <CircularProgress />;
  }
}
