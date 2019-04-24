const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/APIAuth", { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes
app.use("/users", require("./routes/users"));

// Start the server
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server start on port ${port}`);
});
