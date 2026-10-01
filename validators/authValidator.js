const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().trim().required(),

  email: Joi.string().email().trim().lowercase().required(),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/)
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long",
      "string.pattern.base":
        "Password must contain both letters and numbers",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),

  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};