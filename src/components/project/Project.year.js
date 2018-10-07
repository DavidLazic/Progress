import React, { Component } from 'react';
import t from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import * as types from 'src/actions/types';
import IconMenu from '@material-ui/icons/ArrowDropDown';

@connect(state => ({
  Periods: state.projectsReducer[types.PROJECTS_PERIODS]
}))
class ProjectYear extends Component {

  static propTypes = {
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

    this.select = React.createRef();
  }

  componentDidMount () {
    document.addEventListener('click', this.onDocumentClick);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.onDocumentClick);
  }

  onDocumentClick = e =>
    (e.target !== this.select.current)
    && this.setState({ open: false })

  onPeriodChange = (activeIndex, selected) =>
    this.setState({ activeIndex, selected }, () =>
      this.props.onPeriodChange(selected))

  render () {
    const { Periods } = this.props;

    return (
      <div
        className={ classNames({
          h__select: true,
          active: this.state.open
        }) }>

        <span
          ref={ this.select }
          className="h__select__placeholder"
          onClick={ () => this.setState({ open: true }) }>
          { this.state.selected || 'Year' }
          <span>
            <IconMenu />
          </span>
        </span>

        <div className="h__select__options">
          <ul>
            {
              Periods.data
              && Object
                .keys(Periods.data)
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
