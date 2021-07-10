import axios from "axios";
async function addProductToCart(productId, quantity, userId, price) {
  console.log(productId, quantity, userId, price);
  try {
    const { data } = await axios.post(`/api/cart/${productId}/${quantity}`, {
      userId,
      price,
    });
    return data;
  } catch (error) {
    console.error("Could not add product to cart!", error);
    throw error;
  }
}

export default addProductToCart;
