import Joi from 'joi';

export default Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  parent_id: Joi.number().required(),
}).options({ allowUnknown: true });
