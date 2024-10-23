import { Bounce, toast } from "react-toastify";

interface OptProps {
  logout: () => Promise<void>;
}

export function useHandleErrors (opt: OptProps) {
  const validate = async (error: any) => {
    console.log({ error })
    toast.error(error?.message || error?.error?.description, {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Bounce,
    });
    if (error?.statusCode === 401 || error?.statusCode === 403 || error?.code === 401) {
      await opt?.logout();
    }
  }

  return {
    validate
  }
}
