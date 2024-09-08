import { create } from "zustand";
import axios from "axios";
import {BROWSER_URL} from '../constant/Constant.js'
const API_URL = `${BROWSER_URL}/api/v1/product`;
axios.defaults.withCredentials = true;

export const useProductStore = create((set) => ({
  products: null,
  productsLoading: false,
  error: null,
  getAllProducts: async () => {
    try {
      set({ productsLoading: true });
      const response = await axios.get(`${API_URL}/getAllProducts`);
      set({ products: response.data.products, productsLoading: false });
    } catch (error) {
      set({
        error: error.response.data.message,
        productsLoading: false,
      });
    }
  },
  createProduct: async (productData) => {
    try {
      set({ productsLoading: true });
      const response = await axios.post(
        `${API_URL}/createProduct`,
        productData
      );
      set({
        products: [...products, response.data.product],
        productsLoading: false,
      });
    } catch (error) {
      set({
        error: error.response.data.message,
        productsLoading: false,
      });
    }
  },
  editProduct: async (productId, productData) => {
    try {
      set({ productsLoading: true });
      const response = await axios.put(
        `${API_URL}/editProduct/${productId}`,
        productData
      );
      set({ products: [...products, response.data.product] });
    } catch (error) {
      set({
        error: error.response.data.message,
        productsLoading: false,
      });
    }
  },
  deleteProduct: async (productId) => {
    try {
      set({ productsLoading: true });
      const response = await axios.delete(
        `${API_URL}/deleteProduct/${productId}`
      );
      set({
        products: [...products, response.data.product],
        productsLoading: false,
      });
    } catch (error) {
      set({ error: error.response.data.message, productsLoading: false });
    }
  },
}));
