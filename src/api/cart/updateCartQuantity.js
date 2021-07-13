import axios from "axios";
async function updateCartQuantity(userId, productId, quantity) {
  try {
    const { data } = await axios.patch(`/api/cart/${productId}/${quantity}`, {
      userId,
    });
    return data;
  } catch (error) {
    console.error("Could not update cart!", error);
    throw error;
  }
}

export default updateCartQuantity;
