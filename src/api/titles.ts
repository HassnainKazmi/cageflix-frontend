import { isAxiosError } from "axios";
import axiosInstance from "./axios";

export const fetchTitles = async (skip: number = 0, limit: number = 20) => {
  try {
    const response = await axiosInstance.get("/titles", {
      params: { skip, limit },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Titles not found (404)");
      }
      throw new Error(
        error.response
          ? `Request failed with status ${error.response.status}`
          : "Network error, no response received"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const fetchTitleById = async (tconst: string) => {
  try {
    const response = await axiosInstance.get("/title", {
      params: { tconst },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new Error("Title not found (404)");
      }
      throw new Error(
        error.response
          ? `Request failed with status ${error.response.status}`
          : "Network error, no response received"
      );
    }
    throw new Error("An unexpected error occurred");
  }
};
