const mongoose = require("./db/db");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const users = require("./routes/user");
const profiles = require("./routes/profile");
const products = require("./routes/product");
const services = require("./routes/service");
const productTypes = require("./routes/productType");
const serviceTypes = require("./routes/serviceType");
const productCategory = require("./routes/productCategory");
const serviceCategory = require("./routes/serviceCategory");

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
app.use(`${base_url}/services`, services);
app.use(`${base_url}/products/types`, productTypes);
app.use(`${base_url}/services/types`, serviceTypes);
app.use(`${base_url}/products/categories`, productCategory);
app.use(`${base_url}/services/categories`, serviceCategory);

app.use(error);

app.listen(PORT, () => {
  console.log(`Now listening on port: ${PORT}`);
});
