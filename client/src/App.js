import React, { Component } from 'react';
import axios from "axios";

import Post from './components/Post';
import AddPost from './components/AddPost';
import './App.css';

class App extends Component {
  state = {
    posts: [],
    post: {
      title: "",
      contents: ""
    },
    error: false
  }
  componentDidMount() {
    axios.get("http://localhost:5000/api/posts")
      .then(res => {
          this.setState({
            posts: res.data.posts
          })
        })
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      post: {
        ...this.state.post,
        [e.target.name]: e.target.value
      }
    })
  }

  addNewPost = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/posts", this.state.post)
      .then(res => {
        axios.get("http://localhost:5000/api/posts")
        .then(res => {
            this.setState({
              posts: res.data.posts,
              post: {
                title: "",
                contents: ""
              },
              error: false
            })
          })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ...this.state,
          error: true
        })
      })
  }
  render() {
    return (
      <div className="App">
        {this.state.posts.map(post => (
          <Post post={post} key={post.id} />
        ))}
        <AddPost error={this.state.error} addNewPost={this.addNewPost} handleChange={this.handleChange} title={this.state.post.title} contents={this.state.post.contents} />
      </div>
    );
  }
}

export default App;
