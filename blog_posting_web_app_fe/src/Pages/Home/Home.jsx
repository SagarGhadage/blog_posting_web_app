import { Box, Container, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetchBlogs } from '../../api/api'
import styles from "./Home.module.css"
import './Blog.css';
import { useOutletContext } from 'react-router-dom';

export default function Home() {

  const [posts, setPosts] = useState([])
  const userLocation=useOutletContext()
  console.log(userLocation.userLocation)
  useEffect(() => {
    const fetchPosts = async () => {
      let result = await fetchBlogs()
      console.log(result)
      setPosts(result)
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    let postLayoutHtml=`
    <div style="min-height: 100px;width: 80%; background-color: aliceblue ;margin: 5% auto;">
      </div>`
    let htmlData = ``
    posts.forEach((ele) => htmlData +=
    `<div style="min-height: 100px;width: 80%; background-color: aliceblue;margin: 5% auto; padding: 5%;overflow: scroll; ">
    ${ele.content}
      </div>`)
    console.log(htmlData)
    document.getElementById("postContainer").innerHTML=htmlData
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
