import axios from "axios";
async function login(username, password) {
  try {
    const { data } = await axios.get("/api/users/login", { username, password });
    return data;
  } catch (error) {
    throw error;
  }
}

export default login;
