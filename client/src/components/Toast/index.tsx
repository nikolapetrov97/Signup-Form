/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { toast } from "react-toastify";
import Toasts from "../../utils/Toasts";

const Toast = (props: any) => {
  useEffect(() => {
    Toasts.toast = toast;
  }, []);

  return <>{props.children}</>;
};

export default Toast;
