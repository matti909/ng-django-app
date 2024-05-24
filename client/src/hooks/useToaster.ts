import { useContext } from "react";
import { Context } from "../components/Layout";

const useToaster = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useToaster debe ser usado dentro de un AuthProvider");
  }
  return context;
};

export { useToaster };
