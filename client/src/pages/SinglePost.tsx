import { Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Layout from "../components/Layout";
import CreateComment from "../components/comments/CreateComment";
import Post from "../components/posts/Post";
import { fetcher } from "../helpers/axios";
import Comments from "../components/comments/Comments";

const SinglePost = () => {
  const { postId } = useParams();
  console.log(postId);
  const post = useSWR(`/api/post/${postId}/`, fetcher);
  const comments = useSWR(`/api/post/${postId}/comment/`, fetcher);

  return (
    <Layout hasNavigationBack>
      {post.data ? (
        <Row className="justify-content-center">
          <Col sm={8}>
            <Post post={post.data} refresh={post.mutate} isSinglePost />
            <CreateComment postId={post.data.id} refresh={comments.mutate} />
            {comments.data &&
              comments.data.results.map((comment: any, index: number) => (
                <Comments
                  key={index}
                  postId={post.data.id}
                  comment={comment}
                  refresh={comments.mutate}
                />
              ))}
          </Col>
        </Row>
      ) : (
        <div>Loading...</div>
      )}
    </Layout>
  );
};

export default SinglePost;
