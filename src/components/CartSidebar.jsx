import React, { useEffect, useState } from 'react';
import { Button, Figure, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCartThunk, purchaseCartThunk } from '../store/slices/cart.slice';

const CartSidebar = ({ show, handleClose }) => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartThunk())
    }, []);

    const checkoutCart = () => {
        dispatch(purchaseCartThunk())
    }

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
                            <Figure key={cartProduct.id}>
                            <Figure.Image
                              width={171}
                              height={180}
                              alt="171x180"
                              src={cartProduct.product?.images[0].url}
                            />
                            <Figure.Caption>
                            {cartProduct.product?.title}
                            </Figure.Caption>
                            <Figure.Caption>
                            Price: ${cartProduct.product?.price}
                            </Figure.Caption>
                          </Figure> 
                        ))}
                    </ul>
                    <Button onClick={checkoutCart}>
                        Checkout
                    </Button>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default CartSidebar;