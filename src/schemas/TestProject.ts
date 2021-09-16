import Joi from 'joi';

export default Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  api_key: Joi.string().required(),
  prefix: Joi.string().required(),
}).options({ allowUnknown: true });
