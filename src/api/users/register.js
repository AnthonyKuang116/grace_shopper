import axios from "axios";
async function register(username, password, email) {
  try {
    const { data } = await axios.post("/api/users/register", {
      username,
      password,
      email
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export default register;
