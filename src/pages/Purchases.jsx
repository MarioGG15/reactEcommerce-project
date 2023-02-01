import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const purchases = useSelector(state => state.purchases);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, []);

    return (
        <div>
            <h1>Purchases</h1>
            <ul>
                {purchases.map(purchase => (
                    <li key={purchase.id}>
                        <Link to={`/products/${purchase.product.id}`}>
                            {purchase.product?.title}
                            <img src={purchase.product.images[0].url} alt="" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Purchases;