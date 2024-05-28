import React, { FormEvent, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { useToaster } from "../../hooks/useToaster";
import { CommentProps } from "./Comments";

type Props = {
  postId: number;
  comment: CommentProps;
  refresh: () => void;
};

const UpdateComment: React.FC<Props> = (props) => {
  const { postId, comment, refresh } = props;
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    author: comment.author.id,
    body: comment.body,
    post: postId,
  });

  const { setToaster } = useToaster();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e: FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const updateCommentForm = e.currentTarget;

    if (updateCommentForm.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    const data = {
      author: form.author,
      body: form.body,
      post: postId,
    };

    axiosService
      .put(`/api/post/${postId}/comment/${comment.id}/`, data)
      .then(() => {
        handleClose();
        setToaster({
          type: "success",
          message: "Comment updated 🚀",
          show: true,
          title: "Success!",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "An error occurred.",
          show: true,
          title: "Comment Error",
        });
      });
  };

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Modify</Dropdown.Item>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) => handleSubmit(e)}
          >
            <Form.Group className="mb-3">
              <Form.Control
                name="body"
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={(e) => handleSubmit(e)}>
            Modify
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateComment;
