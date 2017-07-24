
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { timeAgo } from './util.js';
import Post from './post';

class List extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      json: {},
      favorites: {}
     };
     this.handleFavorite = this.handleFavorite.bind(this);
  }

  componentWillMount(){
    const channel = this.props.match.params.channel;
    const channelFavorited = window.localStorage.getItem(channel) === "undefined" ?
      {} : JSON.parse(window.localStorage.getItem(channel));
    this.setState({
      favorites: { [channel]: channelFavorited}
    });
  }

  handleFavorite(postId){
    let channel = this.props.match.params.channel;
    let favoriteIds = this.state.favorites[channel] || {};
    favoriteIds[postId] = !favoriteIds[postId];

    window.localStorage.setItem(channel, JSON.stringify(favoriteIds));
    console.log(JSON.parse(window.localStorage.getItem(channel)))
    this.setState({ favorites: {[channel]: favoriteIds} });
  }

  componentDidMount(){
    fetch(`https://www.reddit.com/r/${this.props.match.params.channel}/top/.json`)
      .then(response => response.json())
        .then(json => {
      this.setState({ json });
    });
  }

  componentWillReceiveProps(newProps){
    const newChannel = newProps.match.params.channel;
    const oldChannel = this.props.match.params.channel;
    if (oldChannel === newChannel) return null;
    fetch(`https://www.reddit.com/r/${newChannel}/top/.json`)
      .then(response => response.json())
        .then(json => {
      this.setState({ json });
      this.setState({ favorites: {[oldChannel]: null}});
      this.setState({ favorites: {[newChannel]: JSON.parse(window.localStorage.getItem(newChannel))}});
    });
  }

  posts(){
    const jsonPosts = this.state.json.data.children;
    let channel = this.props.match.params.channel;
    let favoritedIds = this.state.favorites[channel];
    return Object.keys(jsonPosts).map(i => {
      let post = jsonPosts[i].data;
      let favorited = !!favoritedIds && favoritedIds[post.id]
      return (
        <Post post={post} key={i} favorited={favorited} handleFavorite={ this.handleFavorite } />
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
