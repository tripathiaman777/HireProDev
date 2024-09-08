import { create } from "zustand";
import axios from "axios";
import {BROWSER_URL} from '../constant/Constant.js'
const API_URL = `${BROWSER_URL}/api/v1/order`;
axios.defaults.withCredentials = true;

export const useBillStore = create((set) => ({
  bills: [],
  getBills: async () => {
    const response = await axios.get(`${API_URL}/getAllBills`);
    set({ bills: response.data });
  },
}));
