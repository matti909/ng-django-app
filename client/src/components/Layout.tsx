import React, { createContext, useMemo, useState, ReactNode } from "react";
import Navigationbar from "./Navbar";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Toaster from "./Toaster";

interface ToasterState {
  title: string;
  show: boolean;
  message: string;
  type: string;
}

interface ContextProps {
  toaster: ToasterState;
  setToaster: React.Dispatch<React.SetStateAction<ToasterState>>;
}

export const Context = createContext<ContextProps | undefined>(undefined);

interface LayoutProps {
  children: ReactNode;
  hasNavigationBack?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hasNavigationBack }) => {
  const navigate = useNavigate();
  const [toaster, setToaster] = useState<ToasterState>({
    title: "",
    show: false,
    message: "",
    type: "",
  });

  const value = useMemo(() => ({ toaster, setToaster }), [toaster]);

  return (
    <Context.Provider value={value}>
      <div>
        <Navigationbar />
        {hasNavigationBack && (
          <ArrowLeftOutlined
            style={{
              color: "#0D6EFD",
              fontSize: "24px",
              marginLeft: "5%",
              marginTop: "1%",
            }}
            onClick={() => navigate(-1)}
          />
        )}
        <div className="container my-2">{children}</div>
      </div>
      <Toaster
        title={toaster.title}
        message={toaster.message}
        type={toaster.type}
        showToast={toaster.show}
        onClose={() => setToaster({ ...toaster, show: false })}
      />
    </Context.Provider>
  );
};

export default Layout;
