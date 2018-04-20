import React, { Component } from 'react';
import t from 'prop-types';
import { routeCodes } from 'src/routes';
import { augmentComponent } from 'react-augment';
import HOC from 'src/lib/decorators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import * as types from 'src/actions/types';
// import RaisedButton from 'material-ui/RaisedButton';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import IconChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import TableProject from 'src/components/table/Table.project';

@connect(state => ({
  Projects: state.projectsReducer[types.PROJECTS]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
@augmentComponent([
  HOC.useNavigation
])
export default class AdminProjects extends Component {

    static propTypes = {
      actions: t.object.isRequired,
      navigate: t.func.isRequired,
      Projects: t.object
    }

    static defaultProps = {
      Projects: null
    }

    componentDidMount = () => this.props.actions.getProjects()

    /**
     * @description
     * On edit project fn
     *
     * @param {Object} project
     * @return {Function}
     * @private
     */
    onProjectEdit = project => this.props.navigate(`${routeCodes.ADMIN_PROJECTS}/${project.id}`, project)

    /**
     * @description
     * On delete project fn
     *
     * @param {Object} project
     * @return {Function}
     * @private
     */
    onProjectDelete = project => this.props.actions.deleteProject(project)

    render () {
      return (
        <article className="h__article h__article--admin">
          {
            // window.innerWidth <= 680 ?
            //   <FloatingActionButton
            //     mini
            //     className="h__icon h__icon--fab"
            //     backgroundColor="#483d8b"
            //     onClick={ () => this.props.navigate(routeCodes.ADMIN_PROJECT_CREATE) }
            //     iconStyle={ { fill: '#fff' } }
            //     children={ <IconChevronRight color="#fff" /> } /> :
            //   <RaisedButton
            //     onClick={ () => this.props.navigate(routeCodes.ADMIN_PROJECT_CREATE) }
            //     label="Add"
            //     labelStyle={ { fontFamily: 'Saira Extra Condensed', fontSize: 18 } }
            //     className="h__icon h__icon--fab"
            //     backgroundColor="#483d8b" />
          }

          <TableProject
            loading={ this.props.Projects.loading }
            data={ this.props.Projects.data }
            onEdit={ this.onProjectEdit }
            onDelete={ this.onProjectDelete }
            error={ this.props.Projects.error } />
        </article>
      );
    }
}

