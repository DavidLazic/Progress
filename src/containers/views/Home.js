import React, { Component } from 'react';
import t from 'prop-types';
// import { routeCodes } from 'routes';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
// import IconChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

export default class Home extends Component {

  static propTypes = {
    user: t.object
  }

  static defaultProps = {
    user: null
  }

  constructor (props) {
    super(props);
    this.state = { selected: null };
    // what I know
    // what I do
    // what I say
    this.onLogout = this.onLogout.bind(this);
  }

  onCardSelect (selected) {
    return this.setState({ selected });
  }

  /**
   * @description
   * On logout fn
   *
   * @return {Function}
   * @private
   */
  onLogout () {
    // return this.props.Auth.signOut();
  }

  render () {
    return (
      <article className="h__section h__section--home">
        {
          this.props.user &&
          <div>
            {
            //   <RaisedButton
            //   onClick={ this.onLogout }
            //   label="Logout"
            //   primary={ true } />

            // <FlatButton
            //   // onClick={ () => this.props.navigate(routeCodes.ADMIN_PROJECTS) }
            //   label="Admin"
            //   labelPosition="before"
            //   primary
            //   icon={ <IconChevronRight /> } />
            }
          </div>
        }

      </article>
    );
  }
}
