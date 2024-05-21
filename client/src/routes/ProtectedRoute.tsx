import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../hooks/user.actions";

type Props = {
  children: React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  const user = getUser();
  return user ? <>{children}</> : <Navigate to="/login/" />;
}

export default ProtectedRoute;
