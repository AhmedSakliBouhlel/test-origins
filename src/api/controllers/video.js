const httpStatus = require('http-status');
const videoService = require('../services/video');

const list = async (req, res) => {
  const videos = await videoService.list(req.query);
  return res.status(httpStatus.OK).json(videos);
};

const listByTag = async (req, res) => {
  const videos = await videoService.listByTag(req.query);
  return res.status(httpStatus.OK).json(videos);
};

const create = async (req, res) => {
  const video = await videoService.create(req.body);
  return res.status(httpStatus.OK).json(video);
};

const update = async (req, res) => {
  const video = await videoService.update(req.params.id, req.body);
  return res.status(httpStatus.OK).json(video);
};

const remove = async (req, res) => {
  const video = await videoService.remove(req.params.id);
  return res.status(httpStatus.OK).json(video);
};

module.exports = {
  list,
  listByTag,
  create,
  update,
  remove,
};
