import { Col, Image, Row } from "react-bootstrap";
import useSWR from "swr";
import Layout from "../components/Layout";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import { fetcher } from "../helpers/axios";
import { randomAvatar } from "../helpers/utils";
import { getUser } from "../hooks/user.actions";

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
          <CreatePost refresh={posts.mutate} />
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
