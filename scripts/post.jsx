
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { timeAgo } from './util';
import PostFooter from './postFooter.jsx';

class Post extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      hover: false,
      favorited: false
    }
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.heartClick = this.heartClick.bind(this);
  }

  imageStyle(){
    //Fill container only if it almost fills it already
    const image = this.props.post.preview.images[0].source;
    let ratio = image.height / image.width;
    if (ratio > 5/10 && ratio < 9.5/10)
      return {
        'objectFit': "cover",
        'width': "inherit"
      };
     else return {
      'objectFit': "contain",
      'width': "100%"
    };
  }

  heartStyle(){
    if (this.state.favorited){
      return {
        "transform": "translate(450px, 20px)",
        "color": "red"
      }
    }
    else if (this.state.hover){
      return {
        "transform": "translate(20px, 20px)"
      };
    } else return {
      "transform": "translate(-20px, -20px)"
    }
  }

  heartClick(e){
    this.setState({favorited: !this.state.favorited})
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
      const { post } = this.props;
      const image = post.preview.images[0].source;

      return (
        <div className="post" onMouseOver={ this.onMouseOver } onMouseOut={ this.onMouseOut } >
          <i style={ this.heartStyle() } onClick={ this.heartClick } className="fa fa-heart heart" aria-hidden="true"></i>
          <div className="image-wrap">
            <img src={ image.url } style={this.imageStyle()} />
          </div>
          <h1>{ post.title }</h1>
          <PostFooter post={ post } hover={ this.state.hover } />
        </div>
      );
    }
  }

export default Post;
