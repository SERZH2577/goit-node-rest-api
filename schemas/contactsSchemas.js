import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  email: Joi.string().email().optional(),
  phone: Joi.string().optional(),
});
