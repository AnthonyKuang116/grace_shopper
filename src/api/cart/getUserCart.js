import axios from "axios";
async function getUserCart(userId) {
    try {
        const { data } = await axios.get(`/api/cart/${userId}`);
        return data;
    } catch (error) {
        console.error("Could not grab user's cart!", error);
        throw error;
    }
}

export default getUserCart;