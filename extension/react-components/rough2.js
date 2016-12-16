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


   // here we are setting the state logic
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
  	console.log(this.state) //calling the set state


    // logic for matching two objects and pulling out only the matched property name that has a string value and the one with false will be ignored.
    //refer to seeyesyes > objectified for simple reference
    // *******************************
 
    var emptyArray = [];
    var stateobject = this.state
    var allinks = {
      bbc: axios.get(' https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab'),
      cnn: axios.get('https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab'),
      ap: axios.get('https://newsapi.org/v1/articles?source=associated-press&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab')
    }


    // make sure to keep using this logic at intervals to make a request
    window.setInterval(function(){
      for (var key in stateobject ) {
        console.log(key + " = " + stateobject[key]);
        if (typeof(stateobject[key])=== 'string'){
          console.log(key);
          if(Object.hasOwnProperty.call(stateobject, key)){
            console.log(allinks[key])
            emptyArray.push(allinks[key])
          }
        }
      }
      console.log(emptyArray)



      // making the actual request + filtering the undefined objects + 
      // notes: when an argument is missing gives undefined. so filter using boolean hence : var allnews = [a, b].filter(Boolean) 
      // ********************************
      var newsTitle;
      axios.all(emptyArray).then(axios.spread(function (a, b) {
      // console.log(seat.data.articles);
        var allnews = [a, b].filter(Boolean) //filter undefined 

        for (var i = 0; i < allnews.length; i++) {
          var selectednews= allnews[i].data.articles.splice(0, 1)
          for (var j = 0; j < selectednews.length; j++) {
            newsTitle= selectednews[j].title; //this is for notification
          };
 

          //     notification
          // ********************************
          var notifyMe = function () {
            if (!("Notification" in window)) {
              alert("This browser does not support desktop notification");
            }
            else if (Notification.permission === "granted") {
              var notification = new Notification(newsTitle);
            }
            else if (Notification.permission !== 'denied') {
              Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                  var notification = new Notification("Hi there can you please add the data to me so I can start showing notifications!");
                }
              });
            }
          }

          notifyMe();
        }
      })).catch(function(error){
        console.log(error) })
      emptyArray.splice(0, emptyArray.length)//emptying the array
    }, 60000)  
  },


        // pseudo: 
          // what is not working? 
          //emptyarray has promises that gets pushed into it each time a promise setinterval is called. solution: emptying the array.

          // emptyarray = [] is empty. everytime a request is made, axios recieved empty array and no promise is returned the second time around. (check this again to see if I'm right?-yup `unexpected identifier` is the error). solutions: this is resolved. used setinterval.

          //same news is displayed. list of elements in the array is looped in intervals. not the top most news from ch earequest is displayed.

          //check to see if news data is same and then only display news that are new

          // localstorage will be used to remember the textbox choices
          //currently, same news gets displayed even after 10 minutes of interval request. So set state again. so it will check and see if any data has changed then it will render new notifications(???) 



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
