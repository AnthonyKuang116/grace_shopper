import axios from "axios";
async function removeProductFromCart(userId, productId) {
  console.log(userId, productId);
  try {
    const { data } = await axios.delete(`/api/cart/${productId}`, {
      data: { userId },
    });
    console.log("data", data);

    return data;
  } catch (error) {
    console.error("Could not remove product from cart!", error);
    throw error;
  }
}

export default removeProductFromCart;
