const Joi = require("joi");
const { objectId } = require("./custom.validation");

const getBlog = {
    params: Joi.object().keys({
      blogId:Joi.string().custom(objectId),
    }),
  };
  const getBlogByIpLocation = {
    params: Joi.object().keys({
      Ip:Joi.string().custom(objectId),
    }),
  };
  const createBlog={
    body:Joi.object().keys({
      description:Joi.string(),
      title:Joi.string().required(),
    }),
  }

  const updateBlog={
    params: Joi.object().keys({
      BlogId:Joi.string().custom(objectId),
    }),
    body:Joi.object().keys({
      description:Joi.string(),
      title:Joi.string(),
    }),
  }

  const deleteBlog = {
    params: Joi.object().keys({
      blogId:Joi.string().custom(objectId),
    }),
  };

  module.exports={
    getBlog,deleteBlog,createBlog,updateBlog,getBlogByIpLocation
  }