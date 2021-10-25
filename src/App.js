import React, { Component } from "react";
import Axios from "axios";
import "./App.css";

const apiEndPoint = "https://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const { data: posts } = await Axios.get(apiEndPoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await Axios.post(apiEndPoint, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "updated";
    await Axios.put(apiEndPoint + "/" + post.id, post);
    // with patch we can send only the properties that must be updated
    // Axios.patch(apiEndPoint + "/" + post.id, { title: post.title });

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await Axios.delete("s" + apiEndPoint + "/" + post.id);
      throw new Error("");
    } catch (ex) {
      /* Will be set if we sucessfully submit a request to the server.
      Otherwise is going to be null.
      ex.request
      This property is set if we sucessfully get a response from
      the server. If the network is down or the server crashes, we
      wont get a response so it will be null.
      ex.response
      Expected (404: not found, 400: bad request) / CLIENT ERRORS
      - Display a specific error message */

      if (ex.response && ex.response.status === 404)
        alert("This post has already been deleted.");
      else {
        console.log("Logging the error", ex);
        alert("Unexpected error");
      }
      // Unexpected (network down, server down, db down, bug)
      // - Log them
      // - Display a generic and friendly error message
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;