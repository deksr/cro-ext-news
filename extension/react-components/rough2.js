import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Modal from 'react-modal';
import {Router, Route, browserHistory, Link, IndexRoute} from 'react-router';
import  axios from 'axios';




var RoughTwo = React.createClass({

	getInitialState: function() {
    return {
      bbc: false,
      cnn: false,
      ap: false
    } 
  },


  sendCheckBoxValue: function(event,type){
    console.log(event.target.checked)
    console.log(event.target.value)


   // here we are setting the state
   // *******************************
    let state = {}

    if (type === 'bbc' && event.target.checked === true){
    	state.bbc = event.target.value;
    }	
    else if(type === 'cnn' && event.target.checked === true) {
    	state.cnn = event.target.value
    }
    else if(type === 'ap' && event.target.checked === true) {
    	state.ap = event.target.value
    }
    else if (type === 'bbc' && event.target.checked === false){
    	state.bbc = !this.state.bbc
    }
    else if (type === 'cnn' && event.target.checked === false){
    	state.cnn = !this.state.cnn
    }
    else if (type === 'cnn' && event.target.checked === false){
    	state.ap = !this.state.cnn
    }

    this.setState(state)
  },


  submitForm: function(event){
  	console.log("clicked")
  	console.log(this.state)

    var emptyarry = [];
    var stateobject = this.state
    var allinks = {
      bbc: ' https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab',
      cnn: 'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab',
      ap: 'https://newsapi.org/v1/articles?source=associated-press&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab'
    }

    for (var key in stateobject ) {
      console.log(key + " = " + stateobject[key]);
      if (typeof(stateobject[key])=== 'string'){
        console.log('im a string ' + key);
        if(Object.hasOwnProperty.call(stateobject, key)){
          console.log('showing links' + allinks[key])
          emptyarry.push(allinks[key])
        }
      }
    }






    // from mdn ******************************************
  	// var notifyMe = function () {
   //    if (!("Notification" in window)) {
   //      alert("This browser does not support desktop notification");
   //    }
   //    else if (Notification.permission === "granted") {
   //      var notification = new Notification("Hi there!");
   //    }
   //    else if (Notification.permission !== 'denied') {
   //      Notification.requestPermission(function (permission) {
   //        if (permission === "granted") {
   //          var notification = new Notification("Hi there!");
   //        }
   //      });
   //    }
   //  }

   //  notifyMe();

    // ******************************************







    // bbc value is recieved inside the object
  // if bbc is present inside the array or object, then match it with the corrsponding link and then push it to the axios.all []

  // if property value is not false then 










 


  	




	  // axios.all([
	  //   axios.get(' https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab'),
	  //   axios.get('https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab')
	  // ]).then(axios.spread(function (seat, volkswagen) {
	  //   console.log(seat.data);
	  //   console.log(volkswagen.data);})).catch(function(error){
	  // 		 console.log(error) })
	
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
