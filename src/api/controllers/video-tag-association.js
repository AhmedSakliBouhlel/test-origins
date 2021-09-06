const httpStatus = require('http-status');
const videoTagAssociationService = require('../services/video-tag-association');

const list = async (req, res) => {
  const tags = await videoTagAssociationService.list(req.query);
  return res.status(httpStatus.OK).json(tags);
};

const create = async (req, res) => {
  const tag = await videoTagAssociationService.create(req.body);
  return res.status(httpStatus.OK).json(tag);
};

const remove = async (req, res) => {
  const tag = await videoTagAssociationService.remove(req.params.id);
  return res.status(httpStatus.OK).json(tag);
};

module.exports = {
  list,
  create,
  remove,
};
