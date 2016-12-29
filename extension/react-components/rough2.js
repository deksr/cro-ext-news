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


  componentDidMount: function(){

    chrome.storage.sync.get('oldNews', function(result){
      console.log(result)
    })


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


    // variables used
    //********************************

    var emptyArray = [];//to store the value of matched properties
    var arrayWithAxiosget = [];// add axios.get before each value
    var doubleCheckNewsOne = [] //saved notification titles 
    var joinToSingleString = [] //to join news into one single string
    var newsTitle; //this is for notification




    // use dummy data to set inside the chrome storage initially
    //********************************
    chrome.storage.sync.clear(function(){
      console.log("cleared")
    })

    // chrome.storage.sync.set({'oldNews': ["dummy data", "dummy data"]}, function() {
    //   console.log('dummy data saved saved');
    // });








    // logic for matching two objects 
    // *******************************

    var stateobject = this.state
    var allinks = {
      bbc: 'https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab',
      cnn:'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab',
      ap: 'https://newsapi.org/v1/articles?source=associated-press&sortBy=top&apiKey=60941c39a76e4f14902097a5030f4cab'
    }




    // make sure to keep using this logic at intervals to make a request
    //********************************

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
            doubleCheckNewsOne.push(newsTitle);
            // console.log(doubleCheckNewsOne)
            joinToSingleString = doubleCheckNewsOne.join()
            console.log(joinToSingleString) 
          };
        }//closing bracket of for loop



        // chrome storage get and set new values
        //***************************************

        chrome.storage.sync.get('oldNews', function(result){
          console.log(result) //this brings out the dummy data 

          // console.log(doubleCheckNewsOne)
          if ( result.oldNews !== joinToSingleString){

            chrome.storage.sync.set({'oldNews': joinToSingleString}, function() {
              console.log('news is saved + send a push notification of doubleCheckNewsOne');


              // Using promises, since doublechecnews was getting emptied even before the loop was being run
              // **********************

              var firstWork = function(){
                return new Promise(function(resolve, reject){
                  for (var i = 0; i < doubleCheckNewsOne.length; i++) {

                    // invoking the chrome notification
                    // ********************
                    chrome.notifications.create(
                      {
                        type: "basic",
                        title:  doubleCheckNewsOne[i],
                        message: "world",
                        iconUrl:"img/chro-ext-news-logo.png"
                      },
                      function(){
                        console.log("notification posted")
                      }
                    )

                    resolve('First promise function');
                  }
               })
              }



              var secondWork = function(){  
                return new Promise(function(resolve, reject){
                  doubleCheckNewsOne.splice(0, doubleCheckNewsOne.length)
                  joinToSingleString = null; //assign null 
                  resolve('First promise function');   
                })
              }



              firstWork().then(function(firstWorkResult){
                console.log(firstWorkResult)
                return secondWork() 
              }).then(function(secondWorkResult){
                console.log(secondWorkResult)
              })

              // *********end of promise***************  
    
            })//closing bracket for chrome storage
  
          }
          else{
            console.log("sameold news dont do anything");
            doubleCheckNewsOne.splice(0, doubleCheckNewsOne.length)
            return; 
          }
        })


      })).catch(function(error){
        console.log(error) })
      
      arrayWithAxiosget.splice(0, arrayWithAxiosget.length)// empty the axios request array
      // console.log(arrayWithAxiosget)
      emptyArray.splice(0, emptyArray.length)//emptying array with similar properties

      // console.log("I log null:" +  joinToSingleString)

    }

    window.setInterval(requestToApi.bind(this, 50000), 50000)
  
  },


// pseudo: 1. things to add: when save is clicked without selecting anything, false value is submited and it still makes request. make sure o set a condiion on this! 
//2. remember the checkd inboxes even when the browser is closed.
//3. bring the state as a prop to componentdidmount  



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
