console.log("from react component");
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Modal from 'react-modal';
import {Router, Route, browserHistory, Link, IndexRoute} from 'react-router'
import ToggleButton from 'react-toggle-button'
import Toggle from 'react-toggle' //using this now
import  axios from 'axios';
import Rough from './rough.js'



var SettingList = React.createClass({

  getInitialState: function() {
    return {
      checkboxBBC: 'bbc',
      checkboxCNN: 'cnn',
      checkboxAP: 'ap'
    } 
  },


  sendCheckBoxValue: function(e){
    // console.log("selected")
    // console.log(e.target.checked)//this is for the value = {this.state.checkboxValue} which sends true if selected
    // console.log(this.refs.textInput.value)//this is for the ref="textInput"
    console.log(this.refs.textInput.value)//this is for the ref="textInput"


    this.setState({
      checkboxBBC: 'bbc',
      checkboxCNN: 'CNN',
      checkboxAP: 'AP'
    });

    // console.log(e.target.value)//this is for the value 



   //  axios.get('https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=60941c39a76e4f14902097a5030f4cab').then(function (response) {
   //  // console.log(response.data.pokemon);
   // console.log(response.data)
 
  // })

  },
  

  render: function () {
    return (
      <div>
        <p><input type="checkbox" ref="textInput" value={this.state.checkboxBBC} onChange={this.sendCheckBoxValue}/>BBC</p> 
        <p><input type="checkbox" ref="textInput" value={this.state.checkboxCNN} onChange={this.sendCheckBoxValue}/>CNN</p> 
        <p><input type="checkbox" ref="textInput" value={this.state.checkboxAP} onChange={this.sendCheckBoxValue}/>AP</p> 
        <p>{this.state.checkboxBBC} </p>   
      </div>
    )
  } 
})







var SettingButton = React.createClass({



  getInitialState: function() {
    return {
      settingTab: false
    } 
  },

  showSettings: function(e){
    e.preventDefault();
    console.log("clicked"); 
    this.setState({
      settingTab: !this.state.settingTab
    })
  },

  render: function () {
    return (
      <div className="main">
        <img src="img/chro-ext-news-logo.png" className="dog-image"/>
        <h5>News Shark</h5>
        <p> Latest news on the go!</p>  
        <a className="settings-button" onClick={this. showSettings}>settings</a><br/> 
        {this.state.settingTab && <SettingList/>}
        <Rough/>
      </div>
    )
  } 
});


ReactDOM.render(<SettingButton/>, document.getElementById("react-on-off-button"));
