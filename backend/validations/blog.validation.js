const Joi = require("joi");
const { objectId } = require("./custom.validation");


const getBlogById = {
    params: Joi.object().keys({
      blogId:Joi.string().custom(objectId),
    }),
  };


const getBlogByIpLocation = {
    // params: Joi.object().keys({
    //   // city:Joi.string(),
    //   // Ip:Joi.string().custom(objectId),

    // }),
    body:Joi.object().keys({
      
      location:Joi.object().keys({
        country_code_iso3:Joi.string(),
        ip:Joi.string().required(),
        city:Joi.string().required(),
        region:Joi.string(),
        country:Joi.string().required(),
        country_name:Joi.string(),
        country_code:Joi.string(),
        country_capital:Joi.string(),
        postal:Joi.number(),
        org:Joi.string(),
        network:Joi.string(),
        version:Joi.string(),
        country_capital:Joi.string()
      })

    }),
  };
  const createBlog={
    body:Joi.object().keys({

      content:Joi.string().required(),
      title:Joi.string().required(),

      location:Joi.object().keys({
        country_code_iso3:Joi.string(),
        ip:Joi.string().required(),
        city:Joi.string().required(),
        region:Joi.string(),
        region_code:Joi.string(),
        country:Joi.string().required(),
        country_name:Joi.string(),
        country_code:Joi.string(),
        country_capital:Joi.string(),
        postal:Joi.number(),
        org:Joi.string(),
        network:Joi.string(),
        version:Joi.string(),
        country_capital:Joi.string(),
        timezone:Joi.string(),
      })

    }),
  }

  const updateBlog={
    params: Joi.object().keys({
      blogId:Joi.string().custom(objectId),
    }),
    body:Joi.object().keys({
      content:Joi.string(),
      title:Joi.string(),
    }),
  }

  const deleteBlog = {
    params: Joi.object().keys({
      blogId:Joi.string().custom(objectId),
    }),
  };

  module.exports={
    getBlogById,deleteBlog,createBlog,updateBlog,getBlogByIpLocation
  }