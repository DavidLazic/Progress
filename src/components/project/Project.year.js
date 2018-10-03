import React, { Component } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from 'src/actions';
import * as types from 'src/actions/types';
import refs from 'src/constants/refs';
import IconMenu from '@material-ui/icons/UnfoldMore';

@connect(state => ({
  Periods: state.projectsReducer[types.PROJECTS_PERIODS]
}), dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch)
}))
class ProjectYear extends Component {

  static propTypes = {
    actions: t.object.isRequired,
    Periods: t.object,
    onPeriodChange: t.func
  }

  static defaultProps = {
    Periods: {},
    onPeriodChange: null
  }

  constructor (props) {
    super(props);
    this.state = {
      activeIndex: null,
      selected: null,
      open: false
    };
  }

  componentDidMount () {
    document.addEventListener('click', this.onDocumentClick);

    firebase
      .database()
      .ref(refs.PERIODS)
      .once('value', snapshot =>
        this.props.actions.projectsPeriods(snapshot.val())
      );
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.onDocumentClick);
  }

  onDocumentClick = e =>
    (e.target !== this.select)
    && this.setState({ open: false })

  onPeriodChange = (activeIndex, selected) =>
    this.setState({ activeIndex, selected }, () =>
      this.props.onPeriodChange(selected))

  render () {

    return (
      <div
        className={ classNames({
          h__select: true,
          active: this.state.open
        }) }>

        <span
          ref={ ref => this.select = ref }
          className="h__select__placeholder"
          onClick={ () => this.setState({ open: true }) }>
          {
            this.state.selected || 'Year'
          }
          <span>
            <IconMenu />
          </span>
        </span>

        <div className="h__select__options">
          <ul>
            {
              this.props.Periods.data
              && Object
                .keys(this.props.Periods.data)
                .reverse()
                .map((key, index) => (
                  <li
                    key={ key }
                    className={ classNames({
                      active: this.state.activeIndex === index
                    }) }
                    onClick={ () => this.onPeriodChange(index, key) }>
                    <span>
                      { key }
                    </span>
                  </li>
                ))
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default ProjectYear;
