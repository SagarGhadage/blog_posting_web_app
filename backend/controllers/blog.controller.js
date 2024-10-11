const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { blogService } = require("../services");
const httpStatus = require("http-status");

const getBlogs = catchAsync(async (req, res) => {
    console.log(req.user, req.body, req.query, 'ga')
    if (req.query && req.query.region) {
        const blogs = await blogService.getBlogByRegion(req.query.region)
        res.status(httpStatus.OK).send(blogs)
        return 0
    }
    const blogs = await blogService.getBlogs(req.user, req.body)
    res.status(httpStatus.OK).send(blogs)
})


const getBlogById = catchAsync(async (req, res) => {
    const blog = await blogService.getBlogById(req.params.blogId);
    console.log(blog)
    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, `${req.params.blogId} is Not found for user ${req.user ? req.user.email : req.user}`)
    }
    res.status(httpStatus.OK).send(blog);
});


const getBlogByEmail = catchAsync(async (req, res) => {
    const blog = await blogService.getBlogByEmail(req.user);
    console.log(blog)
    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, `${req.params.blogId} is Not found for user ${req.user ? req.user.email : req.user}`)
    }
    res.status(httpStatus.OK).send(blog);
});


const createBlog = catchAsync(async (req, res) => {
    console.log(req.user)
    const blog = await blogService.creteBlog(req.user, req.body);
    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, `${req.params.blogId} is Not found for user ${req.user.email}`)
    }
    res.status(httpStatus.CREATED).send(blog)
})

const updateBlog = catchAsync(async (req, res) => {
    const blog = await blogService.updateBlogById(req.user, req.params.blogId, req.body)
    if (!blog) {
        throw new ApiError(httpStatus.NOT_FOUND, `${req.params.blogId} is Not found for user ${req.user.email}`)
    }
    res.status(httpStatus.OK).send(blog) // here we can use NO_Content also 204
})
const deleteBlog = catchAsync(async (req, res) => {
    const info = await blogService.deleteBlogById(req.user, req.params.blogId);
    if (info) {
        res.status(httpStatus.OK).send({ deleted: info });
    } else
        throw new ApiError(httpStatus.NOT_FOUND, `${req.params.blogId} Not Found'`)
});

module.exports = {
    getBlogById, createBlog, getBlogs, deleteBlog, updateBlog, getBlogByEmail
}