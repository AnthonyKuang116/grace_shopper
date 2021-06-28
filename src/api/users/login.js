import axios from "axios";
async function login(username, password) {
  try {
    const { data } = await axios.post(`/api/users`, { username, password });
    return data;
  } catch (error) {
    throw error;
  }
}
export default login;
