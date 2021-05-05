import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText } from 'reactstrap';

class DishDetail extends Component {

    renderDish(dish) {
        return (
            <Card>
                <CardImg width="100%" object src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle tag="h5">{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(comments) {
        if (comments != null) {
            const jsx_comments = comments.map((comment) => {
                return (
                    <li className="list-unstyled" key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} , {new Date(comment.date).toDateString()}</p>
                    </li>
                );
            });

            return (
                <div>
                    <h4>Comments</h4>
                    <ul className="px-0">
                        {jsx_comments}
                    </ul>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }

    }

    render() {
        if (this.props.dish != null) {

            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}
export default DishDetail;