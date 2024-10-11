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
const getBlogByRegion = async (location) => {
    // console.log(location)
    try {
        const blog = await Blog.find({ 'location.region':{'$regex':`${location}`,"$options": "i"} })
        // console.log(blog)
        return blog
    } catch (error) {
        throw error
    }
}

const getBlogByEmail = async (user) => {
    console.log(user)
    try {
        const blog = await Blog.find({ email:user.email })
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
        console.log(user,blog)
        if(user&&blog){
        const blogs = await Blog.create({ ...blog, email: user.email })
        console.log(blogs)
        return blogs
        }
    } catch (error) {
        throw error
    }
}
const updateBlogById = async (user, blogId, blog) => {
    try {
        const blogToUpdate = await Blog.findOne({ email: user.email, _id: blogId })
        if (!blogToUpdate) {
            return null
        }
        const { title,content } = blog

        if (title) {
            blogToUpdate.title = title
        }
        if (content) {
            blogToUpdate.content = content
        }
        await blogToUpdate.save()
        return blogToUpdate

    } catch (error) {
        throw error
    }
}

const deleteBlogById = async (user, blogId) => {
    console.log(user,blogId,'ser')
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
    deleteBlogById, updateBlogById, creteBlog, getBlogs, getBlogById, getBlogByRegion,getBlogByEmail
}