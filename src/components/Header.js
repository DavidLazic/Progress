import React, { Component } from 'react';
import t from 'prop-types';
// import { routeCodes } from 'routes';

export default class Header extends Component {

    static propTypes = {
      path: t.string.isRequired,
      title: t.string
      // navigate: t.func.isRequired,
      // onToggleMenu: t.func.isRequired
    }

    static defaultProps = {
      title: ''
    }

    /**
     * @description
     * Check whether to show hamburger menu or back arrow
     *
     * @return {Bool}
     * @private
     */
    showHamburger = () => !/admin\/[a-z]+\/.+/.test(this.props.path)

    render () {
      return (
        <div className="h__appbar">
          {
            // this.showHamburger() ?
            //   <IconButton
            //     className="h__icon h__icon--hamburger"
            //     style={ { width: 'auto', height: 'auto' } }
            //     iconStyle={ { width: 36, height: 36 } }
            //     onClick={ () => this.props.onToggleMenu({ active: true }) }
            //     touch={ true }>
            //     <IconMenu />
            //   </IconButton> :
            //   <IconButton
            //     onClick={ () => this.props.navigate(routeCodes.ADMIN_PROJECTS) }
            //     style={ { width: 'auto', height: 'auto' } }
            //     iconStyle={ { width: 36, height: 36 } }
            //     touch={ true }>
            //     <IconBack />
            //   </IconButton>
          }

          <div className="h__appbar__title">{ this.props.title }</div>
        </div>
      );
    }
}
