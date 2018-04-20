import { Component } from 'react';
// import t from 'prop-types';
// import CircularProgress from 'material-ui/CircularProgress';
// import IconDelete from 'material-ui/svg-icons/action/delete';
// import IconEdit from 'material-ui/svg-icons/editor/mode-edit';
// import {
//   Table,
//   TableBody,
//   TableHeader,
//   TableHeaderColumn,
//   TableRow,
//   TableRowColumn
// } from 'material-ui/Table';

export default class TableProject extends Component {

    static propTypes = {
      // data: t.array,
      // loading: t.bool.isRequired,
      // onEdit: t.func.isRequired,
      // onDelete: t.func.isRequired,
      // error: t.object
    }

    static defaultProps = {
      // data: [],
      // error: {}
    }

    render () {
      return null;
      // return !this.props.loading ?
      //   <div>
      //     {
      //       this.props.data &&
      //       <Table>
      //         <TableHeader adjustForCheckbox={ false } displaySelectAll={ false }>
      //           <TableRow>
      //             <TableHeaderColumn>Name</TableHeaderColumn>
      //             <TableHeaderColumn>Actions</TableHeaderColumn>
      //           </TableRow>
      //         </TableHeader>
      //         <TableBody displayRowCheckbox={ false }>
      //           {
      //             this.props.data.map(project => (
      //               <TableRow key={ project.id }>
      //                 <TableRowColumn>{ project.name }</TableRowColumn>
      //                 <TableRowColumn>
      //                   <IconEdit
      //                     className="h__btn h__btn--action"
      //                     onClick={ () => this.props.onEdit(project) } />
      //                   <IconDelete
      //                     className="h__btn h__btn--action"
      //                     onClick={ () => this.props.onDelete(project) } />
      //                 </TableRowColumn>
      //               </TableRow>
      //             ))
      //           }
      //         </TableBody>
      //       </Table>
      //     }

      //     {
      //       this.props.error && <div>{ this.props.error.message }</div>
      //     }
      //   </div> : <CircularProgress />;
    }
}
