
import React from 'react';
import { withRouter } from 'react-router-dom';
import Post from './post';
import Error from './error';

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
    const channelFavorited = window.sessionStorage.getItem(channel) === "undefined" ?
      {} : JSON.parse(window.sessionStorage.getItem(channel));
    this.setState({
      favorites: { [channel]: channelFavorited }
    });
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
      this.setState({
        json,
        favorites: { [oldChannel]: null },
        favorites: { [newChannel]: JSON.parse(window.sessionStorage.getItem(newChannel)) }
      });
    });
  }

  handleFavorite(postId){
    const { addFavorite, removeFavorite } = this.props;
    const channel = this.props.match.params.channel;
    let favoriteIds = this.state.favorites[channel] || {};
    const isFavorited = favoriteIds[postId];

    isFavorited ? this.props.removeFavorite() : this.props.addFavorite();
    favoriteIds[postId] = !favoriteIds[postId];
    window.sessionStorage.setItem(channel, JSON.stringify(favoriteIds));
    this.setState({favorites: {[channel]: favoriteIds}});
  }


  errorFound(){
    return !this.state.json.data || this.posts().every(el => el === null);
  }

  posts(){
    const jsonPosts = this.state.json.data.children;
    let channel = this.props.match.params.channel;
    let favoritedIds = this.state.favorites[channel];
    const onFavorites = this.props.location.pathname.slice(-10) === "/favorites";

    let posts = Object.keys(jsonPosts).map(i => {
      let post = jsonPosts[i].data;
      let favorited = !!favoritedIds && favoritedIds[post.id]
      if (onFavorites && !favorited) return null;
      return (
        <Post
          post={ post }
          key={ i }
          favorited={ favorited }
          onFavorites={ onFavorites }
          handleFavorite={ this.handleFavorite }
        />
      );
    });
    return posts;
  }

  render(){
    if (this.errorFound()) return <Error />;
    let posts = this.posts();
    return (
      <div className="list">
        { posts }
      </div>
    );
  }
}

export default withRouter(List);
