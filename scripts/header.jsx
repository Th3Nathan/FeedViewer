
import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      channel: this.props.match.params.channel,
      searchText: "",
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(newProps){
    const channel = newProps.match.params.channel;
    if (this.props.match.params.channel === channel) return null;
    this.setState({ channel })
  }

  updateSearch(e){
    this.setState({ searchText: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    this.setState({ channel: this.state.searchText });
    const onFavorites = this.props.location.pathname.slice(-10) === "/favorites";
    const destination = onFavorites ?
      `/${this.state.searchText}/favorites` : this.state.searchText;
    this.props.history.push(destination);
  }

  render(){
    const { location, favoriteCount } = this.props;
    const { channel, searchText } = this.state;
    const onFavorites = location.pathname.slice(-10) === "/favorites"
    const subredditClass = onFavorites ? "" : "selected";
    const favoritesClass = onFavorites ? "selected" : "";
    return (
      <header>
        <Link to={`/${channel}`} className={`header-subreddit ${subredditClass}`}>
          <i className="fa fa-reddit-alien" aria-hidden="true"></i>
          <h2 className="header-text">{`/r/${channel}`}</h2>
        </Link>
        <Link to={`/${channel}/favorites`} className={`header-favorites ${favoritesClass}`}>
          <i className="fa fa-heart" aria-hidden="true"></i>
          <h2 className="header-text">favorites ({ favoriteCount })</h2>
        </Link>
        <form className="search-bar" onSubmit={ this.handleSubmit }>
          <label htmlFor="search">
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
          <input id="search" onChange={ this.updateSearch } placeholder="search" value={ searchText }></input>
        </form>
      </header>
    );
  }
}

export default withRouter(Header);
