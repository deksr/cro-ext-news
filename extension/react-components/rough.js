import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Modal from 'react-modal';
import {Router, Route, browserHistory, Link, IndexRoute} from 'react-router'

import  axios from 'axios';



var Rough = React.createClass({
	getInitialState: function() {
    return {
      bbc: 'initialbbc',
      cnn: 'initialcnn',
      ap: 'initialap'
    } 
  },


  // sendCheckBoxValue: function(event,type){
  //   console.log(event.target.checked)
  //   console.log(event.target.value)
  //   // console.log(event.target.type)



  //   let state = {}
  //   if(type === 'bbc') state.bbc = event.target.value
  //   if(type === 'cnn') state.cnn = event.target.value
  //   this.setState(state)
  //   // if (event.target.checked === true){
  //   //   console.log(type)
  //   // }
  // },


  sendCheckBoxValue: function(event,type){
    console.log(event.target.checked)
    console.log(event.target.value)
    // console.log(event.target.type)



    let state = {}
    if(type === 'bbc' && event.target.checked === true) 
    	state.bbc = event.target.value
    // else{ 
    // 	state.bbc = 'null'
    // }

    if(type === 'cnn') state.cnn = event.target.value
    this.setState(state)
    // if (event.target.checked === true){
    //   console.log(type)
    // }
  },


  submitForm: function(event){

  	// console.log(event.target.value)
  	// console.log(this.state.value)
  	// console.log(this.state.cnn)
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
		      <input  type="checkbox" value = "ap" onChange={function(event){ 
           return this.sendCheckBoxValue(event,'ap') 
        }.bind(this)}/> ap news
		      <button onClick={this.submitForm}> save </button>
		      {this.state.bbc}
		      {this.state.cnn}
	    </div>
    )
  } 

})

export default Rough


