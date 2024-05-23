import Navigationbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navigationbar />
      <div className="container m-5">{children}</div>
    </div>
  );
};

export default Layout;
