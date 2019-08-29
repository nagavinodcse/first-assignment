import React, { Component } from 'react';
import { Card,CardBody,CardText,CardImg,CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        let dish = this.props.dish;
        return dish != null ? (
            <Card>
                <CardImg top src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        ) : (
            <div/>
        );
    }
}

export default DishDetail;