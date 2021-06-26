import axios from "axios";
async function removeProductFromCart(userId) {
    try {
        const { data } = await axios.delete(`/api/cart/${userId}`);
        return data;
    } catch (error) {
        console.error("Could not remove product from cart!", error);
        throw error;
    }
}

export default removeProductFromCart;