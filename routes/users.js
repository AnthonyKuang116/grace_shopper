const usersRouter = require("express").Router();
const { getAllUsers, getUserByUsername, createUser } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt")

usersRouter.use((req, res, next) => {
  console.log("A request is being made to /users");

  next();
});

usersRouter.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send({
      users
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }

  try {
    const user = await getUserByUsername(username);
    const passwordMatch = await bcrypt.compare(password, user.password)
console.log("user", user)
console.log("pwm", passwordMatch)
    if (user && passwordMatch) {
      // create token & return to user
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.send({ message: "you're logged in!", token: token, user: user.id });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    const _user = await getUserByUsername(username);

    if (_user) {
      return next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }

    const user = await createUser({
      username,
      password,
      email,
    });

    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "Thank you for signing up",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      error: "MissingUserError",
      message: "You must be logged in to perform this action.",
    });
  }
  next();
}

usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    if (req.user) {
      res.send(req.user);
    } else {
      const error = new Error("no user found");
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter, { requireUser };
