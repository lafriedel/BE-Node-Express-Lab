import React from 'react';

const Post = props => {
    return (
        <>
        <h1>{props.post.title}</h1>
        <p>{props.post.contents}</p>
        </>
    )
}

export default Post;