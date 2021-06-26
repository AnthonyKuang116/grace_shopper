import axios from "axios";
async function createProduct({ category, subCategory, name, description, price, quantity, imgSrc }) {
    try {
        const { data } = await axios.post("/api/products", {
            category,
            subCategory,
            name,
            description,
            price,
            quantity,
            imgSrc
        });
        return data;
    } catch (error) {
        console.error("Could not create product!", error);
        throw error;
    }
}

export default createProduct;