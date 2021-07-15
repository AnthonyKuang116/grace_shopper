import axios from "axios";
async function updateProduct(id, category, subCategory, name, description, price, quantity, imgSrc) {
  try {
    const { data } = await axios.patch(`/api/products/${id}`, {category, subCategory, name, description, price, quantity, imgSrc});
    return data;
  } catch (error) {
    console.error("Could not update product!", error);
    throw error;
  }
}

export default updateProduct;
