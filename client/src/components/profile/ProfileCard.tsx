import React from "react";
import { Button, Card, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { randomAvatar } from "../../helpers/utils";
import { UserCurrent } from "../../types";

type Props = {
  user: UserCurrent;
};

const ProfileCard: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const { user } = props;

  const handleNavigateToProfile = () => {
    navigate(`/profile/${user.id}/`);
  };

  return (
    <Card className="border-0 p-2">
      <div className="d-flex ">
        <Image
          src={randomAvatar()}
          roundedCircle
          width={48}
          height={48}
          className="my-3 border border-primary border-2"
        />
        <Card.Body>
          <Card.Title className="fs-6">{user.username}</Card.Title>
          <Button variant="primary" onClick={handleNavigateToProfile}>
            See profile
          </Button>
        </Card.Body>
      </div>
    </Card>
  );
};

export default ProfileCard;
