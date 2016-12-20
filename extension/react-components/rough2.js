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
  	// console.log("clicked")
  	console.log(this.state) //calling the set state


    // logic for matching two objects 
    // *******************************

    var stateobject = this.state
    var allinks = {
      bbc: 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab',
      cnn:'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab',
      ap: 'https://newsapi.org/v1/articles?source=associated-press&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab'
    }
    var emptyArray = [];//to store the value of matched properties
    var arrayWithAxiosget = [];// add axios.get before each value

    var newsTitle; //this is for notification
    var doubleCheckNewsOne = [] //saved notification titles 
    var doubleCheckNewsTwo = []




    // make sure to keep using this logic at intervals to make a request
    var requestToApi = function(timeIntervals){
      for (var key in stateobject ) {
        if (typeof(stateobject[key])=== 'string'){
          if(Object.hasOwnProperty.call(stateobject, key)){
            emptyArray.push(allinks[key])
          }
        }
      }

      // add axios.get for all the elements in the array
      // ********************************
      emptyArray.forEach(function(e){
        arrayWithAxiosget.push(axios.get(e))
      })


      // making the actual request + filtering the undefined objects 
      // ********************************
      axios.all(arrayWithAxiosget).then(axios.spread(function (a, b) {
        var allnews = [a, b].filter(Boolean) //filter undefined 
        // console.log(allnews)


        for (var i = 0; i < allnews.length; i++) {
          var selectednews= allnews[i].data.articles.splice(0, 1)
          console.log(selectednews)//logs as object
          for (var j = 0; j < selectednews.length; j++) {
            newsTitle= selectednews[j].title;
            // console.log(newsTitle);

            if(timeIntervals === 50000 ){
              oldNewsStuff()
            }
            else{
              newNewsStuff()
            }

          };
        }//closing bracket of for loop 
      })).catch(function(error){
        console.log(error) })
      
      arrayWithAxiosget.splice(0, arrayWithAxiosget.length)// empty the axios request array
      // console.log(arrayWithAxiosget)
      emptyArray.splice(0, emptyArray.length)//emptying array with similar properties



   


      // checking if news is same or old
      // ********************************
      // if(doubleCheckNewsOne.sort().join() !== doubleCheckNewsTwo.sort().join()){
      //   console.log("no fresh news")
      //   return;
      // }
      // else{
      //   console.log("hello there is fresh news")
      //   console.log(doubleCheckNewsOne);
      //   console.log(doubleCheckNewsTwo);
      // }
    }



    var oldNewsStuff = function(){
      doubleCheckNewsOne.push(newsTitle);
    }

    var newNewsStuff = function(){
      doubleCheckNewsTwo.push(newsTitle);

      // // logic is screwed up!! from here

      // if (doubleCheckNewsOne === doubleCheckNewsTwo){
      //   console.log("same news")
      // }
      // else{
      //   console.log(doubleCheckNewsOne)
      //   console.log(doubleCheckNewsTwo)
      //   doubleCheckNewsOne.splice(0, doubleCheckNewsOne.length);
      //   doubleCheckNewsTwo.splice(0, doubleCheckNewsTwo.length)

      // }

      // ///to here
    }


    window.setInterval(requestToApi.bind(this, 50000), 50000) 
    window.setInterval(requestToApi.bind(this, 60000), 60000)  
  },



// pseudo:
//logic is screwed up:


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
