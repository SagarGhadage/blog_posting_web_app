import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Button, IconButton, TextField } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import pick from '../../utils/pick'
import { postBlogs } from '../../api/api';
import style from './MyEditor.module.css'

import { useSnackbar } from "notistack";

const MyEditor = ({ placeholder }) => {
	const editor = useRef(null);

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	const { enqueueSnackbar } = useSnackbar();
	console.log(content)

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

			let blog = {
				title: title,
				content: content,
				location: pick(location, ['ip', 'city', 'region', 'country', 'country_name', "country_code", "country_capital", "postal", "timezone"])
			}
			// console.log(blog, 'blog')
			validateInput(blog)
			let res = await postBlogs(blog)
			console.log(res)

			setContent('')
			setTitle('')
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
		</div>

	);
};
export default MyEditor

