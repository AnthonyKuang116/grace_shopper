const { Client } = require("pg");

const DB_NAME = "shopper-dev";
const DB_URL = process.env.DATABASEURL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);

async function createUser({ username, password }) {
    try {
        const { rows: [user] } = await client.query(`
            INSERT into users(username, password)
            VALUES ($1, $2)
            RETURNING *;
        `, [username, password]);

        await createCart(user.id);

        return user;
    } catch (error) {
        console.error("Create user error!", error);
        throw error;
    }
}

async function createCart(userId) {
    try {
        const { rows: [cart] } = await client.query(`
            INSERT INTO cart ("userId")
            VALUES ($1)
            RETURNING  *;
        `, [userId]);

        return cart;
    } catch (error) {
        console.error("Could not create cart!", error);
        throw error;
    }
}

async function getUserCart(userId) {
    try {
        const { rows: [cart] } = await client.query(`
            SELECT * FROM cart
            WHERE ("userId"=$1 AND "isActive"=true);
        `, [userId]);

        return cart;
    } catch (error) {
        console.error("Could not grab cart!", error);
        throw error;
    }
}

async function removeCart(id) {
    try {
        const { rows: [cart] } = await client.query(`
            UPDATE cart
            SET "isActive=false
            WHERE id=$1;
        `, [id])

        return cart;
    } catch (error) {
        console.error("Could not remove cart!", error);
        throw error;
    }
}

//createCart and removeCart functions...
//createCart into createUser for initial cart

async function getUserById(id) {
    try {
        const { rows: [user] } = await client.query(`
            SELECT id, name, password, email, guest, admin
            FROM users
            WHERE id=$1;
        `, [id]);

        if (!user) {
            return null;
        }

        return user;
    } catch (error) {
        console.error("Could not grab user ID!", error);
        throw error;
    }
}

/**
 * 
 * Probably don't need this function since we're already grabbing by ID
 * 
 */

// async function getUserByUsername(username){
//     try {
//         const { rows: [user] } = client.query(`

//         `)
//     } catch(error) {
//         console.error("Could not grab username!", error);
//         throw error;
//     }
// }

async function getAllUsers() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM users;
        `);

        return rows;
    } catch (error) {
        console.error("Cannot grab users!", error);
        throw error;
    }
}

async function deleteProduct(id) {
    try {
        await client.query(`
            DELETE FROM products
            WHERE id=$1;
        `, [id]);

        return await getAllProducts();
    } catch (error) {
        console.error("Could not delete product!", error);
        throw error;
    }
}

async function updateProduct(id, fields = {}) {
    try {
        const setString = Object.keys(fields).map(
            (key, index) => `"${key}"=$${index + 1}`
        ).join(', ');

        if (setString.length === 0) {
            return;
        }

        const { rows: [product] } = await client.query(`
            UPDATE products
            SET ${setString}
            WHERE id=${id}
        `, Object.values(fields));

        return product;
    } catch (error) {
        console.error("Could not update product!", error);
        throw error;
    }
}

async function createProduct({ name, description, price, quantity, imgSrc }) {
    try {
        const { rows: [product] } = await client.query(`
            INSERT INTO products(name ,description, price, quantity, "imgSrc")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [name, description, price, quantity, imgSrc]);

        return product;
    } catch (error) {
        console.error("Could not create product!", error);
        throw error;
    }
}

async function getAllProducts() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM products;
        `)

        return rows;
    } catch (error) {
        console.error("Could not grab products!", error);
        throw error;
    }
}

async function emptyCart(userId) {
    try {
        await client.query(`
            DELETE FROM cart
            WHERE "userId"=$1;
        `, [userId]);

        return await getUserCart();
    } catch (error) {
        console.error("Could not empty cart!", error);
        throw error;
    }
}

async function removeProductFromCart(id) {
    try {
        await client.query(`
            DELETE FROM cart
            WHERE "id"=$1;
        `, [id]);

        return await getUserCart();
    } catch (error) {
        console.error("Could not remove product!", error);
        throw error;
    }
}

// async function updateCartQuantity(id, user, quantity) {
//     try {

//     } catch (error) {
//         console.error("Could not update quantity!", error);
//         throw error;
//     }
// }

async function increaseCartQuantity(id) {
    try {
        const { rows: { quantity } } = await client.query(`
            UPDATE cart
            SET quantity = cart.quantity + 1
            WHERE id=$1;
        `, [id]);

        return quantity;
    } catch {
        console.error("Could not increase the quantity of this item!", error);
        throw error;
    }
}

async function decreaseCartQuantity(id) {
    try {
        const { rows: { quantity } } = await client.query(`
            UPDATE cart
            SET quantity = cart.quantity - 1;
            WHERE id=$1;
        `, [id]);

        return quantity;
    } catch {
        console.error("Could not decrease the quantity of this item!", error);
        throw error;
    }
}

async function addProductToCart({ userId, productId, item, quantity, price, imgSrc }) {
    try {
        const { rows: [product] } = await client.query(`
            INSERT INTO cart "userId", "productId", item, quantity, price, "imgSrc"
            VALUES ($1, $2, $3, $4, $5, $6,)
            RETURNING *;
        `, [userId, productId, item, quantity, price, imgSrc]);

        return product;
    } catch (error) {
        console.error("Could not add item to cart!", error);
        throw error;
    }
}



module.exports = {
    client,
    createUser,
    getUserById,
    getAllUsers,
    deleteProduct,
    updateProduct,
    createProduct,
    getAllProducts,
    emptyCart,
    removeProductFromCart,
    // updateCartQuantity,//incomplete...perhaps an increaseCartQuantity and decreaseCartQuantity?
    increaseCartQuantity,
    decreaseCartQuantity,
    addProductToCart,
    getUserCart,
    createCart,
    removeCart
};