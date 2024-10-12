import { Box, Container, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { deleteBlogById, fetchBlogs, fetchMyBlogs } from '../../api/api'
import styles from "./Home.module.css"
import './Blog.css';
import { useOutletContext } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContex';
import { useSnackbar } from "notistack";
import { useNavigate, Link } from "react-router-dom";

export default function MyBlogs() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useNavigate()

  const [posts, setPosts] = useState([])
  // const userLocation = useOutletContext()
  const context = useContext(AuthContext)
  // console.log(context?.user.user,'my')
  // console.log(userLocation.userLocation)


  const fetchPosts = async () => {
    try {
      let result = await fetchMyBlogs();
      // console.log(result)
      setPosts(result);
    } catch (err) {
      if (err.response && err.response.data) {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      }
      else {
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", { variant: "error" });
      }
    }
  }


  const handleEdit = async (e) => {
    console.log(e.target.name, posts.filter((blog) => blog._id == e.target.name))

    context.setBlogToEdit(posts.find((blog) => blog._id == e.target.name))
    history('/edit')

  }
  const handleDelete = async (e) => {
    try {
      let res=await deleteBlogById(e.target.name)
      console.log(res)
      enqueueSnackbar("deleted "+res?.deleted, { variant: "success" });
      setPosts(posts.filter((ele)=>ele._id!=e.target.name))
    } catch (err) {
      if (err.response && err.response.data) {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      }
      else {
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", { variant: "error" });
      }
    }
  }

  useEffect(() => {
    fetchPosts();
    // console.log('fet')
  }, [context.user])

  // useEffect(()=>{},[])
  useEffect(() => {
    let htmlData = ``
    posts.forEach((ele) => htmlData +=
      `<div style="min-height: 100px;width: 80%; background-color: aliceblue;margin: 1% auto; padding: 1% 5%;overflow: scroll;scrollbar-width: none;border:1px solid lightblue ">
      <div >
      ${context?.user?.isLoggedIn && ele?.email == context?.user?.user?.email ? `<button class="editbtn" id="editBtn${ele._id}" name="${ele._id}" >Edit</button>` : ''}
      ${context?.user?.isLoggedIn && ele?.email == context?.user?.user?.email ? `<button class="deletebtn" id="deleteBtn${ele._id}" name="${ele._id}" >Delete</button>` : ''}
      </div>
      <h1 style="text-align:center;">${ele.title}</h1>
    ${ele.content}
      </div>`)
    // console.log(htmlData)
    document.getElementById("postContainer").innerHTML = htmlData;

    posts.forEach((ele) => {
      //edit 
      try {
        document.getElementById(`editBtn${ele._id}`).addEventListener('click', (e) => {
          console.log(e.target.name);
          handleEdit(e)
        })
        //delete 
        document.getElementById(`deleteBtn${ele._id}`).addEventListener('click', (e) => {
          console.log(e.target.name);
          handleDelete(e)
        })
        
      } catch (error) {
        console.log(error)
        window.location.reload();
      }
      
    })
    return () => {
      // posts.forEach((ele) => document.getElementById(`editBtn${ele._id}`).removeEventListener('click'))
    }
  }
    , [context.user, posts])

  return (
    <>
      <Typography variant="h1" textAlign={'center'} mt={'5%'} mb={'1%'} component="h1" sx={{ flexGrow: 1, color: 'text.bgdark' }} >
        Blogs created By {context?.user?.user?.email}
      </Typography>
      <section id='postContainer' className={styles.postContainer}>
      </section>
    </>
  )
}
