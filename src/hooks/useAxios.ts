import { AxiosRequestConfig } from "axios";
import axiosService, { API } from "../api";
import { useHandleErrors } from "./useHandleErrors";

interface OptProps {
  logout: () => Promise<void>;
}

export const useAxios = (opt: OptProps) => {

  const { validate } = useHandleErrors(opt);

  const get = async (endpoint: string): Promise<any> => {
    try {
      const data = await axiosService.get(
        endpoint,
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        validate(error.response);
      } else {
        console.error('Server Error: ', error);
      }
    }
  }

  const post = async (endpoint: string, body?: any, config?: AxiosRequestConfig<any> | undefined): Promise<any> => {
    try {
      const data = await axiosService.post(
        endpoint,
        body,
        config,
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        validate(error.response);
      } else {
        console.error('Server Error: ', error);
      }
      throw error
    }
  }

  const put = async (endpoint: string, body?: any, config?: AxiosRequestConfig<any> | undefined): Promise<any> => {
    try {
      const data = await axiosService.put(
        endpoint,
        body,
        config,
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        validate(error.response);
      } else {
        console.error('Server Error: ', error);
      }
    }
  }

  const patch = async (endpoint: string, body?: any, config?: AxiosRequestConfig<any> | undefined): Promise<any> => {
    try {
      const data = await axiosService.patch(
        endpoint,
        body,
        config,
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        validate(error.response);
      } else {
        console.error('Server Error: ', error);
      }
    }
  }

  const remove = async (endpoint: string, config?: AxiosRequestConfig<any> | undefined): Promise<any> => {
    try {
      const data = await axiosService.delete(
        endpoint,
        config,
      );
      return data;
    } catch (error: any) {
      if (error.response) {
        validate(error.response);
      } else {
        console.error('Server Error: ', error);
      }
    }
  }

  const stream = async (prompt: string) => {
    try {
      const response = await fetch(`${API.baseUrl}/api/conversation/prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.body) throw new Error('ReadableStream not supported');
      return response;
    } catch (error: any) {
      if (error.response) {
        validate(error.response);
      } else {
        console.error('Server Error: ', error);
      }
    }
  }

  return {
    get,
    post,
    put,
    patch,
    remove,
    stream
  }
}
