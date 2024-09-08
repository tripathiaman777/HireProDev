import { create } from "zustand";
import axios from "axios";
import {BROWSER_URL} from '../constant/Constant.js'
const API_URL = `${BROWSER_URL}/api/v1/order`;
axios.defaults.withCredentials = true;

export const useCartStore = create((set) => ({
  cart: [],
  addItem: (item) => set((state) => ({ cart: [...state.cart, item] })),
  removeItem: (id) => set((state) => ({ cart: state.cart.filter((item) => item._id !== id) })),
  emptyCart: () => set({ cart: [] }),
}));
