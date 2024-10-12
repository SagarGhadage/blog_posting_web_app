import { Box, Container, Stack, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { fetchBlogs } from '../../api/api'
import styles from "./Home.module.css"
import './Blog.css';
import { useOutletContext } from 'react-router-dom';
import { AuthContext } from '../../utils/AuthContex';
import { useSnackbar } from "notistack";

export default function Home() {
  const { enqueueSnackbar } = useSnackbar();

  const [posts, setPosts] = useState([])
  const userLocation = useOutletContext()
  const context = useContext(AuthContext)
  // console.log(context?.user.user)
  // console.log(userLocation.userLocation)
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let result = await fetchBlogs();
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

    fetchPosts();
  }, [context.user])

  useEffect(() => {
    let htmlData = ``
    posts.forEach((ele) => htmlData +=
      `<div style="min-height: 100px;width: 80%; background-color: aliceblue;margin: 1% auto; padding: 1% 5%;overflow: scroll;scrollbar-width: none;border:1px solid lightblue ">
      ${context?.user?.isLoggedIn && ele?.email == context?.user?.user?.email ? '<button class="editbtn" id="editBtn">Edit</button>' : ''}
      <h1 style="text-align:center;">${ele.title}</h1>
    ${ele.content}
      </div>`)
    // console.log(htmlData)
    document.getElementById("postContainer").innerHTML = htmlData;
  }
    , [posts])

  return (
    <>
      <Typography variant="h1" textAlign={'center'} mt={'5%'} component="h1" sx={{ flexGrow: 1, color: 'text.bgdark' }} >
        Blogs in {userLocation.userLocation.region}
      </Typography>
      <section id='postContainer' className={styles.postContainer}>

      </section>
    </>
  )
}
