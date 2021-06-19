const Joi = require("joi");

const registerValidationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  password_confirmation: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const loginValidationSchema = Joi.object()
  .keys({
    email: Joi.string().email(),
    username: Joi.string().min(3).max(20),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  })
  .xor("email", "username");

const passwordResetValidationSchema = Joi.object().keys({
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  new_password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  password_confirmation: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});

const productValidationSchema = Joi.object().keys({
  name: Joi.string().min(3).max(20).required(),
  price: Joi.number().required(),
  category: Joi.string().min(3).max(30).required(),
  type: Joi.string().min(3).max(30).required(),
  quantity: Joi.number().required(),
  location: Joi.array().length(2).items(Joi.number()),
  details: Joi.object().keys({
    dimensions: Joi.string(),
    manufacturer: Joi.string(),
    dateOfPurchase: Joi.string(),
    purchaseCondition: Joi.string(),
    SKU: Joi.string(),
    model: Joi.string(),
    weight: Joi.string(),
    color: Joi.string(),
    description: Joi.string(),
    additionalInformation: Joi.array().items(Joi.string()),
  }),
  media: Joi.string().min(3).required(),
  options: Joi.array().items(Joi.string()),
});

const serviceValidationSchema = Joi.object().keys({
  name: Joi.string().min(3).max(20).required(),
  charge: Joi.number().required(),
  category: Joi.string().min(3).max(30).required(),
  type: Joi.string().min(3).max(30).required(),
  location: Joi.array().length(2).items(Joi.number()),
  details: Joi.object().keys({
    experienceLength: Joi.string(),
    description: Joi.string(),
    skills: Joi.array().items(Joi.string()),
  }),
  media: Joi.string().min(3).required(),
  options: Joi.array().items(Joi.string()),
});

const profileUpdateValidationSchema = Joi.object().keys({
  firstname: Joi.string().min(3).max(20).required(),
  lastname: Joi.string().min(3).max(20).required(),
  gender: Joi.string().min(3).max(20).required(),
  age: Joi.string().min(2).required(),
  location: Joi.array().length(2).items(Joi.number()).required(),
});

const typeValidationSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
  category: Joi.string().min(3).max(50).required(),
});

const categoryValidationSchema = Joi.object().keys({
  name: Joi.string().min(3).max(50).required(),
});

module.exports = {
  registerValidationSchema,
  loginValidationSchema,
  passwordResetValidationSchema,
  productValidationSchema,
  profileUpdateValidationSchema,
  typeValidationSchema,
  categoryValidationSchema,
  serviceValidationSchema,
};
