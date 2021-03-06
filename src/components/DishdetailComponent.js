import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardBody, CardText, Breadcrumb, BreadcrumbItem,
        Modal, ModalBody, ModalHeader, Row, Col, Label, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const RenderDish = ({dish}) => {
    
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}
        >
            <Card>
                <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle tag="h5">{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmitComment(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishID, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                            <Row>
                                <Label htmlFor="rating" xs={12}>Rating</Label>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    {// eslint-disable-next-line
                                    }<Control.select
                                        model=".rating"
                                        name="rating"
                                        className="form-control"
                                        defaultValue="5"
                                    >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row>
                                <Label htmlFor="author" xs={12}>Your Name</Label>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    {// eslint-disable-next-line
                                    }<Control.text
                                        model=".author"
                                        id="author"
                                        name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required,
                                            minLength: minLength(3),
                                            maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        model=".author"
                                        show="touched"
                                        className="text-danger"
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 2 characters ',
                                            maxLength: 'Must be 15 characters or less '
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Label htmlFor="comment" xs={12}>Comment</Label>
                            </Row>
                            <Row>
                                <Col xs={12}>
                                    {// eslint-disable-next-line
                                    }<Control.textarea
                                        model=".comment"
                                        id="comment"
                                        name="comment"
                                        rows="6"
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Row className="mt-3">
                                <Col xs={12}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        );
    }
}

const RenderComments = ({comments, postComment, dishID}) => {

    if (comments != null) {
        const jsx_comments = comments.map((comment) => {
            return (
                <Fade in key={comment.id}>
                    <li className="list-unstyled">
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} , {new Intl.DateTimeFormat('ru-RU', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                </Fade>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul className="px-0">
                    <Stagger in>
                        {jsx_comments}
                    </Stagger>
                </ul>
                <CommentForm dishID={dishID} postComment={postComment} />
            </div>
        );
    } else {
        return (
            <div>
                <h4>Comments</h4>
                <CommentForm dishID={dishID} postComment={postComment} />
            </div>
        );
    }
}

const DishDetail = (props) => {

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments
                            comments={props.comments}
                            postComment={props.postComment}
                            dishID={props.dish.id}
                        />
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }
}

export default DishDetail;