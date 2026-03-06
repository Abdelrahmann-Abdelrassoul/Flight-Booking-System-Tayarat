import apiClient, { extractErrorMessage } from "./apiClient";

export async function loginRequest({ email, password }) {
  try {
    const { data } = await apiClient.post("/users/login", { email, password });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Unable to login. Please check your credentials."));
  }
}

export async function registerRequest({ name, email, password }) {
  try {
    const { data } = await apiClient.post("/users/register", { name, email, password });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Unable to register. Please check your details."));
  }
}

export async function verifyEmailRequest({ email, verificationCode }) {
  try {
    const { data } = await apiClient.post("/users/verify-email", { email, verificationCode });
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Unable to verify email. Please check the code and try again."));
  }
}

export async function getProfile() {
  try {
    const { data } = await apiClient.get("/users/profile");
    return data;
  } catch (error) {
    throw new Error(extractErrorMessage(error, "Unable to load profile."));
  }
}

