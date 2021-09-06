const Joi = require('@hapi/joi');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
const VideoTagAssociation = require('../models/video-tag-association');

const schema = Joi.object({
  idTag: Joi.number().required(),
  idVideo: Joi.number().required(),
});

const list = async (query) => {
  const videoTagAssociations = await VideoTagAssociation.find({ ...query });
  return videoTagAssociations;
};

const create = async (body) => {
  const { error } = schema.validate(body);
  if (error) {
    throw new APIError({
      message: error.message,
      status: httpStatus.BAD_REQUEST,
    });
  }

  const { idTag, idVideo } = body;
  let [videoTagAssociation] = await VideoTagAssociation.find({ idTag, idVideo });
  if (videoTagAssociation) {
    throw new APIError({
      message: 'VideoTagAssociation already exist',
      status: httpStatus.BAD_REQUEST,
    });
  }
  videoTagAssociation = new VideoTagAssociation({ idTag, idVideo });
  videoTagAssociation = await videoTagAssociation.insert();
  return videoTagAssociation;
};

const remove = async (id) => {
  const videoTagAssociation = await VideoTagAssociation.findByIdAndDelete(id);

  if (!videoTagAssociation) {
    throw new APIError({
      message: 'VideoTagAssociation with the given ID was not found',
      status: httpStatus.NOT_FOUND,
    });
  }
  return videoTagAssociation;
};

module.exports = {
  list,
  create,
  remove,
};
