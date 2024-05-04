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
})
  .min(1)
  .message("Body must have at least one field");

export const updateStatusContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
