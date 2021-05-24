const Joi = require("joi");

const registerValidationSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
});

////////////////////////////
//need to find a validator that checks one property for multiple types
//e.g id: Joi.string().email() or Joi.string()
const loginValidationSchema = Joi.object()
  .keys({
    email: Joi.string().email(),
    username: Joi.string().min(3).max(20),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  })
  .xor("email", "username");

module.exports = {
  registerValidationSchema,
  loginValidationSchema,
};
