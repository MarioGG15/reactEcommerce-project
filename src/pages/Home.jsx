import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, InputGroup, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterProductsCategoryThunk, filterProductsNameThunk, getProductsThunk } from '../store/slices/products.slice';

const Home = () => {

    const dispatch = useDispatch();
    const productsList = useSelector(state => state.products);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [productsSearch, setProductsSearch] = useState("");

    useEffect(() => {
        dispatch(getProductsThunk());

        axios.get("https://e-commerce-api-v2.academlo.tech/api/v1/categories/")
            .then(res => setCategories(res.data));
    }, []);

    return (
        <div>
            <Row>
                <Col lg={2}>
                    <ListGroup>
                        {categories.map((category) => (
                            <ListGroup.Item
                                key={category.id}
                                onClick={() => dispatch(filterProductsCategoryThunk(category.id))}
                                active
                                style={{ cursor: "pointer" }}
                            >
                                {category.name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
                <Col lg={10}>
                    <h1>Home</h1>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="What are you looking for?"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={productsSearch}
                            onChange={e => setProductsSearch(e.target.value)}
                        />
                        <Button
                            variant="outline-secondary"
                            id="button-addon2"
                            onClick={() => dispatch(filterProductsNameThunk(productsSearch))}
                        >
                            Button
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {productsList.map((products) => (
                            <Col key={products.id}>
                                <Card
                                    onClick={() => navigate(`/products/${products.id}`)}
                                    style={{ cursor: "pointer"}}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={products.images[0].url}
                                        style={{height: "300px", objectFit: "contain"}}
                                    />
                                    <Card.Body>
                                        <Card.Title>{products.brand}</Card.Title>
                                        <Card.Text>{products.title}</Card.Text>
                                        <Card.Title>Price</Card.Title>
                                        <Card.Text>${products.price}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;