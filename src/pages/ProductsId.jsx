import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { filterProductsCategoryThunk } from '../store/slices/products.slice';

const ProductsId = () => {

    const { id } = useParams();
    const [products, setProducts] = useState({});
    const dispatch = useDispatch();
    const productsSuggested = useSelector(state => state.products);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then(res => {
                setProducts(res.data)
                dispatch(filterProductsCategoryThunk(res.data.category.id))
            });
    }, [id]);

    console.log(products);

    return (
        <div>
            <h1>{products.title} ${products.price}</h1>
            <Row>
                <Col lg={9}>
                    <div className='detailProducts-img'>
                        <div><img src={products.images?.[0].url} alt="" className='img' /></div>
                        <div><img src={products.images?.[1].url} alt="" className='img' /></div>
                        <div><img src={products.images?.[2].url} alt="" className='img' /></div>
                    </div>
                    <div>
                        <div><p>{products.description}</p></div>
                    </div>
                </Col>
                <Col lg={3}>
                    <div>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                {productsSuggested.map(productsItem => (
                                    <li
                                        key={productsItem.id}
                                        onClick={() => navigate(`/products/${productsItem.id}`)}
                                    >
                                        {productsItem.title}
                                        <img src={productsItem.images[0].url} alt="" style={{height: "200px", objectFit: "contain"}}/>
                                    </li>
                                ))}
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProductsId;