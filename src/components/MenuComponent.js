import React, { Component } from 'react';
import { Card,CardImgOverlay,CardImg,CardTitle } from 'reactstrap';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDish:null
        };
    }
    onDishSelect(dish) {
        this.setState({ selectedDish: dish});
    }
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div className="col-12 col-md-3 mt-3">
                    <Card key={dish.id} onClick={() => this.onDishSelect(dish)}>
                        <CardImg src={dish.image} alt={dish.name}/>
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 mt-3">
                    </div>
                    <div className="col-12 col-md-6 mt-3">
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;