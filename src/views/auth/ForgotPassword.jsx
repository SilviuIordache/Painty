import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
// import { useAuth } from '../../contexts/AuthContext';

export default function ForgotPassword() {
  const emailRef = useRef();
  // const { resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setMessage('')
      setLoading(true);
      // await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions');
    } catch (err) {
      setError('Failed to reset password');
    }
    setLoading(false);
  }

  const style = {
    minWidth: '30rem',
    paddingBottom: '1rem',
  };
  return (
    <div className="d-flex justify-content-center">
      <Card style={style}>
        <Card.Body>
          <h2 className="text-center mb-3">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2">
          <Link to="/login">Log in</Link>
        </div>
        <div className="w-100 text-center mt-2">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Card>
    </div>
  );
}
