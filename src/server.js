const express = require("express");
const { mongoose } = require("./db/mongoose");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const products = require("./routes/product");
const users = require("./routes/user");
const profiles = require("./routes/profile");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/user", users);
app.use("/api/v1/products", products);
app.use("/api/v1/profile", profiles);

app.listen(PORT, () => {
  console.log(`Now listening on port:${PORT}`);
});
