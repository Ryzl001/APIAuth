const express = require("express");
// uzywamy zamiast router z express.Router
// lepiej sobei radzi z async funkcjami, nie musimy używać try {} catch {} bloku
const router = require("express-promise-router")();

// const router = express.Router();

const UsersController = require("../controllers/users");

router.route("/signup").post(UsersController.signUp);

router.route("/signin").post(UsersController.signIn);

router.route("/secret").get(UsersController.secret);

module.exports = router;
