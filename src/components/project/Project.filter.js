import React, { Component } from 'react';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';

// const arr = [2013, 2014, 2015, 2016, 2017, 2018];

export default class ProjectFilter extends Component {

  constructor (props) {
    super(props);
    this.state = { active: 2017 };
  }

    onSelect = (event, index, value) => this.setState({ active: value });

    render () {
      return (
        <div className="h__project-filter">
          {
          //   <DropDownMenu
          //   maxHeight={ 300 }
          //   value={ this.state.active }
          //   onChange={ this.onSelect }>
          //   {
          //     arr.map((year, index) => (
          //       <MenuItem
          //         value={ year }
          //         key={ index }
          //         primaryText={ `${year}` } />
          //     ))
          //   }
          // </DropDownMenu>
          }
        </div>
      );
    }
}
