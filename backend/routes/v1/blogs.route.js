const express = require("express");
const { blogController } = require("../../controllers");
const validate = require("../../middlewares/validate");
const { blogValidation } = require("../../validations");
const auth = require("../../middlewares/auth");


const router = express.Router();

//all
router.get("/", blogController.getBlogs);


router.get(
  "/users",
  auth,
  (req, res, n) => console.log(req.user, n()," hi"),
  blogController.getBlogByEmail);

//blog id
router.get("/:blogId", validate(blogValidation.getBlogById), blogController.getBlogById);

router.post(
  "/",
  auth,
  validate(blogValidation.createBlog),
  blogController.createBlog
);

router.put(
  "/:blogId",
  auth,
  validate(blogValidation.updateBlog),
  blogController.updateBlog
);

router.delete(
  "/:blogId",
  auth,
  validate(blogValidation.deleteBlog),
  blogController.deleteBlog
);

module.exports = router;
