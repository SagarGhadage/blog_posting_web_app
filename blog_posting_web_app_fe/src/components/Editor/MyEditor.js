import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import pick from '../../utils/pick'
import { postBlogs, updateBlogById } from '../../api/api';
import style from './MyEditor.module.css'

import { useSnackbar } from "notistack";
import { useNavigate, Link } from "react-router-dom";

const MyEditor = ({ blog, placeholder }) => {
	const editor = useRef(null);


	const [isEditing, setIsEdit] = useState(blog ? true : false);
	const [title, setTitle] = useState(blog?.title || '');
	const [content, setContent] = useState(blog?.content ? blog.content : '');

	const { enqueueSnackbar } = useSnackbar();
	const history = useNavigate()
	console.log(content)
	// console.log(blog?blog:'new',blog)
	const config =
	{
		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
		placeholder: placeholder || 'Make a Beautiful Post, you can make use of Images and videos and lot of text formats '
	}

	const outletContext = useOutletContext()
	// console.log(outletContext)
	const handleSubmit = async (e) => {
		try {
			let location = outletContext.userLocation

			let newblog = {
				title: title,
				content: content,
				location: pick(location, ['ip', 'city', 'region', 'country', 'country_name', "country_code", "country_capital", "postal", "timezone"])
			}
			// console.log(blog, 'blog')
			validateInput(newblog)
			if (isEditing) {
				delete newblog.location;
				let res = await updateBlogById(blog?._id, newblog)
				enqueueSnackbar("Updated !", { variant: "success" });

				console.log(res)
			} else {
				let res = await postBlogs(newblog)
				console.log(res)
				enqueueSnackbar("Blog posted! ", { variant: "success" });

			}
			// console.log(res)
			setContent('')
			setTitle('')
			if (isEditing) { history('/myblogs') }
			else { history('/') }

		}
		catch (error) {
			if (error.response && error.response.data) {
				enqueueSnackbar(error.response.data.message, { variant: "error" });
			}
			else {
				enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", { variant: "error" });
			}
		}

	}

	const validateInput = (blog) => {
		if (blog.title == "") {
			enqueueSnackbar("title is a required ", { variant: "warning" })
			return false;
		}
		if (blog.content == "") {
			enqueueSnackbar("content is a required to create blog", { variant: "warning" })
			return false;
		}
		return true
	};

	const previewBlog = async (blog) => {
		let htmlData =
			`<h1 style='text-align: center;'>${blog.title}</h1>
		${blog.content}
		`
		// `<div style="min-height: 100px;width: 80%; background-color: aliceblue;margin: 5% auto; padding: 5%;overflow: scroll;scrollbar-width: none; ">
		// </div>`

		document.getElementById('blogPreview').innerHTML = htmlData;
	}

	useEffect(() => {
		let location = outletContext.userLocation

		let blog = {
			title: title,
			content: content,
			location: pick(location, ['ip', 'city', 'region', 'country', 'country_name', "country_code", "country_capital", "postal", "timezone"])
		}
		previewBlog(blog)
	}, [content, title])

	return (
		<div className={style.container}>
			<TextField id="title" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} variant="outlined" fullWidth />

			<JoditEditor
				ref={editor}
				value={content}
				config={config}
				tabIndex={1} // tabIndex of textarea
				onBlur={newContent => setContent(newContent)}
			// onChange={newContent => {setContent(newContent)}} //performance issue  resolved
			/>

			<IconButton onClick={() => { handleSubmit() }} fullWidth >
				{/* <Button >  </Button> */}
				<Button variant="contained" fullWidth>Post Blog</Button>

			</IconButton>
			<Typography variant="h1" textAlign={'center'} component="h1" sx={{ flexGrow: 1, color: 'text.bgdark' }} >
				Preview
			</Typography>
			{/* <div style:{{min-height: 100px;width: 80%; background-color: aliceblue;margin: 5% auto; padding: 5%;overflow: scroll;scrollbar-width: none; "}> */}
			<div id='blogPreview' style={{ marginTop: '3%', minHeight: '100px', width: '90%', backgroundColor: 'aliceblue', padding: '5%', overflow: 'scroll', border: '1px solid lightblue ' }}></div>

		</div>

	);
};
export default MyEditor

