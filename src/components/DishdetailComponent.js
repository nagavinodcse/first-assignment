import React, {Component} from 'react';
import {Card, CardBody, CardText, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, Button,Label, Row, Col, Modal, ModalHeader, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import {FadeTransform,Fade,Stagger} from "react-animation-components";
const RenderDish = ({dish}) => (
    <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}>
        <Card>
            <CardImg top src={`${baseUrl}${dish.image}`} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    </FadeTransform>
);
const RenderComments = ({comments,postComment,dishId}) => {
    const dateFormat = date => {
        let initialDate = new Date(date);
        return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(initialDate);
    };
    let renderComments =  comments != null ?
        comments.map(comment =>
        (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {dateFormat(comment.date)}</p>
            </li>
        )) : '';
    return (
        <ul className="commentList">
            <Stagger in>
                {renderComments}
            </Stagger>
            <CommentForm dishId={dishId} postComment={postComment} />
        </ul>
    )
};
const DishDetail = (props) => {
    let dish = props.dish;

    return props.isLoading ? (
        <div className="container">
            <div className="row">
                <Loading/>
            </div>
        </div>
    ) : props.errMess ? (
        <div className="container">
            <div className="row">
                <h4>{props.errMess}</h4>
            </div>
        </div>
    ) : dish != null ? (<div className="container">
        <div className="row">
            <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className="col-12">
                <h3>{dish.name}</h3>
                <hr/>
            </div>
        </div>
        <div className="row">
            <div className="col-12 col-md-6 mt-3 mb-3">
                <RenderDish dish={dish}/>
            </div>
            <div className="col-12 col-md-6 mt-3">
                <RenderComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id}/>
            </div>
        </div>
    </div>) : <div/>;
};
class CommentForm extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isCommentModalOpen: false
        }
    }

    handleSubmit = values =>
    {
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    };
    toggleModal = () =>
    {
        this.setState({
            isCommentModalOpen: !this.state.isCommentModalOpen
        });
    };

    render()
    {
        const required = (val) => val && val.length, maxLength = (len) => (val) => !(val) || (val.length <= len), minLength = (len) => (val) => val && (val.length >= len);
        return (
            <div>
                <Button outline onClick={()=>{ this.toggleModal();}}><span className="fa fa-pencil fa-lg"/> Submit Comment</Button>
                <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={this.handleSubmit}>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select className="form-control" id="rating" model=".rating" name="rating">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="name">Name</Label>
                                    <Control.text className="form-control" id="name" model=".author" name="author"
                                                  placeholder="Name"
                                                  validators={{
                                                      required,
                                                      minLength: minLength(3),
                                                      maxLength: maxLength(15)
                                                  }}/>
                                    <Errors className="text-danger" model=".author" show="touched" messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea className="form-control" id="comment" name="comment" rows="6"
                                                      model=".comment" placeholder="Comment" validators={{required}}/>
                                    <Errors className="text-danger" model=".author" show="touched"
                                            messages={{required: 'Required'}}/>
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}
export default DishDetail;