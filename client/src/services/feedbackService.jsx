import axios from "axios";
const API_URl  = import.meta.env.VITE_API_URI

const API = `${API_URl}api/feedback`

export const submitFeedback = async (formData, token) => {
  
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await axios.post(API, formData, config);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllFeedback = async (token, filters = {}) => {
  try {
    const query = new URLSearchParams(filters).toString();
    const res = await axios.get(`${API}?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const commentOnFeedback = async (id, comment, token) => {
  try {
    const res = await axios.patch(
      `${API}/${id}/comment`,
      { comment },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};
