import React, { ForwardedRef } from "react";
import { MoreOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

interface MoreToggleIconProps {
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

const MoreToggleIcon = React.forwardRef<HTMLAnchorElement, MoreToggleIconProps>(
  ({ onClick }: MoreToggleIconProps, ref: ForwardedRef<HTMLAnchorElement>) => (
    <Link
      to="#"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      <MoreOutlined />
    </Link>
  )
);

export default MoreToggleIcon;
