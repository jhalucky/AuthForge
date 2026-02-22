import axios from "axios";

let PUBLIC_KEY = "";
let BASE_URL = "http://localhost:4000";

export const AuthForge = {

  init: (config: {
    publicKey: string,
    baseUrl?: string
  }) => {

    PUBLIC_KEY = config.publicKey;

    if (config.baseUrl)
      BASE_URL = config.baseUrl;
  },

  signup: async (email: string, password: string) => {

    const res = await axios.post(`${BASE_URL}/auth/signup`, {
      email,
      password
    }, {
      headers: {
        "x-public-key": PUBLIC_KEY
      }
    });

    localStorage.setItem("authforge_token", res.data.token);

    return res.data;
  },

  login: async (email: string, password: string) => {

    const res = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password
    }, {
      headers: {
        "x-public-key": PUBLIC_KEY
      }
    });

    localStorage.setItem("authforge_token", res.data.token);

    return res.data;
  },

  logout: () => {

    localStorage.removeItem("authforge_token");

  },

  getToken: () => {

    return localStorage.getItem("authforge_token");

  },

  getUser: async () => {

    const token = AuthForge.getToken();

    if (!token) return null;

    const res = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data.user;
  }

};