import { FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import Toaster from "../Toaster";

export interface Post {
  id: string;
  author: Author;
  body: string;
  edited: boolean;
  liked: boolean;
  likes_count: number;
  created: Date;
  updated: Date;
}

export interface Author {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
  created: Date;
  updated: Date;
}

const CreatePost = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");

  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    author: "",
    body: "",
  });
  const user = getUser();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const createPostForm = event.currentTarget;
    if (createPostForm.checkValidity() === false) {
      event.stopPropagation();
      return;
    }
    setValidated(true);
    const data = {
      author: user.id,
      body: form.body,
    };
    axiosService
      .post("/api/post/", { ...data })
      .then(() => {
        handleClose();
        setToastMessage("Post created 🚀");
        setToastType("success");
        setShowToast(true);
        setForm({
          author: "",
          body: "",
        });
      })
      .catch(() => {
        setToastMessage("An error occurred.");
        setToastType("danger");
      });
  };

  return (
    <>
      <Form.Group className="my-3 w-75">
        <Form.Control
          className="py-2 rounded-pill border-primary text-primary"
          type="text"
          placeholder="Write a post"
          onClick={handleShow}
        />
      </Form.Group>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                name="body"
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                as="textarea"
                rows={3}
              />
            </Form.Group>
            <Button type="submit" variant="primary" disabled={form.body === ""}>
              Post
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Toaster
        title="Post!"
        message={toastMessage}
        showToast={showToast}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default CreatePost;
