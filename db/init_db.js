const {
    client
} = require("./index");


async function buildTables() {
    try {
        console.log("Connecting to client...");
        client.connect();
        console.log("Client connected!");

        console.log("Starting to drop tables...");
        await client.query(`
            DROP TABLE IF EXISTS products;
            DROP TABLE IF EXISTS users;
        `);
        console.log("Finished dropping tables!");

        console.log("Starting to create tables...");
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                guest BOOLEAN DEFAULT true,
                admin BOOLEAN DEFAULT false
            );

            CREATE TABLE products(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                price VARCHAR(255) NOT NULL,
                "invQuantity" VARCHAR(255) NOT NULL
            );
        `);
        console.log("Finished creating tables!");
    } catch (error) {
        console.log("Error in creating tables!");
        throw error;
    }
}

buildTables()