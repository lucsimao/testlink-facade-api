import Joi from 'joi';

export default Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  external_id: Joi.string().required(),
}).options({ allowUnknown: true });
