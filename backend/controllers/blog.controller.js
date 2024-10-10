const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { blogService } = require("../services");
const httpStatus = require("http-status");

const getblogById = catchAsync(async (req, res) => {
    const blog = await blogService.getblogById(req.user, req.params.blogId);
    console.log(blog)
    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, `${req.params.blogId} is Not found for user ${req.user.email}`)
    }
    res.status(httpStatus.OK).send(blog);
});

const getblogs = catchAsync(async (req, res) => {
    const blogs = await blogService.getblogs(req.user)
    res.status(httpStatus.OK).send(blogs)
})

const createblog = catchAsync(async (req, res) => {
    const blog = await blogService.creteblog(req.user, req.body);
    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, `${req.params.blogId} is Not found for user ${req.user.email}`)
    }
    res.status(httpStatus.CREATED).send(blog)
})

const updateblog = catchAsync(async (req, res) => {
    const blog = await blogService.updateblogById(req.user, req.params.blogId, req.body)
    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, `${req.params.blogId} is Not found for user ${req.user.email}`)
    }
    res.status(httpStatus.OK).send(blog) // here we can use NO_Content also 204
})
const deleteblog = catchAsync(async (req, res) => {
    const info = await blogService.deleteblogById(req.user, req.params.blogId);
    if (info) {
        res.status(httpStatus.OK).send({ deleted: info });
    } else
        throw new ApiError(httpStatus.NOT_FOUND, `${req.params.blogId} Not Found'`)
});

module.exports = {
    getblogById, getblogs, createblog, updateblog, deleteblog
}