import React, { useState, useRef, useMemo, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { Button, IconButton } from '@mui/material';
import { useOutletContext } from 'react-router-dom';
import pick from '../../utils/pick'
import { postBlogs } from '../../api/api';
import style from './MyEditor.module.css'
const MyEditor = ({ placeholder }) => {
	const editor = useRef(null);
	const [content, setContent] = useState('');
	console.log(content)
	const config =
	{
		readonly: false, // all options from https://xdsoft.net/jodit/docs/,
		placeholder: placeholder || 'Make a Beautiful Post, you can make use of Images and videos and lot of text formats '
	}
	const outletContext = useOutletContext()
	// console.log(outletContext)
	const handleSubmit = async (e) => {
		let location = outletContext.userLocation
		console.log(location)
		let blog = {
			title: "title",
			content: content,
			location: pick(location, ['ip', 'city', 'region', 'country', 'country_name', "country_code", "country_capital", "postal", "timezone"])
		}
		console.log(blog, 'blog')
		let res = await postBlogs(blog)
		console.log(res)
		setContent('')
	}
	useEffect(() => {
		// console.log(outletContext)
	},)
	return (
		<div className={style.container}>
			<JoditEditor
				ref={editor}
				value={content}
				config={config}
				tabIndex={1} // tabIndex of textarea
				onBlur={newContent => setContent(newContent)}
			// onChange={newContent => {setContent(newContent)}} //performance issue  
			/>
			
			<IconButton onClick={() => { }} >
				<Button onClick={handleSubmit} > Post Blog </Button>
			</IconButton>
		</div>

	);
};
export default MyEditor