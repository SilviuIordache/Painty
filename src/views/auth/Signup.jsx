import React, { useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { register } from '../../dbservices/auth';

export default function Signup() {
  
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate()
  const { error, loading } = useSelector((state) => state.auth);


  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await register(usernameRef.current.value, emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (err) {
      console.log(err)
    }
  }

  const style = {
    minWidth: "30rem",
    paddingBottom: "1rem"
  }
  return (
    <div className="d-flex justify-content-center">
      <Card style={style}>
        <Card.Body>
          <h2 className="text-center mb-3">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="username" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" ref={usernameRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">Sign Up</Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link> 
        </div>
      </Card>
    </div>
  );
}
