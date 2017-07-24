
import React from 'react';
import PostFooter from './postFooter.jsx';

class Post extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hover: false,
      transitioning: false,
    }
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.iconClick = this.iconClick.bind(this);
  }

  componentWillReceiveProps(newProps){
    if (this.props.onFavorites !== newProps.onFavorites){
      this.setState({transitioning: true});
      setTimeout(() => this.setState({transitioning: false}), 320);
    }
  }

  imageClass(){
    //Fill container only if it almost fills it already
    const image = this.props.post.preview.images[0].source;
    let ratio = image.height / image.width;
    if (ratio > 5/10 && ratio < 9.5/10)
      return "cover-image";
     else return "contain-image";
  }

  iconClass(){
    const { favorited, onFavorites } = this.props;
    if (favorited && !onFavorites)
      return "favorite-selected";
    else if (this.state.hover)
      return "favorite-hover";
    else return "favorite-unhover";
  }

  iconClick(e){
    this.props.handleFavorite(this.props.post.id);
  }

  badImage(){
    const { post } = this.props;
    return !post.preview || post.preview.images[0].source.url.includes(".gif");
  }

  onMouseOver(e){
    this.setState({ hover: true })
  }

  onMouseOut(e){
    this.setState({ hover: false })
  }

  render(){
      if (this.badImage()) return null;
      const { post, onFavorites } = this.props;
      const image = post.preview.images[0].source;
      let icon = onFavorites ? "fa-trash" : "fa-heart";
      if (this.state.transitioning) icon = null;
      return (
        <div className="post" onMouseOver={ this.onMouseOver } onMouseOut={ this.onMouseOut } >
          <i onClick={ this.iconClick } className={`fa ${icon} icon ${this.iconClass()}`} aria-hidden="true"></i>
          <div className="image-wrap">
            <img src={ image.url } className={ this.imageClass() } />
          </div>
          <h1>{ post.title }</h1>
          <PostFooter post={ post } hover={ this.state.hover } />
        </div>
      );
    }
  }

export default Post;
