import React, { Component } from 'react';
import t from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import IconDelete from 'material-ui/svg-icons/action/delete';
import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
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
      error: t.object
    }

    static defaultProps = {
      data: {},
      error: {}
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
                      <TableRowColumn>{ this.props.data[key].name }</TableRowColumn>
                      <TableRowColumn>
                        <IconEdit
                          className="h__btn h__btn--action"
                          onClick={ () => this.props.onEdit(this.props.data[key]) } />
                        <IconDelete
                          className="h__btn h__btn--action"
                          onClick={ () => this.props.onDelete(key) } />
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
        </div> : <CircularProgress />;
    }
}
