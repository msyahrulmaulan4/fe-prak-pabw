import axios from "axios";
import { setToken, setUser } from "../reducers/authReducer";
import { API_URL } from "../../../config/config";

export const login = (email, password, router) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/api/v1/auth/login`, {
      email,
      password,
    });

    const { data } = response;
    const { token } = data.data;

    dispatch(setToken(token));

    // `  redirect("/");`
    router.push("/");

    // setIsLoading(false);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    }
  }
};

export const profile = () => async (dispatch, getState) => {
  try {
    let { token } = getState().auth;
    const response = await axios.get(`${API_URL}/api/v1/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data } = response.data;

    console.log(data);

    console.log(data.data);

    dispatch(setUser(data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    }
  }
};

export const register =
  (name, email, password, confPassword) => async (dispatch, getState) => {
    try {
      const response = await axios.post(`${API_URL}/api/v1/auth/register`, {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword,
      });

      const { message } = response.data;

      alert(message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
      }
    }
  };

export const verify = (token) => async (dispatch, getState) => {
  try {
    const response = await axios.patch(`${API_URL}/api/v1/auth/verify/${token}`);

    const { message } = response.data;
    alert(message);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response);
    }
  }
};
