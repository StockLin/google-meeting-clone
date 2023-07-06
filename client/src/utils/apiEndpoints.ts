import axios from "axios";

export const BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Access-Control-Allow-Origin": "*" },
});

export const createMeeting = (payload: { id?: string; signalData: any }) =>
  axios.post("/call", payload);

export const getMeeting = (id?: string) => api.get(`/call/${id}`);
