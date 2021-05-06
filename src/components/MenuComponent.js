import React from 'react';
import { Card, CardImg, CardTitle, CardImgOverlay } from 'reactstrap';


const RenderMenuItem = ({dish, onClick}) => {
    return (
        <Card onClick={() => onClick(dish.id)}>
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardImgOverlay>
                <CardTitle tag="h5">{dish.name}</CardTitle>
            </CardImgOverlay>
        </Card>
    );
}

const Menu = (props) => {
    const jsx_menu = props.dishes.map((dish) => {
        return (
            <div key={dish.id} className="col-12 col-md-5 m-1">
                <RenderMenuItem dish={dish} onClick={props.onClick} />
            </div>
        );
    });

    return (
        <div className="container">
            <div className="row">
                {jsx_menu}
            </div>
        </div>
    );
}
        


export default Menu;