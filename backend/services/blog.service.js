const { Blog } = require('../models/')
const getBlogById = async (blogId) => {
    try {
        const blog = await Blog.findOne({ _id: blogId, })
        console.log(blog)
        return blog
    } catch (error) {
        throw error
    }
}
const getBlogByIpLocation = async (blogId) => {
    try {
        const blog = await Blog.findOne({ _id: blogId, })
        console.log(blog)
        return blog
    } catch (error) {
        throw error
    }
}

const getBlogs = async () => {
    try {
        const blogs = await Blog.find()
        console.log(blogs)
        return blogs
    } catch (error) {
        throw error
    }
}
const creteBlog = async (user, blog) => {
    try {
        const blogs = await Blog.create({ ...blog, email: user.email })
        console.log(blogs)
        return blogs
    } catch (error) {
        throw error
    }
}
const updateBlogById = async (user, blogId, blog) => {
    try {
        const blogToUpdate = await Blog.findOne({ email: user.email, _id: blogId, })
        if (!blogToUpdate) {
            return null
        }
        const { title, } = blog

        if (title) {
            blogToUpdate.title = title
        }

        await blogToUpdate.save()
        return blogToUpdate

    } catch (error) {
        throw error
    }
}

const deleteBlogById = async (user, blogId) => {
    try {
        const blog = await Blog.findOne({ email: user.email, _id: blogId })
        if (!blog) {
            return 0
        }
        return (await Blog.deleteOne({ _id: blogId, email: user.email })).deletedCount

    } catch (error) {
        throw error
    }
}
module.exports = {
    deleteBlogById, updateBlogById, creteBlog, getBlogs, getBlogById, getBlogByIpLocation
}