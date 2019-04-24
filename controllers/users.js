const JWT = require("jsonwebtoken");

const User = require("../models/User");
const { JWTSecret } = require("../config/keys");

// Create token
signToken = user => {
  return JWT.sign(
    {
      iss: "Name.itc",
      sub: user.id, // to co bedziemy decodować
      iat: new Date().getTime(), // czas utworzenia
      exp: new Date().setDate(new Date().getDate() + 1) // ustawiamy swój czas = obecny czas + 1 dzień
    },
    JWTSecret
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    // try {} catch(error) {} - nie musimy tego używać jak używamy express-promise-router
    console.log("SignUp called");
    const { email, password } = req.value.body;
    // zamiast const email = req.value.body.email

    // Check if there is a user with the same email
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      // dzieki return reszta kodu nei zostanie wykonana, tylko wyskoczy error
      return res.status(403).json({ error: "Email is already in use" });
    }

    //create new user
    const newUser = new User({
      // zamiast email: email
      email,
      password
    });
    await newUser.save();

    // generate Token
    const token = signToken(newUser);

    // response with token
    res.status(200).json({ token: token });
  },
  signIn: async (req, res, next) => {
    console.log("SignIn called");
  },
  secret: async (req, res, next) => {
    console.log("Secret called");
  }
};
