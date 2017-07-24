
import React from 'react';
import Header from './header';
import List from './list'
import {withRouter} from 'react-router-dom';

class Wrapper extends React.Component {
  constructor(props){
    super(props)
    let channel = this.props.match.params.channel;
    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.state = { favoriteCount: this.setFavorite(channel) }
  }

  componentWillReceiveProps(newProps){
    const newChannel = newProps.match.params.channel;
    this.setState({
      favoriteCount: this.setFavorite(newChannel)
    });
  }

  addFavorite(){
    this.setState({favoriteCount: this.state.favoriteCount + 1});
  }

  setFavorite(channel){
    let favorites = JSON.parse(window.localStorage.getItem(channel))
    return !favorites ? 0 : Object.keys(favorites).filter(k => favorites[k]).length;
  }

  removeFavorite(){
    this.setState({favoriteCount: this.state.favoriteCount - 1});
  }

  render(){
    return (
      <div>
        <Header
          favoriteCount={ this.state.favoriteCount }
        />
        <List
          addFavorite={ this.addFavorite }
          removeFavorite={ this.removeFavorite }
        />
      </div>
    );
  }
}

export default Wrapper;
