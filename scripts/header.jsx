
import React from 'react';
import { withRouter, Link } from 'react-router-dom';
class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      favoriteCount: 0,
    }
  }


  render(){
    const { location } = this.props;
    const onFavorites = location.pathname === "/favorites";
    const subredditClass = onFavorites ? "" : "selected";
    const favoritesClass = onFavorites ? "selected" : "";
    return (
      <header>
        <Link to="" className={`header-subreddit ${subredditClass}`}>
          <i className="fa fa-reddit-alien" aria-hidden="true"></i>
          <h2 className="header-text">/r/analog</h2>
        </Link>
        <Link to="favorites" className={`header-favorites ${favoritesClass}`}>
          <i className="fa fa-heart" aria-hidden="true"></i>
          <h2 className="header-text">favorites ({this.state.favoriteCount})</h2>
        </Link>
      </header>
    );
  }
}

export default withRouter(Header);
