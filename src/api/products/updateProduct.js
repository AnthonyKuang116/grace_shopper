import axios from "axios";
// async function updateProduct(id, fields = {}) {
async function updateProduct(id, category, subCategory, name, description, price, quantity, imgSrc) {
  try {
    const { data } = await axios.patch(`/api/products/${id}/${category}/${subCategory}/${name}/${description}/${price}/${quantity}/${imgSrc}`);
    // const { data } = await axios.patch(`/api/products/${id}/${fields}`);
    return data;
  } catch (error) {
    console.error("Could not update product!", error);
    throw error;
  }
}

export default updateProduct;
