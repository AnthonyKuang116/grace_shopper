import axios from "axios";
async function createCart(userId) {
  try {
    const { data } = await axios.post(`/api/cart/`, {
      userId,
    });
    return data;
  } catch (error) {
    console.error("Could create cart!", error);
    throw error;
  }
}

export default createCart;
