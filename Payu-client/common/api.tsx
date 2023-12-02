"use client";
import axios from "axios";
const apiClient = axios.create({
  baseURL: "http://localhost:3030",
  headers: {
    "Content-Type": "application/json",
  },
});
export default apiClient;
