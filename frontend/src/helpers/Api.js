import axios from "axios";

export const createProduct = async (body) =>
  await axios.post("http://localhost:8000/api/product", body);

export const getProducts = async () =>
  await axios.get("http://localhost:8000/api/products");

export const removeProduct = async (_id) =>
  await axios.delete(`http://localhost:8000/api/product/${_id}`);

export const updateProduct = async (_id, body) =>
  await axios.put(`http://localhost:8000/api/product/${_id}`, body);

export const readProduct = async (_id) =>
  await axios.get(`http://localhost:8000/api/product/${_id}`);
