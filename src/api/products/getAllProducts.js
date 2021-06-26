import axios from "axios";
async function getAllProducts() {
    try {
        const { data } = await axios.get("/api/products");
        return data;
    } catch (error) {
        console.error("Could not grab all products", error);
        throw error;
    }
}

export default getAllProducts;