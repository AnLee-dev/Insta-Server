import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const getSessions = {
  query: Joi.object().keys({
    userLine: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
