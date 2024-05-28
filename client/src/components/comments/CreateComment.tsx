import React, { FormEvent, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import axiosService from "../../helpers/axios";
import { randomAvatar } from "../../helpers/utils";
import { useToaster } from "../../hooks/useToaster";
import { getUser } from "../../hooks/user.actions";
import type { Author } from "../posts/CreatePost";

type Props = {
  postId: number;
  refresh: () => void;
};

const CreateComment: React.FC<Props> = (props) => {
  const { postId, refresh } = props;
  const [avatar] = useState(randomAvatar());
  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({
    body: "",
  });

  const { setToaster } = useToaster();

  const user = getUser() as Author;

  const handleSubmit = (event: FormEvent<HTMLInputElement>) => {
    event.preventDefault();
    const createCommentForm = event.currentTarget;

    if (createCommentForm.checkValidity() === false) {
      event.stopPropagation();
    }

    setValidated(true);

    const data = {
      author: user.id,
      body: form.body,
      post: postId,
    };

    axiosService
      .post(`/api/post/${postId}/comment/`, data)
      .then(() => {
        setForm({ ...form, body: "" });
        setToaster({
          type: "success",
          message: "Comment posted successfully🚀",
          show: true,
          title: "Comment!",
        });
        refresh();
      })
      .catch(() => {
        setToaster({
          type: "danger",
          message: "",
          show: true,
          title: "An error occurred.!",
        });
      });
  };

  return (
    <Form
      className="d-flex flex-row justify-content-between"
      noValidate
      validated={validated}
      onSubmit={(e) => handleSubmit(e)}
    >
      <Image
        src={avatar}
        roundedCircle
        width={48}
        height={48}
        className="my-2"
      />
      <Form.Group className="m-3 w-75">
        <Form.Control
          className="py-2 rounded-pill border-primary"
          type="text"
          placeholder="Write a comment"
          value={form.body}
          name="body"
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
      </Form.Group>
      <div className="m-auto">
        <Button
          variant="primary"
          onClick={(e) => handleSubmit(e)}
          disabled={form.body === undefined}
          size="sm"
        >
          Comment
        </Button>
      </div>
    </Form>
  );
};

export default CreateComment;
