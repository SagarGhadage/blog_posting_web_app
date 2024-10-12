import React from 'react'
import MyEditor from '../../components/Editor/MyEditor'
import { TextField, Typography } from '@mui/material'


export default function CreatePost() {
  return (
    <>
      <Typography variant="h1" textAlign={'center'} component="h1" sx={{ flexGrow: 1, color: 'text.bgdark' }} mt={'1%'} >
        Create New Blog
      </Typography>

      <MyEditor />
    </>
  )
}
