import { useUserActions } from "../../hooks/user.actions";
import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

export type UserLogin = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const { login } = useUserActions();

  const handleSubmit = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const loginForm = e.currentTarget;

    if (loginForm.checkValidity() == false) {
      e.stopPropagation();
    }

    setValidated(true);

    const data: UserLogin = {
      email: form.email,
      password: form.password,
    };

    login(data).catch((err: any) => {
      if (err.message) {
        setError(err.request.response);
      }
    });
  };

  return (
    <Form
      id="registration-form"
      className="border p-4 rounded"
      noValidate
      validated={validated}
      onSubmit={(e) => handleSubmit(e)}
    >
      <Form.Group className="mb-3">
        <Form.Label>E-mail</Form.Label>
        <Form.Control
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          type="text"
          placeholder="Enter username"
        />
        <Form.Control.Feedback type="invalid">
          This file is required.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          value={form.password}
          minLength="8"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          type="password"
          placeholder="Password"
        />
        <Form.Control.Feedback type="invalid">
          Please provide a valid password.
        </Form.Control.Feedback>
      </Form.Group>

      <div className="text-content text-danger">{error && <p>{error}</p>}</div>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default LoginForm;
