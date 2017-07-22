
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { timeAgo } from './util';
import Post from './post';

class List extends React.Component {
  constructor(props){
    super(props);
    this.state = { json: {} };
  }

  componentDidMount(){
      fetch('https://www.reddit.com/r/aww/top/.json')
        .then(response => response.json())
          .then(json => {
        this.setState({ json });
      });
  }

  posts(){
    const jsonPosts = this.state.json.data.children
    return Object.keys(jsonPosts).map(i => {
      let post = jsonPosts[i].data;
      return (
        <Post post={post} key={i} />
      );
    });
  }

  render(){
    if (!this.state.json.data) return null;
    let posts = this.posts();
    return (
      <div className="list">
        { posts }
      </div>
    );
  }
}

export default List;
