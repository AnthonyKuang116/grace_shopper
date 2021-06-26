import axios from "axios";
async function updateCartQuantity(id, quantity) {
  try {
    const { data } = await axios.patch(`/api/cart/${id}/${quantity}`);
    return data;
  } catch (error) {
    console.error("Could not update cart!", error);
    throw error;
  }
}

export default updateCartQuantity;
