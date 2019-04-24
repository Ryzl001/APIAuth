const User = require("../models/User");

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

    // response with token
    res.json({ user: "created" });
  },
  signIn: async (req, res, next) => {
    console.log("SignIn called");
  },
  secret: async (req, res, next) => {
    console.log("Secret called");
  }
};
