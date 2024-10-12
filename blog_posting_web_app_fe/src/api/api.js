import axios from "axios";
export const BACKEND_ENDPOINT =1!=1? "http://localhost:8082":"https://blog-posting-web-app-0z28.onrender.com"
export const IPIFY_ENDPOINT = "https://ipapi.co/json/";

const header = ()=>{ return {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
    },
};
}
export const fetchLocation = async () => {
    try {
        const response = await axios.get(`${IPIFY_ENDPOINT}`)
        // console.log(response)
        return response.data;

    } catch (e) {
        console.error(e)
        throw e
    }
}

export const postBlogs = async (blog) => {
    try {
        console.log(header)
        const response = await axios.post(`${BACKEND_ENDPOINT}/v1/blogs`,blog, header())
        return response.data;
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const fetchBlogs = async (location) => {
    try {
        const response = await axios.get(`${BACKEND_ENDPOINT}/v1/blogs`,location ? location:'', header())
        return response.data;

    } catch (e) {
        console.error(e)
        throw e
    }
}

export const fetchMyBlogs = async () => {
    try {
        const response = await axios.get(`${BACKEND_ENDPOINT}/v1/blogs/users`, header())
        return response.data;

    } catch (e) {
        console.error(e)
        throw e
    }
}
// console.log(fetchBlogs())
export const fetchBlogById = async (blogId) => {
    try {
        const response = await axios.get(`${BACKEND_ENDPOINT}/v1/blogs/${blogId}`, header())
        return response.data;
    } catch (e) {
        console.error(e)
        throw e
    }
}
export const updateBlogById = async (blogId,blog) => {
    try {
        const response = await axios.put(`${BACKEND_ENDPOINT}/v1/blogs/${blogId}`, blog, header())
        return response.data;
    } catch (e) {
        console.error(e)
        throw e
    }
}
export const deleteBlogById = async (id) => {
    try {
        const response = await axios.delete(`${BACKEND_ENDPOINT}/v1/blogs/${id}`, header())
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.error(e)
        throw e
    }
}

export const signUp = async (user) => {
    try {
        const response = await axios.post(`${BACKEND_ENDPOINT}/v1/auth/register`, user)
        return response.data;
    } catch (e) {
        console.error(e)
        throw e
    }
}
export const login = async (user) => {
    try {
        const response = await axios.post(`${BACKEND_ENDPOINT}/v1/auth/login`, user)
        console.log(response.data)
        return response.data;
    } catch (e) {
        console.error(e)
        throw e
    }
}
