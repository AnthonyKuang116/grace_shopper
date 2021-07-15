import axios from "axios";
async function closeCart(id) {
  // console.log(id);
  try {
    const { data } = await axios.patch(`/api/cart/${id}`);

    return data;
  } catch (error) {
    console.error("Could not close cart!", error);
    throw error;
  }
}

export default closeCart;
