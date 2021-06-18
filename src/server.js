const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("./db/db");
require("dotenv").config();

const users = require("./routes/user");
const profiles = require("./routes/profile");
const products = require("./routes/product");
const { error } = require("./middleware/error");

const base_url = "/api/v1";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(`${base_url}/users`, users);
app.use(`${base_url}/profiles`, profiles);
app.use(`${base_url}/products`, products);

app.use(error);

app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`);
});
