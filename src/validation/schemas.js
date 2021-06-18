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
  quantity: Joi.number().required(),
  description: Joi.string().required(),
  specifications: Joi.array().items(Joi.string()).required(),
});

module.exports = {
  registerValidationSchema,
  loginValidationSchema,
  passwordResetValidationSchema,
  productValidationSchema,
};
