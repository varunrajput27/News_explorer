
// src/utils/auth.js
import { BASE_URL } from "./constants";
import { jwtDecode } from "jwt-decode"; // ✅ Named import

function processResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(`An error just occurred: ${res.status}`);
}

// ✅ Register
export function register(email, password, name) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  }).then(processResponse);
}

// ✅ Login
export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(processResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
}

// ✅ Decode Token Directly (no extra request needed)
export function getCurrentUser() {
  try {
    const token = localStorage.getItem("jwt");
    if (!token) return null;

    const decoded = jwtDecode(token);
    console.log("✅ Decoded user:", decoded);
    return decoded;
  } catch (err) {
    console.error("❌ Invalid token", err);
    return null;
  }
}

// Optional: Call backend for extra verification
export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(processResponse);
}

