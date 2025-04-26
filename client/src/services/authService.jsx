import axios from "axios";
const API_URl  = import.meta.env.VITE_API_URI

const API = `${API_URl}api/auth`;

export const registerUser = async (formData) => {
  try {
    const res = await axios.post(`${API}/register`, formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const res = await axios.post(`${API}/login`, formData);
    return res.data;
  } catch (error) {
    throw error
  }
};
