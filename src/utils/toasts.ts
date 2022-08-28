import { toast, ToastOptions } from "react-toastify";

const config: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

export const toastError = (message: string) => toast.error(message, config);

export const toastSuccess = (message: string) => toast.success(message, config);

export const toastInfo = (message: string) => toast.info(message, config);

export const toastWarning = (message: string) => toast.warning(message, config);
