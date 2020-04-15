import axios from "axios";
import { FETCH_USER, FETCH_BLOGS, FETCH_BLOG } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitBlog = (values, file, history) => async (dispatch) => {
  let res;
  if (file) {
    const { data } = await axios.get("/api/upload");

    const { url, key } = data;
    await axios.put(url, file, {
      headers: {
        "Content-Type": file.type,
      },
    });

    const newValues = { ...values, imageUrl: key };
    res = await axios.post("/api/blogs", newValues);
  } else {
    res = await axios.post("/api/blogs", values);
  }

  history.push("/blogs");
  dispatch({ type: FETCH_BLOG, payload: res.data });
};

export const fetchBlogs = () => async (dispatch) => {
  const res = await axios.get("/api/blogs");

  dispatch({ type: FETCH_BLOGS, payload: res.data });
};

export const fetchBlog = (id) => async (dispatch) => {
  const res = await axios.get(`/api/blogs/${id}`);

  dispatch({ type: FETCH_BLOG, payload: res.data });
};
