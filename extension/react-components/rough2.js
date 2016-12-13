import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Modal from 'react-modal';
import {Router, Route, browserHistory, Link, IndexRoute} from 'react-router';
import  axios from 'axios';




var RoughTwo = React.createClass({

	getInitialState: function() {
    return {
      bbc: false,
      cnn: false
    } 
  },


  sendCheckBoxValue: function(event,type){
    console.log(event.target.checked)
    console.log(event.target.value)

    let state = {}

    if (type === 'bbc' && event.target.checked === true){
    	state.bbc = event.target.value;
    }	
    else if(type === 'cnn' && event.target.checked === true) {
    	state.cnn = event.target.value
    }
    else if (type === 'bbc' && event.target.checked === false){
    	state.bbc = !this.state.bbc
    }
    else if (type === 'cnn' && event.target.checked === false){
    	state.cnn = !this.state.cnn
    }

    this.setState(state)
  },


  submitForm: function(event){
  	console.log("clicked")
  	console.log(this.state)

	  axios.all([
	    axios.get(' https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab'),
	    axios.get('https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab')
	  ]).then(axios.spread(function (seat, volkswagen) {
	    console.log(seat.data);
	    console.log(volkswagen.data);})).catch(function(error){
	  		 console.log(error) })
	
  },



  render: function () {
    return (
	    <div>
		      <input  type="checkbox" value = "bbc" onChange={function(event){ 
           return this.sendCheckBoxValue(event,'bbc') 
        }.bind(this)}/> bbc news
		      <input  type="checkbox" value = "cnn" onChange={function(event){ 
           return this.sendCheckBoxValue(event,'cnn') 
        }.bind(this)}/> cnn news 
		      <button onClick={this.submitForm}> save </button>
		      {this.state.bbc}
		      {this.state.cnn}
	    </div>
    )
  } 



})





export default RoughTwo
