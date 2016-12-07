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
      <div>
      <a href="#">settings</a>
      </div>
    )
  } 
});


ReactDOM.render(<Setting/>, document.getElementById("root"));
