import React, { useState } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slice/authSlice";

const Login = () => {
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { isAuthenticated, error, loading } = useSelector((state) => state.auth);
    
    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginUser({ userId, password }));

    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row>
                <Col md={12}>
                    <Card style={{ width: "25rem" }} className="shadow">
                        <Card.Body>
                            <Card.Title className="text-center mb-4">Welcome Back!</Card.Title>
                            <Form onSubmit={handleLogin}>
                                <Form.Group className="mb-3">
                                    <Form.Label>User ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter User ID"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                {error && <p className="text-danger small">{error}</p>}
                                <Button variant="primary" type="submit" className="w-100">
                                    Login
                                </Button>
                            </Form>
                            <div className="text-center mt-3">
                                <a href="/forgot-password" className="text-muted small">
                                    Forgot your password?
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
