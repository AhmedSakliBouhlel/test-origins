const Joi = require('@hapi/joi');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const Tag = require('../models/tag');

const schema = Joi.object({
  valeur: Joi.string().required(),
});

const list = async (query) => {
  const tags = await Tag.find({ ...query });
  return tags;
};

const create = async (body) => {
  const { error } = schema.validate(body);
  if (error) {
    throw new APIError({
      message: error.message,
      status: httpStatus.BAD_REQUEST,
    });
  }

  const { valeur } = body;
  let [tag] = await Tag.find({ valeur });
  if (tag) {
    throw new APIError({
      message: 'Tag already exist',
      status: httpStatus.BAD_REQUEST,
    });
  }
  tag = new Tag({ valeur });
  tag = await tag.insert();
  return tag;
};

const update = async (id, body) => {
  const { error } = schema.validate(body);
  if (error) {
    throw new APIError({
      message: error.message,
      status: httpStatus.BAD_REQUEST,
    });
  }
  const { valeur } = body;
  const tag = await Tag.findByIdAndUpdate(id, { valeur });
  if (!tag) {
    throw new APIError({
      message: 'Tag with the given ID was not found',
      status: httpStatus.NOT_FOUND,
    });
  }
  return tag;
};

const remove = async (id) => {
  const tag = await Tag.findByIdAndDelete(id);

  if (!tag) {
    throw new APIError({
      message: 'Tag with the given ID was not found',
      status: httpStatus.NOT_FOUND,
    });
  }
  return tag;
};

module.exports = {
  list,
  create,
  update,
  remove,
};
