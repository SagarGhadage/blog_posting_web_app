import React, { useContext } from 'react'
import MyEditor from '../../components/Editor/MyEditor'
import { TextField, Typography } from '@mui/material'
import { AuthContext } from '../../utils/AuthContex';
import { useNavigate, Link } from "react-router-dom";

export default function EditBlog({blog}) {
  const context = useContext(AuthContext)
  const history=useNavigate()
  console.log(context)
  if(context.blogToEdit===0){history('/myblogs')}
  return (
    <>
      <Typography variant="h1" textAlign={'center'} component="h1" sx={{ flexGrow: 1, color: 'text.bgdark' }} mt={'1%'} >
        Edit Blog
      </Typography>

      <MyEditor blog={context?.blogToEdit}/>
    </>
  )
}
