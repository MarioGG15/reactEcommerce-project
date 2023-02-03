import React, { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CartSidebar from "./CartSidebar";

const AppNavbar = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.setItem("token", "");
        navigate("/login")
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar expand="lg" variant="dark" bg="primary" size="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        E-Commerce
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/login">
                                <i className="fa-solid fa-user"></i> Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/purchases">
                            <i className="fa-solid fa-bag-shopping"></i> Purchases
                            </Nav.Link>
                            <Nav.Link onClick={handleShow}><i className="fa-solid fa-cart-shopping"></i> Cart</Nav.Link>
                            <Nav.Link onClick={logout}><i className="fa-solid fa-right-from-bracket"></i> Log out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CartSidebar show={show} handleClose={handleClose} />
        </>
    );
};

export default AppNavbar;
