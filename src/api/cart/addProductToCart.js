import axios from "axios";
async function addProductToCart(userId, quantity) {
    try {
        const { data } = await axios.post(`/api/cart/${userId}/${quantity}`);
        return data;
    } catch (error) {
        console.error("Could not add product to cart!", error);
        throw error;
    }
}

export default addProductToCart;