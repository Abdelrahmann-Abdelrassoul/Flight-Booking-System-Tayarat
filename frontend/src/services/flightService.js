import apiClient, { extractErrorMessage } from "./apiClient";

export async function getAllFlights() {
  try {
    const { data } = await apiClient.get("/flights");
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Unable to load flights."));
  }
}

export async function searchFlights(params) {
  try {
    const { data } = await apiClient.get("/flights/search", { params });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Unable to search flights."));
  }
}

