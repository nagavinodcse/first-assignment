import React from 'react';
import {Card, CardBody, CardText, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import CommentForm from "./CommentFormComponent";

const RenderDish = ({dish}) => (
    <Card>
        <CardImg top src={dish.image} alt={dish.name}/>
        <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
        </CardBody>
    </Card>
);
const RenderComments = ({comments}) => {
    const dateFormat = date => {
        let initialDate = new Date(date);
        return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(initialDate);
    };
    let renderComments =  comments != null ? comments.map(comment =>
        (
            <li key={comment.id}>
                <p>{comment.comment}</p>
                <p>-- {comment.author}, {dateFormat(comment.date)}</p>
            </li>
        )) : '';
    let commentForm = React.createRef();
    return (
        <ul className="commentList">
            {renderComments}
            <Button outline onClick={()=>{ commentForm.current.toggleModal();}}><span className="fa fa-pencil fa-lg"/> Submit Comment</Button>
            <CommentForm ref={commentForm}/>
        </ul>
    )
};
const DishDetail = (props) => {
    let dish = props.dish;
    return dish != null ? (
        <div className="container">
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
                    <RenderComments comments={props.comments}/>
                </div>
            </div>
        </div>
    ) : <div/>;
};
export default DishDetail;