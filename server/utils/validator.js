import Joi from "joi";

export const validateTodo = (todo) => {
  const schema = Joi.object({
    description: Joi.string().min(1).required(),
    isdone: Joi.boolean().optional(),
  });

  return schema.validate(todo);
};
