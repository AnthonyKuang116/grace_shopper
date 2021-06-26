import axios from "axios";
async function updateProduct(id) {
  try {
    const { data } = await axios.patch(`/api/products/${id}`);
    return data;
  } catch (error) {
    console.error("Could not update product!", error);
    throw error;
  }
}

export default updateProduct;
