import React, { Component } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import { routeCodes } from 'routes';
import { augmentComponent } from 'react-augment';
import HOC from 'lib/decorators';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'actions';
import * as types from 'actions/types';
import AdminSidebar from 'components/AdminSidebar';
import Appbar from 'components/Appbar';

@connect(state => ({
    Auth: state.authReducer[types.AUTH]
}), dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch)
}))
@augmentComponent([
    HOC.useRestricted,
    HOC.useNavigation
])
@muiThemeable()
export default class Admin extends Component {

    static propTypes = {
        navigate: t.func.isRequired,
        location: t.object.isRequired,
        muiTheme: t.object.isRequired,
        children: t.object
    }

    static defaultProps = {
        children: {}
    }

    state = { menuActive: false }
    routes = {
        [routeCodes.ADMIN]: 'Admin',
        [routeCodes.ADMIN_PROJECTS]: 'Projects',
        [routeCodes.ADMIN_PROJECT_CREATE]: 'Create Project'
    }

    /**
     * @description
     * Get current route title.
     *
     * @return {String}
     * @private
     */
    getRouteTitle = () => this.routes[this.props.location.pathname] || 'Edit Project'

    /**
     * @description
     * Toggle menu status fn
     *
     * @param {Object} menuStatus
     * @return {Function}
     * @private
     */
    onToggleMenu = menuStatus => this.setState({ menuActive: menuStatus.active })

    render () {
        const classes = classNames({
            'h__article h__article--admin': true,
            'h__article--menu-open': this.state.menuActive
        });

        return (
            <section
                className={ classes }
                style={ { backgroundColor: this.props.muiTheme.palette.canvasColor } }>

                <AdminSidebar
                    onToggleMenu={ () =>
                        this.state.menuActive &&
                        this.onToggleMenu({ active: false }) }
                    path={ this.props.location.pathname } />

                <section className="h__pusher">

                    <Appbar
                        title={ this.getRouteTitle() }
                        path={ this.props.location.pathname }
                        navigate={ this.props.navigate }
                        onToggleMenu={ this.onToggleMenu } />

                    { this.props.children }
                </section>
            </section>
        );
    }
}
