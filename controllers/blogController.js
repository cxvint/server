const uuid = require('uuid');
const path = require('path');
const { Blog } = require('../models/models');
const ApiError = require('../error/ApiError');

class BlogController {
  async create(req, res, next) {
    try {
      const { name, author, text, categoryId, typeId } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const blog = await Blog.create({
        name,
        author,
        text,
        categoryId,
        typeId,
        img: fileName,
      });
      return res.json(blog);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { categoryId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let blogs;
    if (!categoryId && !typeId) {
      blogs = await Blog.findAndCountAll({ limit, offset });
    }
    if (categoryId && !typeId) {
      blogs = await Blog.findAndCountAll({
        where: { categoryId },
        limit,
        offset,
      });
    }
    if (!categoryId && typeId) {
      blogs = await Blog.findAndCountAll({ where: { typeId }, limit, offset });
    }
    if (categoryId && typeId) {
      blogs = await Blog.findAndCountAll({
        where: { typeId, categoryId },
        limit,
        offset,
      });
    }
    return res.json(blogs);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const blog = await Blog.findOne({
      where: { id },
    });
    return res.json(blog);
  }

  async update(req, res) {
    const { id } = req.params;
    const updated = await Blog.update(req.body, { where: id });
    return res.json({ blog: updated });
  }

  async delete(req, res) {
    const { id } = req.params;
    const deleted = await Blog.destroy({ where: id });
    if (deleted) {
      return res.status(204).send('Blog deleted');
    }
  }
}

module.exports = new BlogController();
