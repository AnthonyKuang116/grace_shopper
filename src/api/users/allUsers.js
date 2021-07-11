import axios from "axios";
async function allUsers() {
    try {
        const response  = await axios.get("/api/users");
        return response.data.users;
    } catch (error) {
        throw error;
    }
}

export default allUsers;
