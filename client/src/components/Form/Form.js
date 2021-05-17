import React, { useState } from 'react'
import useStyles from './styles';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts'

export default function Form() {
    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    const classes = useStyles();

    const dispatch = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createPost(postData));
    }

    const clear = (e) => {
        e.preventDefault();
    }
    
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
            <Typography variant="h6">Creating a Memory</Typography>
            <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData(prevPostData => ({ ...prevPostData, creator: e.target.value }))} />
            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData(prevPostData => ({ ...prevPostData, title: e.target.value }))} />
            <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData(prevPostData => ({ ...prevPostData, message: e.target.value }))} />
            <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData(prevPostData => ({ ...prevPostData, tags: e.target.value }))} />

            <div>
                <FileBase 
                type="file"
                multiple={false}
                onDone={({base64}) => setPostData(prevPostData => ({ ...prevPostData, selectedFile: base64 }))}
                />
            </div>

            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    )
}
