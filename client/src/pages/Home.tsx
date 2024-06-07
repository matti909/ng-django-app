import { Col, Image, Row } from "react-bootstrap";
import useSWR from "swr";
import Layout from "../components/Layout";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import ProfileCard from "../components/profile/ProfileCard";
import { fetcher } from "../helpers/axios";
import { randomAvatar } from "../helpers/utils";
import { getUser } from "../hooks/user.actions";
import type { UserCurrent } from "../types";

const HomePage = () => {
  const posts = useSWR("/api/post/", fetcher, {
    refreshInterval: 5000000,
  });

  const profiles = useSWR("/api/user/?limit=5", fetcher);

  const user = getUser() as UserCurrent;

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
        <Col sm={3} className="border rounded py-4 h-50">
          <h4 className="font-weight-bold text-center">Suggested people</h4>
          <div className="d-flex flex-column">
            {profiles.data &&
              profiles.data.results.map((profile: any, index: number) => (
                <ProfileCard key={index} user={profile} />
              ))}
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default HomePage;
