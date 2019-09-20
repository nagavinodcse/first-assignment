import React from 'react';
import {Card, CardImgOverlay, CardImg, CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from "react-router-dom";
const RenderMenuItem = ({dish}) => (
    <Card>
        <Link to={`/menu/${dish.id}`}>
            <CardImg src={dish.image} alt={dish.name}/>
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Link>
    </Card>
);
const Menu = ({dishes}) =>{
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                {
                    dishes.map(dish =>
                        (
                            <div key={dish.id} className="col-12 col-md-3 mt-3 mb-3">
                                <RenderMenuItem dish={dish}/>
                            </div>
                        ))
                }
            </div>
        </div>
    );
};

export default Menu;