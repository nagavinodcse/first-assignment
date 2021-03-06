import React from 'react';
import {Card, CardImgOverlay, CardImg, CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from "react-router-dom";
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';

const RenderMenuItem = ({dish}) => (
    <Card>
        <Link to={`/menu/${dish.id}`}>
            <CardImg src={`${baseUrl}${dish.image}`} alt={dish.name}/>
            <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay>
        </Link>
    </Card>
);
const Menu = ({dishes}) =>{
    return dishes.isLoading ? (
        <div className="container">
            <div className="row">
                <Loading/>
            </div>
        </div>
    ) : dishes.errMess ? (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h4>{dishes.errMess}</h4>
                </div>
            </div>
        </div>
    ) : (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Menu</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                {
                    dishes.dishes.map(dish =>
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