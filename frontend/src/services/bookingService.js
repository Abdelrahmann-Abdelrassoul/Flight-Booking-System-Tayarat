import apiClient, { extractErrorMessage } from "./apiClient";

export async function createBooking({ flightId, numberOfSeats }) {
  try {
    const { data } = await apiClient.post("/bookings", { flightId, numberOfSeats });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Unable to create booking."));
  }
}

export async function getMyBookings() {
  try {
    const { data } = await apiClient.get("/bookings/my-bookings");
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Unable to load your bookings."));
  }
}

export async function cancelBooking(id) {
  try {
    const { data } = await apiClient.put(`/bookings/${id}`);
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Unable to cancel this booking."));
  }
}

