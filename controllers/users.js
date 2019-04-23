module.exports = {
  signUp: async (req, res, next) => {
    // try {} catch(error) {} - nie musimy tego używać jak używamy express-promise-router
    console.log(req.value.body);
    console.log("SignUp called");
  },
  signIn: async (req, res, next) => {
    console.log("SignIn called");
  },
  secret: async (req, res, next) => {
    console.log("Secret called");
  }
};
