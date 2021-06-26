const { client, getAllProducts } = require("./index");

const { populateInitialData, buildDb, modifyCarts } = require("./seed");

async function buildTables() {
  try {
    console.log("Connecting to client...");
    client.connect();
    console.log("Client connected!");

    console.log("Starting to drop tables...");
    await client.query(`
            DROP TABLE IF EXISTS line_items;
            DROP TABLE IF EXISTS cart;
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS users;
        `);
    console.log("Finished dropping tables!");

    console.log("Starting to create tables...");
    await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                admin BOOLEAN DEFAULT false
            );

            CREATE TABLE products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category VARCHAR(255) NOT NULL,
                "subCategory" VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price DECIMAL NOT NULL,
                quantity INTEGER NOT NULL,
                "imgSrc" TEXT 
            );

            CREATE TABLE cart(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id),
                "isActive" BOOLEAN DEFAULT true,
                "purchaseDate" DATE DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE line_items(
                id SERIAL PRIMARY KEY,
                "cartId" INTEGER REFERENCES cart(id),
                "productId" INTEGER REFERENCES products(id),
                quantity INTEGER NOT NULL,
                price DECIMAL NOT NULL
            );
        `);
    console.log("Finished creating tables!");
  } catch (error) {
    console.log("Error in creating tables!");
    throw error;
  }
}

async function testDb() {
  try {
    console.log("Starting to test database...");
    console.log("Calling getAllProducts...");
    const products = await getAllProducts();
    console.log("Results:", products);
  } catch (error) {
    console.log("Error during testDb");
    throw error;
  }
}

buildTables()
  .then(buildDb)
  .then(modifyCarts)
  .catch(console.error)
  .finally(() => {
    console.log("ending client");
    client.end();
  });
