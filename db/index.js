const { Client } = require("pg");

const DB_NAME = "shopper-dev";
const DB_URL =
  process.env.DATABASEURL || `postgres://localhost:5432/${DB_NAME}`;
const client = new Client(DB_URL);
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
  return hashedPassword;
}

async function createUser({ username, password, email }) {
  const hashedPassword = await hashPassword(password);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            INSERT into users(username, password, email)
            VALUES ($1, $2, $3)
            RETURNING *;
        `,
      [username, hashedPassword, email]
    );

    await createCart(user.id);

    return user;
  } catch (error) {
    console.error("Create user error!", error);
    throw error;
  }
}

async function createCart(userId) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
            INSERT INTO cart ("userId")
            VALUES ($1)
            RETURNING  *;
        `,
      [userId]
    );

    return cart;
  } catch (error) {
    console.error("Could not create cart!", error);
    throw error;
  }
}

async function getUserCart(userId) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
            SELECT * FROM cart
            WHERE ("userId"=$1 AND "isActive"=true);
        `,

      [userId]
    );
    if (cart) {
      const { rows } = await client.query(
        `
            SELECT * FROM line_items
            WHERE ("cartId"=$1 );
        `,

        [cart.id]
      );
      cart.products = rows;
    }

    return cart;
  } catch (error) {
    console.error("Could not grab cart!", error);
    throw error;
  }
}

async function closeCart(id) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
            UPDATE cart
            SET "isActive"=false
            WHERE id=$1;
        `,
      [id]
    );

    return cart;
  } catch (error) {
    console.error("Could not remove cart!", error);
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT id, name, password, email, guest, admin
            FROM users
            WHERE id=$1;
        `,
      [id]
    );

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Could not grab user ID!", error);
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT * FROM users
            WHERE username=$1;
        `,
      [username]
    );

    return user;
  } catch (error) {
    console.error("Could not grab username!", error);
    throw error;
  }
}

const getUser = async ({ username, password }) => {
  const user = await getUserByUsername(username);
  if (!user) {
    return null;
  }
  const hashedPassword = user.password;

  try {
    if (await bcrypt.compare(password, hashedPassword)) {
      delete user.password;
      return user;
    }
  } catch (error) {
    throw error;
  }
};

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
      DELETE FROM line_items
      WHERE "productId"=$1;
    `, [id]);

    await client.query(
      `
            DELETE FROM products
            WHERE id=$1;
        `,
      [id]
    );

    return await getAllProducts();
  } catch (error) {
    console.error("Could not delete product!", error);
    throw error;
  }
}

async function updateProduct(id, fields = {}) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `"${key}"=$${index + 1}`)
      .join(", ");

    if (setString.length === 0) {
      return;
    }

    const {
      rows: [product],
    } = await client.query(
      `
            UPDATE products
            SET ${setString}
            WHERE id=${id}
            RETURNING *;
        `,
      Object.values(fields)
    );

    return product;
  } catch (error) {
    console.error("Could not update product!", error);
    throw error;
  }
}

async function createProduct({
  category,
  subCategory,
  name,
  description,
  price,
  quantity,
  imgSrc,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO products(category, "subCategory", name ,description, price, quantity, "imgSrc")
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `,
      [category, subCategory, name, description, price, quantity, imgSrc]
    );

    return product;
  } catch (error) {
    console.error("Could not create product!", error);
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
            SELECT * FROM products;
        `);

    return products;
  } catch (error) {
    console.error("Could not grab products!", error);
    throw error;
  }
}

async function emptyCart(cartId) {
  try {
    await client.query(
      `
            DELETE FROM line_items
            WHERE ("cartId"=$1 );
        `,
      [cartId]
    );
  } catch (error) {
    console.error("Could not empty cart!", error);
    throw error;
  }
}

async function removeProductFromCart(cartId, productId) {
  try {
    const {
      rows: { deleted },
    } = await client.query(
      `
            DELETE FROM line_items
            WHERE ("cartId"=$1 AND "productId" =$2);
            
        `,
      [cartId, productId]
    );
    return deleted;
  } catch (error) {
    console.error("Could not remove product!", error);
    throw error;
  }
}

async function updateCartQuantity(cartId, productId, quantity) {
  try {
    const {
      rows: { quant },
    } = await client.query(
      `
            UPDATE line_items
            SET quantity=$3
            WHERE ("cartId"=$1 AND "productId"=$2);
        `,
      [cartId, productId, quantity]
    );

    return quant;
  } catch (error) {
    console.error("Could not update quantity!", error);
    throw error;
  }
}

async function increaseCartQuantity(id) {
  try {
    const {
      rows: { quantity },
    } = await client.query(
      `
            UPDATE line_items
            SET quantity = cart.quantity + 1
            WHERE id=$1;
        `,
      [id]
    );

    return quantity;
  } catch {
    console.error("Could not increase the quantity of this item!", error);
    throw error;
  }
}

async function decreaseCartQuantity(id) {
  try {
    const {
      rows: { quantity },
    } = await client.query(
      `
            UPDATE line_items
            SET quantity = cart.quantity - 1;
            WHERE id=$1;
        `,
      [id]
    );

    return quantity;
  } catch {
    console.error("Could not decrease the quantity of this item!", error);
    throw error;
  }
}

async function addProductToCart({ cartId, productId, quantity, price }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
            INSERT INTO line_items ("cartId", "productId", quantity, price)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,
      [cartId, productId, quantity, price]
    );

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
  updateCartQuantity,
  increaseCartQuantity,
  decreaseCartQuantity,
  addProductToCart,
  getUserCart,
  createCart,
  closeCart,
  getUserByUsername,
  getUser,
};
