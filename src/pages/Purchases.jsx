import React, { useEffect } from 'react';
import { Figure, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const purchases = useSelector(state => state.purchases);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, []);

    console.log(purchases)

    return (
        <div>
            <h1>My purchases</h1>
            <ListGroup variant="flush">
                {purchases.map(purchase => (
                    <div className='purchase-container' key={purchase.id}>
                        <ListGroup.Item>
                            <Link to={`/products/${purchase.product?.id}`}>
                                <Figure>
                                    <Figure.Image
                                        width={91}
                                        height={100}
                                        alt="171x180"
                                        src={purchase.product?.images[2].url}
                                        style={{ objectFit: "contain" }}
                                    />
                                </Figure>
                            </Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                        {purchase.product?.title}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Quantity: {purchase.quantity}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Total: ${purchase.product?.price * purchase.quantity}
                        </ListGroup.Item>
                    </div>
                ))}
            </ListGroup>
        </div>
    );
};

export default Purchases;