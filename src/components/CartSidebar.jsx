import React, { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk } from '../store/slices/cart.slice';

const CartSidebar = ({show, handleClose}) => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    console.log(cart);

    return (
        <div>
            <Offcanvas placement='end' show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul>
                        {cart.map(cartProduct => (
                            <li key={cartProduct.id}>
                                <img src={cartProduct.product.images[1].url} alt="" className='img-fluid' style={{height: "150px"}}/>
                                {cartProduct.product.title}
                            </li>
                        ))}
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default CartSidebar;