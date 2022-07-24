import axios from "axios";
const instance = axios.create({
  // baseUrl: "http://localhost:5005/amazn-shop/us-central1/api",
  baseUrl: "https://us-central1-amazn-shop.cloudfunctions.net/api",
});

export default instance;
