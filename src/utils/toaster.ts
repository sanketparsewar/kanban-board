import { Flip, toast } from "react-toastify";

const successToaster = (msg: string) =>
  toast.success(msg, {
    position: "top-right",
    autoClose: 1500,
    theme: "dark",
    transition: Flip,
  });

export default successToaster;
