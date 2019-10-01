import React, {Component} from 'react';
import {Button, Label, Row, Col, Modal, ModalHeader, ModalBody} from "reactstrap";
import {Control, LocalForm, Errors} from "react-redux-form";

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
        alert('Current State is: ' + JSON.stringify(values));
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
        )
    }
}

export default CommentForm;