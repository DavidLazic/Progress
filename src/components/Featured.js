import React, { Component } from 'react';
import t from 'prop-types';
// import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';

export default class Featured extends Component {

    static propTypes = {
      data: t.array
    }

    static defaultProps = {
      data: []
    }

    render () {
      return (
        <article className="h__featured">
          <ul className="h__featured__list">
            {
              this.props.data.length > 0 && this.props.data.map((project, index) => (
                <li
                  key={ project.key }
                  className="h__featured__card"
                  onClick={ () => this.onCardSelect(index) }>
                  {
                  //   <Card>
                  //   <CardMedia
                  //     overlay={ <CardTitle title="Overlay title" subtitle="Overlay subtitle" /> }>
                  //     <img src="http://www.material-ui.com/images/nature-600-337.jpg" alt="" />
                  //   </CardMedia>
                  //   <CardTitle title="Card title" subtitle="Card subtitle" />
                  //   <CardText>
                  //               Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  //               Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                  //               Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                  //               Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                  //   </CardText>
                  //   <CardActions>
                  //     <FlatButton label="Read" />
                  //   </CardActions>
                  // </Card>
                  }
                </li>)
              )
            }
          </ul>
        </article>
      );
    }
}
