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
        admin: true,
      },
      {
        username: "sandra",
        password: "sandra123",
        email: "sandra@fakemail.com",
        admin: false,
      },
      {
        username: "glamgal",
        password: "glamgal123",
        email: "glamgal@fakemail.com",
        admin: false,
      },
      {
        username: "cart",
        password: "cart",
        email: "cart@emai.com",
        admin: false,
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
        subCategory: "Tropical",
        name: "Bananas, each",
        description:
          "Organic bananas are primarily ripened before the sale  Soft fruit is protected by easy-to-peel banana peel  Can be enjoyed raw or cooked  Usually used to elevate dessert and breakfast recipes",
        price: "0.22",
        quantity: 100,
        imgSrc: "/images/banana.jpg",
      },
      {
        category: "Fruits",
        subCategory: "Tropical",
        name: "Mango, each",
        description:
          "Simply slice them for a healthy snack!  Great blended in smoothies  High in fiber  Low in cholesterol",
        price: "0.57",
        quantity: 100,
        imgSrc: "/images/mango.jpg",
      },
      {
        category: "Fruits",
        subCategory: "Sub-Tropical",
        name: "Avocado, each",
        description: `Creamy texture and mild flavor  A cholesterol free fruit that contains almost 20 vitamins, minerals and phytonutrients including Vitamin E, Vitamin K, Vitamin C and Vitamins B5 and B9  Avocados are the lowest sugar fruit and provide unsaturated “good fats” that help absorb Vitamin A, Vitamin D, Vitamin K and Vitamin E  Ripe avocados will have dark green to nearly black skin color, a bumpy texture and should yield to gentle pressure without leaving indentations  Fresh avocados are great for using in avocado dip, salads and guacamole`,
        price: "0.86",
        quantity: 100,
        imgSrc: "/images/avocado.jpg",
      },
      {
        category: "Fruits",
        subCategory: "Sub-Tropical",
        name: "Orange, each",
        description: `A good addition to a healthy diet  Easy to peel segments  Contains vitamin C and other nutrients  Can be juiced for a breakfast beverage Suitable for use in all kinds of sweet and savory dishes  Store fresh oranges at room temperature or refrigerate`,
        price: "0.84",
        quantity: 100,
        imgSrc: "/images/orange.jpg",
      },
      {
        category: "Fruits",
        subCategory: "Small",
        name: "Blueberries, 1 pint",
        description: `Best when enjoyed at room temperature  Light, refreshing taste  Healthy sweet treat  Prior to serving gently wash them with cool water  Refrigerate your berries in the original container to maintain freshness, they should approximately last 3-5 days after purchase  Keep dry for optimal freshness`,
        price: "2.88",
        quantity: 100,
        imgSrc: "/images/blueberries.jpg",
      },
      {
        category: "Fruits",
        subCategory: "Small",
        name: "Strawberries, 1lb",
        description: `Best when enjoyed at room temperature  Light, refreshing taste  Healthy sweet treat  Prior to serving gently wash them and remove leafy cap  Refrigerate your strawberries in the original container to maintain freshness for approximately 3-5 days after purchase  Keep dry until ready to wash and eat for optimal freshness`,
        price: "1.64",
        quantity: 100,
        imgSrc: "/images/strawberries.jpg",
      },
      {
        category: "Fruits",
        subCategory: "Stone",
        name: "Apricots, 1lb",
        description: `Wonderfully smooth and sweet flavor  Great snack at any time of the day  Use to make a delicious yogurt parfait  Make a decadent apricot crisp and top with your favorite ice cream  Wonderful addition to smoothies`,
        price: "3.12",
        quantity: 100,
        imgSrc: "/images/apricots.jpg",
      },
      {
        category: "Fruits",
        subCategory: "Stone",
        name: "Cherries, 1lb",
        description: `Bursting with antioxidants, phytochemicals, vitamins, nutrients, and fiber  Rich source of vitamin C, potassium, and vitamin B complex  Versatile and delicious  Wonderful addition to entrees, desserts, and beverages  To enjoy fresh cherries: store in the refrigerator and wash just before eating`,
        price: "2.97",
        quantity: 100,
        imgSrc: "/images/cherries.jpg",
      },
      {
        category: "Fruits",
        subCategory: "Pome",
        name: "Apple, each",
        description: `Classic sweet flavor and are crisp and juicy with higher antioxidants due to the rich deep red skin  Perfect for snacking or baking  Chop them up and add to slow cooker with spices for apple sauce, add them to a smoothie or juice blend, or serve with peanut butter  They have a creamy white flesh with low acidity`,
        price: "0.80",
        quantity: 100,
        imgSrc: "/images/apple.jpg",
      },
      {
        category: "Fruits",
        subCategory: "Pome",
        name: "Pear, each",
        description: `Signature sweet pear flavor and aroma with abundant juice  Enjoy as a snack or use to make cobbler, crisp, or cake`,
        price: "1.11",
        quantity: 100,
        imgSrc: "/images/pear.jpg",
      },
      {
        category: "Fruits",
        subCategory: "Melons",
        name: "Cantaloupe, each",
        description: `Ideal addition to every kitchen  Flavorful addition to many recipes  Enjoy on its own or add to a mixed fruit salad  Add to your fresh garden salad  Get creative & make a cantaloupe cocktail or a refreshing sorbet  Explore all the delicious ways to add fresh cantaloupe to your favorite recipes`,
        price: "1.78",
        quantity: 100,
        imgSrc: "/images/cantaloupe.jpg",
      },
      {
        category: "Fruits",
        subCategory: "Melons",
        name: "Watermelon, each",
        description: `Sweet, refreshing treat  Great for breakfast, lunch, dessert, or when you want a snack  Good source of vitamin C, vitamin A, and potassium  Cut into chunks and enjoy, infuse with water, or mix with feta and mint for a salad  Share with friends and family or keep for yourself`,
        price: "3.98",
        quantity: 100,
        imgSrc: "/images/watermelon.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Fungi",
        name: "Portabellas, 8oz Sliced",
        description: `8-ounce package of sliced baby bella mushrooms  Naturally fat-free  Cholesterol-free  Low in calories, carbs and sodium  Fresh and all natural  Best if kept refrigerated  Wash before use  Natural source of the antioxidant selenium  Excellent addition to beef, wild game and vegetable dishes`,
        price: "2.18",
        quantity: 100,
        imgSrc: "/images/portobello.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Fungi",
        name: "White Mushrooms, 8oz Sliced",
        description: `Adds flavor and textures to your meals  Great for breakfast, lunch, or dinner  Mince them for an omelet, slice them for a salad, or stuff them with cheese  Naturally fat-free and cholesterol-free  Low in sodium and calories`,
        price: "1.98",
        quantity: 100,
        imgSrc: "/images/white-mushroom.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Root",
        name: "Carrots, 1lb bag",
        description: `Approximately 6 carrots per lb  California carrots have a crunchy texture and a bold taste  Fun to eat in many different ways  Cut into slices for stews or a meat pie  Cut thin to add to a salad along with other vegetables  Ideal for use with dips and dressings  16 oz (1 lb./454g)  All-natural`,
        price: "0.67",
        quantity: 100,
        imgSrc: "/images/carrots.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Root",
        name: "Beets, bunch",
        description: `Serve in a salad or reheat as a side dish  Great for pickling, cooking, or enjoying raw  Good source of fiber and vitamin C  Refrigerate after washing`,
        price: "2.24",
        quantity: 100,
        imgSrc: "/images/beets.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Root",
        name: "Potato, each",
        description: `Ideal addition to every pantry  Make crispy hash browns or add to an omelet  Serve garlic mashed potatoes or a loaded baked potato  Great for potato salad or homestyle French fries  Explore all the delicious ways to serve these satisfying potatoes`,
        price: "0.62",
        quantity: 100,
        imgSrc: "/images/potato.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Root",
        name: "Sweet Potato, each",
        description: `Wholesome & delicious  Ideal ingredient for a variety of dishes  Make seasoned sweet potato fries or a flavorful hummus dip  Use them for a sweet potato casserole or sweet potato & brown sugar ice cream  Versatile & hearty`,
        price: "0.78",
        quantity: 100,
        imgSrc: "/images/sweet-potato.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Bulbs",
        name: "Garlic, each (1 bulb)",
        description: `Ideal addition to every pantry  Flavorful addition to many recipes  Add to pasta, shrimp, chicken, stews & more  Try sauteed with roasted vegetables  Explore all the delicious ways to add fresh garlic to your favorite recipes`,
        price: "0.43",
        quantity: 100,
        imgSrc: "/images/garlic.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Bulbs",
        name: "Red Onion, each",
        description: `Tasty & versatile  Simple way to add more vegetables to your diet  Use in sauces, soups, stir fries & gumbo  Make a hearty casserole or some crunchy onion rings  Add to your spicy salsa recipe  Put on your hamburgers & hot dogs`,
        price: "0.78",
        quantity: 100,
        imgSrc: "/images/red-onion.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Other",
        name: "Ginger Root, per lb",
        description: `Light brown, textured skin and white to yellow flesh  Peppery, pungent, zesty flavor  Can be used fresh, dried, powdered, or as an oil or juice  Known to help with digestion, reduce nausea, and fight the flu  Packed with vitamins and minerals like iron, potassium, and vitamin C  Great addition to juices, teas, and stir-fries`,
        price: "2.98",
        quantity: 100,
        imgSrc: "/images/ginger-root.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Seeded",
        name: "Squash, each",
        description: `Versatile ingredient  Roast the whole squash for the perfect side dish or chop into cubes, put into a slow cooker, and mix with chicken breast, beans, and spices for a flavorful dish  Use it to create a sweet and decadent pie  Make butternut squash noodles for a gluten free pasta alternative  Will become a pantry staple`,
        price: "4.13",
        quantity: 100,
        imgSrc: "/images/squash.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Seeded",
        name: "Cucumber, each",
        description: `Single cucumber  Crisp, delicious, and refreshing  Naturally low in calories, carbohydrates, sodium, fat, and cholesterol  Provides potassium, fiber, and vitamin C, among other nutrients  Create delicious recipes with this fresh cucumber`,
        price: "0.62",
        quantity: 100,
        imgSrc: "/images/cucumber.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Seeded",
        name: "Tomato, each",
        description: `Wholesome, versatile, and delicious  Large size with a juicy delicious flavor  Perfect for slicing  Enjoy on burgers, sandwiches and more  Enjoy on its own as a heathy snack`,
        price: "0.86",
        quantity: 100,
        imgSrc: "/images/tomato.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Seeded",
        name: "Pepper, each",
        description: `Naturally low in calories  1 Each, Green Bell Pepper  Fresh, whole bell pepper  Exceptionally rich in vitamin C and other antioxidants`,
        price: "0.78",
        quantity: 100,
        imgSrc: "/images/pepper.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Herbs",
        name: "Basil, cut 0.75oz",
        description: `Fragrant and robustly flavored, basil is the key ingredient in pesto  Its sweet blend of anise, clove and mint flavors is essential to many French, Southeast Asian, Italian and Greek dishes  Use basil with tomatoes, fresh spaghetti sauce and pizza  Snip raw basil into salads and stir fries  Wait to add fresh herbs during the last few minutes of cooking for the most flavor`,
        price: "1.98",
        quantity: 100,
        imgSrc: "/images/basil.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Herbs",
        name: "Cilantro, bunch",
        description: `Cilantro is a delightfully bright herb that brings a sharp freshness to food  It has pleasant herbaceous and citrus notes that complement a variety of savory preparations, including raw ones like pico de gallo and ceviche  Adds zesty flavor to tacos, salsa, guacamole, curries, stir-fries and more  Wait to add fresh herbs during the last few minutes of cooking for the most flavor`,
        price: "0.78",
        quantity: 100,
        imgSrc: "/images/cilantro.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Row-Crops",
        name: "Artichoke, each",
        description: `Fresh and delicious  High in folate and vitamins C and K  Can be boiled, grilled, braised, or stuffed and baked  Turns tender and buttery when properly cooked  Great healthy appetizer, side dish, or snack option  Store artichokes in a plastic bag and refrigerate them`,
        price: "2.28",
        quantity: 100,
        imgSrc: "/images/artichoke.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Row-Crops",
        name: "Broccoli, per lb",
        description: `Approximately 2 heads per pound  Healthy side to any meal  Delicious when steamed, oven roasted, pan fried, or added to a stir fry or salad`,
        price: "1.48",
        quantity: 100,
        imgSrc: "/images/broccoli.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Row-Crops",
        name: "Asparagus, bunch",
        description: `Loaded with nutrients and have a great fresh taste  Saute them with olive oil, salt, pepper, and a hint of lemon juice for a healthy and flavorful vegetable side that will pair well with a wide array of main dishes  Get creative in the kitchen  Add these asparagus spears to pasta, salads, casseroles, and other inventive meal options  Add to quiches and frittatas for brunch`,
        price: "1.98",
        quantity: 100,
        imgSrc: "/images/asparagus.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Row-Crops",
        name: "Celery, 1lb bag",
        description: `Promotes healthy bones  Packed full of vitamin K, antioxidants, and fiber  Try dipping in a variety of sauces, like peanut butter, hummus, cheese sauce, and salad dressing  Add to salads, stir fry, and soup  Crispy, crunchy texture  Healthy snack option  Delicious and nutritious`,
        price: "1.42",
        quantity: 100,
        imgSrc: "/images/celery.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Row-Crops",
        name: "Lettuce, each",
        description: `Use it as a garnish or to make your salad of choice  Contains vitamin A, vitamin C, calcium, iron, vitamin E, vitamin K, vitamin B6 and more  Fat-free  No cholesterol, sodium or carbohydrates  You can use it whole or cut it up`,
        price: "1.48",
        quantity: 100,
        imgSrc: "/images/lettuce.jpg",
      },
      {
        category: "Vegetables",
        subCategory: "Row-Crops",
        name: "Baby Spinach, 1lb",
        description: `Washed and ready to eat  Great source of dietary fiber, calcium, iron and vitamins A and C  Create a salad tossed with your favorite vegetables, protein, nuts and dressing  Use it as a topping on sandwiches and pizzas or simply enjoy it as a healthy side  Comes inside a resealable container to help maintain freshness`,
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
