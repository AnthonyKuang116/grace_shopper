const {
  createProduct,
  addProductToCart,
  createUser,
  emptyCart,
  removeProductFromCart,
  updateCartQuantity,
} = require(".");

const createInitialUsers = async () => {
  console.log("Starting to create users...");
  try {
    const usersToCreate = [
      {
        username: "albert",
        password: "bertie99",
        email: "albert@fakemail.com",
      },
      {
        username: "sandra",
        password: "sandra123",
        email: "sandra@fakemail.com",
      },
      {
        username: "glamgal",
        password: "glamgal123",
        email: "glamgal@fakemail.com",
      },
    ];
    const users = await Promise.all(usersToCreate.map(createUser));

    console.log("Users created:");
    console.log(users);
    console.log("Finished creating users!");
  } catch (error) {
    console.error("Error creating users!");
    throw error;
  }
};

const createInitialProducts = async () => {
  console.log("Starting to create products...");
  try {
    const productsToCreate = [
      {
        category: "Fruits",
        subCategory: "tropical",
        name: "Bananas",
        description:
          "Sold each. Used to elevate dessert and breakfast recipes.",
        price: "0.22",
        quantity: 100,
        imgSrc: "/images/banana.jpg",
      },
      {
        category: "Fruits",
        subCategory: "tropical",
        name: "Mango",
        description: "Sold each. Simply slice them for a healthy snack!",
        price: "0.57",
        quantity: 100,
        imgSrc: "/images/mango.png",
      },
      {
        category: "Fruits",
        subCategory: "subTropical",
        name: "Avocado",
        description:
          "Sold each. Fresh avocados are great for using in avocado dip, salads and guacamole.",
        price: "0.86",
        quantity: 100,
        imgSrc: "/images/avocado.jpg",
      },
      {
        category: "Fruits",
        subCategory: "subTropical",
        name: "Orange",
        description:
          "Sold: Each. Suitable for use in all kinds of sweet and savory dishes.",
        price: "0.84",
        quantity: 100,
        imgSrc: "/images/orange.jpg",
      },
      {
        category: "Fruits",
        subCategory: "small",
        name: "Blueberries",
        description: "Sold by the pint. Healthy sweet treat.",
        price: "2.88",
        quantity: 100,
        imgSrc: "/images/blueberries.jpg",
      },
      {
        category: "Fruits",
        subCategory: "small",
        name: "Strawberries",
        description:
          "Sold by the pound. Prior to serving gently wash them and remove leafy cap.",
        price: "1.64",
        quantity: 100,
        imgSrc: "/images/strawberries.jpg",
      },
      {
        category: "Fruits",
        subCategory: "stone",
        name: "Apricots",
        description: "Sold by the pound. Wonderfully smooth and sweet flavor.",
        price: "3.12",
        quantity: 100,
        imgSrc: "/images/apricots.jpg",
      },
      {
        category: "Fruits",
        subCategory: "stone",
        name: "Cherries",
        description:
          "Sold by the pound. Bursting with antioxidants, phytochemicals, vitamins, nutrients, and fiber.",
        price: "2.97",
        quantity: 100,
        imgSrc: "/images/cherries.jpg",
      },
      {
        category: "Fruits",
        subCategory: "pome",
        name: "Apple",
        description:
          "Sold each. Red Delicious Apple. Classic sweet flavor and are crisp and juicy with higher antioxidants due to the rich deep red skin.",
        price: "0.80",
        quantity: 100,
        imgSrc: "/images/apple.jpg",
      },
      {
        category: "Fruits",
        subCategory: "pome",
        name: "Pear",
        description:
          "Sold each. Signature sweet pear flavor and aroma with abundant juice.",
        price: "1.11",
        quantity: 100,
        imgSrc: "/images/pear.jpg",
      },
      {
        category: "Fruits",
        subCategory: "melons",
        name: "Cantaloupe",
        description:
          "Sold each. Enjoy on its own or add to a mixed fruit salad.",
        price: "1.78",
        quantity: 100,
        imgSrc: "/images/cantaloupe.jpg",
      },
      {
        category: "Fruits",
        subCategory: "melons",
        name: "Watermelon",
        description: "Sold each. Sweet, refreshing treat.",
        price: "3.98",
        quantity: 100,
        imgSrc: "/images/watermelon.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Fungi",
        name: "Portabellas",
        description:
          "Sold by 8oz containers. Sliced. Excellent addition to beef, wild game and vegetable dishes.",
        price: "2.18",
        quantity: 100,
        imgSrc: "/images/portobello.png",
      },
      {
        category: "Vegetables",
        subCategory: "Fungi",
        name: "White Mushrooms",
        description:
          "Sold by 8oz containers. Sliced. Mince them for an omelet, add them to a salad, or cover them with cheese.",
        price: "1.98",
        quantity: 100,
        imgSrc: "/images/white-mushroom.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Root",
        name: "Carrots",
        description:
          "Sold in 1 pound bags. Ideal for use with dips and dressings.",
        price: "0.67",
        quantity: 100,
        imgSrc: "/images/carrots.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Root",
        name: "Beets",
        description:
          "Sold by the bunch. Serve in a salad or reheat as a side dish.",
        price: "2.24",
        quantity: 100,
        imgSrc: "/images/beets.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Root",
        name: "Potato",
        description:
          "Sold each. Great for potato salad or homestyle French fries",
        price: "0.62",
        quantity: 100,
        imgSrc: "/images/potato.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Root",
        name: "Sweet Potato",
        description:
          "Sold each. Make seasoned sweet potato fries or a flavorful hummus dip.",
        price: "0.78",
        quantity: 100,
        imgSrc: "/images/sweet-potato.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Bulbs",
        name: "Garlic",
        description:
          "Sold each (1 bulb). Add to pasta, shrimp, chicken, stews & more.",
        price: "0.43",
        quantity: 100,
        imgSrc: "/images/garlic.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Bulbs",
        name: "Red Onion",
        description: "Sold each. Use in sauces, soups, stir fries & gumbo.",
        price: "0.78",
        quantity: 100,
        imgSrc: "/images/red-onion.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Other",
        name: "Ginger Root",
        description: "Sold by the pound. Peppery, pungent, zesty flavor.",
        price: "2.98",
        quantity: 100,
        imgSrc: "/images/ginger-root.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Seeded",
        name: "Squash",
        description:
          "Sold each.Roast the whole squash for a simple and flavorful side dish.",
        price: "4.13",
        quantity: 100,
        imgSrc: "/images/squash.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Seeded",
        name: "Cucumber",
        description: "Sold each. Crisp, delicious, and refreshing.",
        price: "0.62",
        quantity: 100,
        imgSrc: "/images/cucumber.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Seeded",
        name: "Tomatoe",
        description: "Sold each. Enjoy on burgers, sandwiches and more.",
        price: "0.86",
        quantity: 100,
        imgSrc: "/images/tomato.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Seeded",
        name: "Pepper",
        description:
          "Sold each. Dice peppers and put them in a hearty chili or slice them and add them to a deli sandwich.",
        price: "0.78",
        quantity: 100,
        imgSrc: "/images/pepper.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Herbs",
        name: "Basil",
        description:
          "Sold in 0.75oz containers. Fragrant and robustly flavored.",
        price: "1.98",
        quantity: 100,
        imgSrc: "/images/basil.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Herbs",
        name: "Cilantro",
        description:
          "Sold by the bunch. Adds zesty flavor to tacos, salsa, guacamole, curries, stir-fries and more.",
        price: "0.78",
        quantity: 100,
        imgSrc: "/images/cilantro.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "RowCrops",
        name: "Artichoke",
        description:
          "Sold each. Can be boiled, grilled, braised, or stuffed and baked.",
        price: "2.28",
        quantity: 100,
        imgSrc: "/images/artichoke.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "RowCrops",
        name: "Broccoli",
        description:
          "Sold by the pound. Delicious when steamed, oven roasted, pan fried, or added to a stir fry or salad.",
        price: "1.48",
        quantity: 100,
        imgSrc: "/images/broccoli.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "RowCrops",
        name: "Asparagus",
        description:
          "Sold by the bunch. Saute them with olive oil, salt, pepper, and a hint of lemon juice for a healthy and flavorful vegetable side that will pair well with a wide array of main dishes.",
        price: "1.98",
        quantity: 100,
        imgSrc: "/images/asparagus.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "RowCrops",
        name: "Celery",
        description: "Sold by the package. Add to salads, stir fry, and soup.",
        price: "1.42",
        quantity: 100,
        imgSrc: "/images/celery.png",
      },
      {
        category: "Vegetables",
        subCategory: "RowCrops",
        name: "Lettuce",
        description:
          "Sold each. Use it as a garnish or to make your salad of choice.",
        price: "1.48",
        quantity: 100,
        imgSrc: "/images/lettuce.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "RowCrops",
        name: "Baby Spinach",
        description:
          "Sold in 1 pound containers. Use it as a topping on sandwiches and pizzas, or simply enjoy it as a healthy side.",
        price: "3.66",
        quantity: 100,
        imgSrc: "/images/spinach.jpg",
      },
    ];
    console.log("products:", productsToCreate);
    await Promise.all(productsToCreate.map(createProduct));
    console.log("Finished creating products!");
  } catch (error) {
    console.error("Error creating products!");
    throw error;
  }
};

const createInitialCarts = async () => {
  try {
    console.log("Adding products to carts...");
    const productsToAdd = [
      { cartId: 1, productId: 3, quantity: 5, price: 0.86 },
      { cartId: 1, productId: 2, quantity: 4, price: 0.57 },
      { cartId: 1, productId: 1, quantity: 3, price: 0.22 },
      { cartId: 2, productId: 7, quantity: 8, price: 3.12 },
      { cartId: 2, productId: 6, quantity: 4, price: 1.64 },
      { cartId: 2, productId: 5, quantity: 5, price: 2.88 },
      { cartId: 3, productId: 25, quantity: 13, price: 0.78 },
      { cartId: 3, productId: 16, quantity: 30, price: 2.24 },
      { cartId: 3, productId: 9, quantity: 22, price: 0.8 },
    ];
    const carts = await Promise.all(productsToAdd.map(addProductToCart));
    console.log("Carts created:");
    console.log(carts);
    console.log("Products added to carts!");
  } catch (error) {
    console.log("Error adding products!");
    throw error;
  }
};
const modifyCarts = async () => {
  try {
    console.log("Updating product #3 quantity in cart 1...");

    await updateCartQuantity(1, 3, 15);
    // cartId, productId, quant
    console.log("Product #3 quantity updated to 15 in cart 1!");
  } catch (error) {
    console.log("Error updating quantity!");
    throw error;
  }
  try {
    console.log("Removing product #7 from cart 2...");
    await removeProductFromCart(2, 7);
    console.log("Product #7 removed!");
  } catch (error) {
    console.log("Error removing product!");
    throw error;
  }
  try {
    console.log("Emptying cart 3...");
    await emptyCart(3);
    console.log("Cart 3 emptied!");
  } catch (error) {
    console.log("Error emptying cart!");
    throw error;
  }
};

const buildDb = async () => {
  await createInitialUsers();
  await createInitialProducts();
  await createInitialCarts();
};
module.exports = { buildDb, modifyCarts };
