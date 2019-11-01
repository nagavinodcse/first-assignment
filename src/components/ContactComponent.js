import React, {Component} from 'react';
import {Button,Label, Col,Row} from "reactstrap";
import {Control,Form,Errors,actions} from "react-redux-form";

class Contact extends Component {
    handleSubmit = values =>
    {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
        this.props.resetFeedbackForm();
    };

    render() {
        const required = (val) => val && val.length, maxLength = (len) => (val) => !(val) || (val.length <= len), minLength = (len) => (val) => val && (val.length >= len), isNumber = (val) => !isNaN(Number(val)), validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your Feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model="feedback" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Control.text model=".firstname" id="firstname" className="form-control" name="firstname" validators={{required, minLength: minLength(3), maxLength: maxLength(15)}} placeholder="First Name"/>
                                    <Errors className="text-danger" model=".firstname" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 characters or less'}}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Control.text model=".lastname" className="form-control" id="lastname" name="lastname" validators={{ required, minLength: minLength(3), maxLength: maxLength(15) }} placeholder="Last Name"/>
                                    <Errors className="text-danger" model=".lastname" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 2 characters', maxLength: 'Must be 15 characters or less' }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Control.text model=".telnum" className="form-control" id="telnum" name="telnum" validators={{ required, minLength: minLength(3), maxLength: maxLength(15), isNumber }} placeholder="Tel. number"/>
                                    <Errors className="text-danger" model=".telnum" show="touched" messages={{ required: 'Required', minLength: 'Must be greater than 2 numbers', maxLength: 'Must be 15 numbers or less', isNumber: 'Must be a number' }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Control.text model=".email" className="form-control" id="email" name="email" validators={{ required, validEmail }} placeholder="Email"/>
                                    <Errors className="text-danger" model=".email" show="touched" messages={{ required: 'Required', validEmail: 'Invalid Email Address' }}/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 6, offset: 2}}>
                                    <div className="form-check">
                                        <Label check>
                                            <Control.checkbox model=".agree" name="agree" className="form-check-input"/>
                                            {' '} <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Control.select className="form-control" model=".contactType" name="contactType">
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Control.textarea model=".message" className="form-control" id="message" name="message" rows="12"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">Send Feedback</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Contact;