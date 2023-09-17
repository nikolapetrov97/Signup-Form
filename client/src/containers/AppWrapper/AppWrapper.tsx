import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../../components/Toast";

const AppWrapper = ({ children }: { children: any }) => {
  return (
    <>
      <ToastContainer />
      <Toast>{children}</Toast>
    </>
  );
};

export default AppWrapper;
