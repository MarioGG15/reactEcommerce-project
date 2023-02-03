import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProductsToCart } from '../store/slices/cart.slice';
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

    const [quantity, setQuantity] = useState(1);

    const addToCart = () => {
        const productInCart = {
            quantity: quantity,
            productId: products.id
        };
        dispatch(addProductsToCart(productInCart));
    };

    return (
        <div>
            <Row>
                <Col lg={8}>
                    <Carousel variant='dark'>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={products.images?.[0].url}
                                alt="First slide"
                                style={{ objectFit: "contain", height: "300px" }}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={products.images?.[1].url}
                                alt="Second slide"
                                style={{ objectFit: "contain", height: "300px" }}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={products.images?.[2].url}
                                alt="Third slide"
                                style={{ objectFit: "contain", height: "300px" }}
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col lg={4}>
                    <div className='product-data'>
                        <div className='product-header'>
                            <h1>{products.brand}</h1>
                            <h2>{products.title}</h2>
                        </div>
                        <div className='product-description'>
                            <p>{products.description}</p>
                        </div>
                        <div className='product-footer'>
                            <div className='product-price'>
                                <h3>Price</h3>
                                <h4>${products.price}</h4>
                            </div>
                            <div className='product-controls'>
                                <h3>Quantity</h3>
                                <div className='product-btns-input'>
                                    <Button onClick={() => setQuantity(quantity - 1)} disabled={quantity === 1}><i className="fa-solid fa-minus"></i></Button>
                                    <input className='quantity-input' type="text" value={quantity} onChange={e => setQuantity(e.target.value)} />
                                    <Button onClick={() => setQuantity(quantity + 1)}><i className="fa-solid fa-plus"></i></Button>
                                </div>
                            </div>
                        </div>
                        <div className='product-cartBtn'>
                            <Button onClick={addToCart}>
                                Add to Cart
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
            <h2 className='similar-products'>Discover similar products</h2>
            <Row xs={1} md={2} lg={3}>
                {productsSuggested.map(productsItem => (
                    <Col key={productsItem.id}>
                        <Card
                            style={{ width: '17rem' }}
                            onClick={() => navigate(`/products/${productsItem.id}`)}>
                            <Card.Img
                                variant="top"
                                src={productsItem.images[0].url}
                                style={{ height: "200px", objectFit: "contain" }}
                            />
                            <Card.Body>
                                <Card.Title>{productsItem.brand}</Card.Title>
                                <Card.Text>
                                    {productsItem.title}
                                </Card.Text>
                                <Card.Title>Price</Card.Title>
                                <Card.Text>
                                    {productsItem.price}
                                </Card.Text>
                                <Button variant="primary" className='card-btn' onClick={addToCart}><i className="fa-solid fa-cart-plus"></i></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductsId;