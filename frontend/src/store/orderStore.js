import { create } from "zustand";
import axios from "axios";
import {BROWSER_URL} from '../constant/Constant.js'
const API_URL = `${BROWSER_URL}/api/v1/order`;
axios.defaults.withCredentials = true;

export const useOrderStore = create((set) => ({
  order: [],
  orderProcessing: false,
  emptyOrder: () => set({ order: [] }),
  addItem: (items) =>
    set((state) => {
      const newItems = Array.isArray(items) ? items : [items];
      const existingItemIds = new Set(state.order.map((item) => item._id));

      // Filter out items that are already present
      const filteredItems = newItems.filter(
        (item) => !existingItemIds.has(item._id)
      );

      return { order: [...state.order, ...filteredItems] };
    }),

  removeItem: (id) =>
    set((state) => ({ order: state.order.filter((item) => item._id !== id) })),
  purchaseItem: async (orderItems, totalAmount) => {
    set({ isLoading: true, error: null });
    try {
      console.log(orderItems, totalAmount);
      const response = await axios.post(`${API_URL}/create`, {
        orderItems,
        totalAmount,
      });

      set({
        orderProcessing: true,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error Signing up",
      });
      throw error;
    }
  },
}));
