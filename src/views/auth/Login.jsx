import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../../redux/features/authSlice.js';

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await dispatch(
        signIn({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        })
      );
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  }

  const style = {
    minWidth: '30rem',
    paddingBottom: '1rem',
  };
  return (
    <div className="d-flex justify-content-center">
      <Card style={style}>
        <Card.Body>
          <h2 className="text-center mb-3">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Log In
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          <Link to="/forgot-password">Forgot password?</Link>
        </div>
        <div className="w-100 text-center mt-2">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Card>
    </div>
  );
}
