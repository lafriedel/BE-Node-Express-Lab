import React, { Component } from "react";
import axios from "axios";

import Post from "./components/Post";
import AddPost from "./components/AddPost";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
    post: {
      title: "",
      contents: ""
    },
    error: false,
    isUpdating: false
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/posts")
      .then(res => {
        this.setState({
          posts: res.data.posts.reverse()
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      post: {
        ...this.state.post,
        [e.target.name]: e.target.value
      }
    });
  };

  addNewPost = () => {
    axios
      .post("http://localhost:5000/api/posts", this.state.post)
      .then(res => {
        axios.get("http://localhost:5000/api/posts")
        .then(res => {
          this.setState({
            posts: res.data.posts.reverse(),
            post: {
              title: "",
              contents: ""
            },
            error: false
          });
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ...this.state,
          error: true
        });
      });
  };

  populateForm = (e, id) => {
    e.preventDefault();
    this.setState({
      isUpdating: true,
      post: this.state.posts.find(post => post.id === id)
    })
  }

  updatePost = () => {
    axios.put(`http://localhost:5000/api/posts/${this.state.post.id}`, this.state.post)
    .then(res => {
      axios.get("http://localhost:5000/api/posts")
      .then(res => {
        this.setState({
          posts: res.data.posts.reverse(),
          post: {
            title: "",
            contents: ""
          },
          error: false,
          isUpdating: false
        });
      })
      .catch(err => {
        console.log(err);
      })
    })
    .catch(err => {
      console.log(err);
      this.setState({
        ...this.state,
        error: true
      });
    });
  }

  render() {
    return (
      <div className="App">
        <AddPost
          isUpdating={this.state.isUpdating}
          error={this.state.error}
          addNewPost={this.addNewPost}
          updatePost={this.updatePost}
          handleChange={this.handleChange}
          title={this.state.post.title}
          contents={this.state.post.contents}
        />
        {this.state.posts.map(post => (
          <Post populateForm={this.populateForm} post={post} key={post.id} />
        ))}
      </div>
    );
  }
}

export default App;
