import React, {Component} from 'react';
import songsSearch from './components/songsSearch/songsSearch'
import logo from './logo.svg';
import './App.css';


export default class App extends Component{
  constructor(props:string) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    }

  }
  render() {
    console.log(this.state);
    return(
      <div>
        <h3>Welcome to karaokemp!</h3>
        <p>refactor to components</p>
      </div>
    )
  }
}
