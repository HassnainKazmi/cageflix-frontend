import axiosInstance from "./axios";
import { isAxiosError } from "axios";

export const fetchFuzzySearch = async (text: string) => {
  try {
    const response = await axiosInstance.get("/search", { params: { text } });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(
        error.response?.data?.detail || "Failed to fetch search results"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};
