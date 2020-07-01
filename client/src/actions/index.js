import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
  const res = await axios.post("/api/stripe", token);
  dispatch({ type: FETCH_USER, payload: res.data });
};

// NOTE: Beware of AJAX logout
// 3
// Torleif · Lecture 93 · a year ago
// I see several people putting out code here to handle logging out on the client side via redux etc.

// Be aware that none of them (at least the ones I've seen so far) seem to care about other data loaded into the store. Clearing the auth store tells the app that the user is logged out, yes, but if a user has been logged in, there will be other data loaded in the store. For this app specifically, you'll (eventually) have surveys belonging to the user, status of purchased in-app currency, etc.

// These things should also be cleared out. And a very safe and easy way to do that, is a full browser refresh/redirect.

// If you don't do a full refresh/redirect, you might be setting yourself up for accidental leaking of personal data...

// It might be unlikely that someone gets access to personal data this way, but it is possible, and it's better to be safe than sorry...
