
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { timeAgo } from './util';
class Post extends React.Component {
  constructor(props){
    super(props);
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

  badImage(){
    const { post } = this.props;
    const image = post.preview.images[0].source;
    return !post.preview || image.url.includes(".gif");
  }

  render(){
      if (this.badImage()) return null;
      const { post } = this.props;
      const image = post.preview.images[0].source;

      return (
        <div className="post">
          <div className="image-wrap">
            <img src={ image.url } style={this.imageStyle()} />
          </div>
          <h1>{ post.title }</h1>
          <div className="post-footer">
            <i className="fa fa-user" aria-hidden="true"></i>&nbsp;
            <h5>{`/u/${post.author}`}</h5>
            <span>.</span>&nbsp;
            <i className="fa fa-clock-o" aria-hidden="true"></i>
            <h5>{timeAgo(post.created_utc)}</h5>
            <span>.</span>&nbsp;
            <i className="fa fa-bolt" aria-hidden="true"></i>&nbsp;
            <h5>{post.num_comments}</h5>
          </div>
        </div>
      );
    }
  }

export default Post;
