"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

interface ReduxWrapperProps {
  children: React.ReactNode;
}

const ReduxWrapper: React.FC<ReduxWrapperProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxWrapper;
