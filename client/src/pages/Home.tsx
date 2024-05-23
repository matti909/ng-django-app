import { Col, Row, Image } from "react-bootstrap";
import Layout from "../components/Layout";
import { getUser } from "../hooks/user.actions";
import { randomAvatar } from "../helpers/utils";
import CreatePost from "../components/posts/CreatePost";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import Post from "../components/posts/Post";

const HomePage = () => {
  const posts = useSWR("/api/post/", fetcher, {
    refreshInterval: 10000,
  });

  const user = getUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <Row className="justify-content-evenly">
        <Col sm={7}>
          <Image
            src={randomAvatar()}
            roundedCircle
            width={52}
            height={52}
            className="my-2"
          />
        </Col>
        <Col className="flex-grow-1" sm={10}>
          <CreatePost />
        </Col>
        <Row className="my-4">
          {posts.data?.results.map((post: any, index: any) => (
            <Post key={index} post={post} refresh={posts.mutate} />
          ))}
        </Row>
      </Row>
    </Layout>
  );
};

export default HomePage;
