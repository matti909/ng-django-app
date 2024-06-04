import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helpers/axios";
import Layout from "../components/Layout";
import { Col, Row } from "react-bootstrap";
import ProfileDetails from "../components/profile/ProfileDetails";
import Post from "../components/posts/Post";

const Profile = () => {
  const { profileId } = useParams();

  const user = useSWR(`/api/user/${profileId}/`, fetcher);

  const posts = useSWR(`/api/post/?author__public_id=${profileId}`, fetcher, {
    refreshInterval: 500000,
  });

  return (
    <Layout hasNavigationBack>
      <Row className="justify-content-evenly">
        <Col sm={9}>
          <ProfileDetails user={user.data} />
          <div>
            <Row className="my-4">
              {posts.data?.results.map((post: any, index: number) => (
                <Post key={index} post={post} refresh={posts.mutate} />
              ))}
            </Row>
          </div>
        </Col>
      </Row>
    </Layout>
  );
};

export default Profile;
