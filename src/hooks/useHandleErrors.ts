import { Bounce, toast } from "react-toastify";

interface OptProps {
  logout: () => Promise<void>;
}

export function useHandleErrors (opt: OptProps) {
  const validate = async (error: any) => {
    console.log({ error })
    if (error?.statusCode === 401 || error?.statusCode === 403 || error?.code === 401) {
      await opt?.logout();
    }

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
  }

  return {
    validate
  }
}
