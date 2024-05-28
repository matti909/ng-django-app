import {
  CommentOutlined,
  LikeFilled,
  LikeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import React, { ForwardedRef } from "react";
import { Card, Dropdown, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import axiosService from "../../helpers/axios";
import { randomAvatar } from "../../helpers/utils";
import { getUser } from "../../hooks/user.actions";
import type { PostProps, UserCurrent } from "../../types";
import Toaster from "../Toaster";
import UpdatePost from "./UpdatePost";

type Props = {
  post: PostProps;
  isSinglePost?: boolean;
  refresh: () => void;
};

interface MoreToggleIconProps {
  onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const MoreToggleIcon = React.forwardRef<HTMLAnchorElement, MoreToggleIconProps>(
  ({ onClick }, ref: ForwardedRef<HTMLAnchorElement>) => (
    <a
      href="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <MoreOutlined />
    </a>
  )
);

const Post: React.FC<Props> = (props) => {
  const { post, refresh, isSinglePost } = props;
  const [showToast, setShowToast] = React.useState(false);

  const user = getUser() as UserCurrent;

  const handleDelete = () => {
    axiosService
      .delete(`/api/post/${post.id}/`)
      .then(() => {
        setShowToast(true);
        refresh();
      })
      .catch((err) => console.error(err));
  };

  const handleLikeClick = (action: any) => {
    axiosService
      .post(`/api/post/${post.id}/${action}/`)
      .then(() => {
        refresh();
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Card className="rounded-3 my-4">
        <Card.Body>
          <div>
            <Card.Title className="d-flex flex-row justify-content-between">
              <div className="d-flex flex-row">
                <Image
                  src={randomAvatar()}
                  roundedCircle
                  width={48}
                  height={48}
                  className="me-2 border border-primary border-2"
                />
                <div className="d-flex flex-column justify-content-start align-self-center mt-2">
                  <p className="fs-6 m-0">{post.author.username}</p>
                  <p className="fs-6 fw-lighter">
                    <small>{format(post.created)}</small>
                  </p>
                </div>
              </div>
              {user.username === post.author.username && (
                <div>
                  <Dropdown>
                    <Dropdown.Toggle as={MoreToggleIcon}></Dropdown.Toggle>
                    <Dropdown.Menu>
                      <UpdatePost post={post} refresh={refresh} />
                      <Dropdown.Item
                        onClick={handleDelete}
                        className="text-danger"
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              )}
            </Card.Title>
            <Card.Text>{post.body}</Card.Text>
            <div className="d-flex flex-row">
              <LikeFilled
                style={{
                  color: "#fff",
                  backgroundColor: "#0D6EFD",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "75%",
                  padding: "2px",
                  margin: "3px",
                }}
              />
              <p className="ms-1 fs-6">
                <small>{post.likes_count} like</small>
              </p>
            </div>
            {!isSinglePost && (
              <p className="ms-1 fs-6">
                <small>
                  <Link to={`/post/${post.id}/`}>
                    {post.comments_count} comments
                  </Link>
                </small>
              </p>
            )}
          </div>
        </Card.Body>
        <Card.Footer className="d-flex bg-white w-50 justify-content-between border-0">
          <div className="d-flex flex-row">
            <LikeOutlined
              style={{
                width: "24px",
                height: "24px",
                padding: "2px",
                fontSize: "20px",
                color: post.liked ? "#0D6EFD" : "#C4C4C4",
              }}
              onClick={() => {
                if (post.liked) {
                  handleLikeClick("remove_like");
                } else {
                  handleLikeClick("like");
                }
              }}
            />
            <p className="ms-1">
              <small>Like</small>
            </p>
          </div>
          <div className="d-flex flex-row">
            <CommentOutlined
              style={{
                width: "24px",
                height: "24px",
                padding: "2px",
                fontSize: "20px",
                color: "#C4C4C4",
              }}
            />
            <p className="ms-1 mb-0">
              <small>Comment</small>
            </p>
          </div>
        </Card.Footer>
      </Card>
      <Toaster
        title="Success!"
        message="Post deleted 🚀"
        type="danger"
        showToast={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default Post;
