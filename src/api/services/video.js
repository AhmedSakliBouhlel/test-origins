const Joi = require('@hapi/joi');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const Video = require('../models/video');

const schema = Joi.object({
  nom: Joi.string().required(),
  description: Joi.string(),
  url: Joi.string().required(),
});

const list = async (query) => {
  const videos = await Video.find({ ...query });
  return videos;
};

const listByTag = async (query) => {
  const videos = await Video.findByTag({ ...query });
  return videos;
};

const create = async (body) => {
  const { error } = schema.validate(body);
  if (error) {
    throw new APIError({
      message: error.message,
      status: httpStatus.BAD_REQUEST,
    });
  }

  const { nom, description, url } = body;
  let [video] = await Video.find({ nom, description, url });
  if (video) {
    throw new APIError({
      message: 'Video already exist',
      status: httpStatus.BAD_REQUEST,
    });
  }
  video = new Video({ nom, description, url });
  video = await video.insert();
  return video;
};

const update = async (id, body) => {
  const { error } = schema.validate(body);
  if (error) {
    throw new APIError({
      message: error.message,
      status: httpStatus.BAD_REQUEST,
    });
  }
  const { nom, description, url } = body;
  const video = await Video.findByIdAndUpdate(id, { nom, description, url });
  if (!video) {
    throw new APIError({
      message: 'Video with the given ID was not found',
      status: httpStatus.NOT_FOUND,
    });
  }
  return video;
};

const remove = async (id) => {
  const video = await Video.findByIdAndDelete(id);

  if (!video) {
    throw new APIError({
      message: 'Video with the given ID was not found',
      status: httpStatus.NOT_FOUND,
    });
  }
  return video;
};

module.exports = {
  list,
  listByTag,
  create,
  update,
  remove,
};
