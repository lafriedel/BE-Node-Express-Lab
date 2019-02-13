import React from 'react';

const Post = props => {
    return (
        <>
        <h1>{props.post.title}</h1>
        <p>{props.post.contents}</p>
        <button onClick={e => props.populateForm(e, props.post.id)}>Update Post</button>
        </>
    )
}

export default Post;