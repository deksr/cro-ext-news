console.log("from react component");
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Modal from 'react-modal';
import {Router, Route, browserHistory, Link, IndexRoute} from 'react-router'


var Setting = React.createClass({

  getInitialState: function() {
    return {
      settingTab: ''
    } 
  },

  render: function () {
    return (
        <div className="main">
          <img src="img/chro-ext-news-logo.png" className="dog-image"/>
          <h5>News Shark</h5>
          <p> Latest news on the go!</p> 
          <label className="switch">
            <input type="checkbox"/>
            <div className="slider round"></div>
          </label> <br/>
          <a>settings</a>
        </div>
    )
  } 
});


ReactDOM.render(<Setting/>, document.getElementById("root"));
