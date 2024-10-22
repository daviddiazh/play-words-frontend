
interface OptProps {
  logout: () => Promise<void>;
}

export function useHandleErrors (opt: OptProps) {

  const validate = async (error: any) => {
    if (error?.status === 401 || error?.status === 403) {
      await opt?.logout();
    //   return toast.error(error?.data?.message, {
    //     position: "top-right",
    //     autoClose: 6000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: 'colored',
    //     transition: Bounce,
    //   });
    }
  }

  return {
    validate
  }
}
