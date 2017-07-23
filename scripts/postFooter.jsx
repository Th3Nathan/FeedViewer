

import React from 'react';
import { timeAgo } from './util';

const PostFooter = ( {post, hover} ) => {
  const textStyle = {
    "color": hover ? "#999": "#777"
  };
  return(
        <div className="post-footer">
          <i className="fa fa-user" aria-hidden="true"></i>&nbsp;
          <h5 style={ textStyle }>{ `/u/${post.author}` }</h5>
          <span>.</span>&nbsp;
          <i className="fa fa-clock-o" aria-hidden="true"></i>
          <h5 style={ textStyle }>{timeAgo(post.created_utc)}</h5>
          <span>.</span>&nbsp;
          <i className="fa fa-bolt" aria-hidden="true"></i>&nbsp;
          <h5 style={ textStyle }>{post.num_comments}</h5>
        </div>
      );
  }

export default PostFooter;
