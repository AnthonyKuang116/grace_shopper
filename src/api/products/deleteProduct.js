import axios from "axios";
async function deleteProduct(id) {
  try {
    const { data } = await axios.delete(`/api/products/${id}`);
    return data;
  } catch (error) {
    console.error("Could not delete product!", error);
    throw error;
  }
}
export default deleteProduct;
