import React, { Component } from 'react';

import './App.css';
import { Myroute } from './compoent/signin'
import Fire from './compoent/Fire'

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{}
    }
  }
  componentDidMount(){
    this.authListener();
  }
  authListener(){
    Fire.auth().onAuthStateChanged((user)=>{
        if(user){
            this.setState({
              user
            })
        }
        else{
            this.setState({
              user:null
            })
        }
    })
  }
  render() {
    return (
      <div>
      {
        // this.state.user ? (<Home />) : (<Myroute/>)
      }
      <Myroute/>
      </div>
    );
  }
}

export default App;
