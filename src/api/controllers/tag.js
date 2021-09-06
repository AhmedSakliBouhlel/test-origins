const httpStatus = require('http-status');
const tagService = require('../services/tag');

const list = async (req, res) => {
  const tags = await tagService.list(req.query);
  return res.status(httpStatus.OK).json(tags);
};

const create = async (req, res) => {
  const tag = await tagService.create(req.body);
  return res.status(httpStatus.OK).json(tag);
};

const update = async (req, res) => {
  const tag = await tagService.update(req.params.id, req.body);
  return res.status(httpStatus.OK).json(tag);
};

const remove = async (req, res) => {
  const tag = await tagService.remove(req.params.id);
  return res.status(httpStatus.OK).json(tag);
};

module.exports = {
  list,
  create,
  update,
  remove,
};
