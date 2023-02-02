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

    const [quantity, setQuantity] = useState("");

    const addToCart = () => {
        const productInCart = {
            quantity: quantity,
            productId: products.id
        };
        dispatch(addProductsToCart(productInCart));
    };

    return (
        <div>
            <h1>{products.title} ${products.price}</h1>
            <input type="text" value={quantity} onChange={e => setQuantity(e.target.value)} />
            <Button onClick={addToCart}>
                Add to Cart
            </Button>
            <Row>
                <Col lg={9}>
                    <Carousel fade>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={products.images?.[0].url}
                                alt="First slide"
                                style={{ objectFit: "contain", height: "300px" }}
                            />
                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={products.images?.[1].url}
                                alt="Second slide"
                                style={{ objectFit: "contain", height: "300px" }}
                            />

                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={products.images?.[2].url}
                                alt="Third slide"
                                style={{ objectFit: "contain", height: "300px" }}
                            />

                            <Carousel.Caption>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col lg={3}>
                    <div>
                        <div><p>{products.description}</p></div>
                    </div>
                </Col>
            </Row>
            <h2>Discover similar products</h2>
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
                                <Button variant="primary" className='card-btn'><i className="fa-solid fa-cart-plus"></i></Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductsId;