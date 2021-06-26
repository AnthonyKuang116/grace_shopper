import axios from "axios";
async function emptyCart() {
    try {
        const { data } = await axios.delete(`/api/cart`);
        return data;
    } catch (error) {
        console.error("Could not empty cart!", error);
        throw error;
    }
}

export default emptyCart;