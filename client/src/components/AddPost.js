import React from 'react';

const AddPost = props => {
    return (
        <>
            <h2>Add a Post</h2>
            <p className="error">{props.error && "There was an error. Please fill out all information."}</p>
            <form onSubmit={e => props.addNewPost(e)}>
                <input type="text" name="title" value={props.title} placeholder="Post title" onChange={e => props.handleChange(e)} />
                <input type="text" name="contents" value={props.contents} placeholder="Post contents" onChange={e => props.handleChange(e)} />
                <button>Add Post</button>
            </form>
        </>
    )
}

export default AddPost;