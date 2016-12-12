import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Modal from 'react-modal';
import {Router, Route, browserHistory, Link, IndexRoute} from 'react-router'

import  axios from 'axios';



var Rough = React.createClass({


  sendCheckBoxValue: function(event,type){
    console.log(event.target.checked)
    console.log(event.target.value)


    if (event.target.checked === true){
      console.log(type)
    }
  },


 render: function () {
   return (
    <div>
    <p>
      <input 
        type="checkbox"
        value="bbc"
        onChange={ function(event){ 
           return this.sendCheckBoxValue(event,'cat') 
        }.bind(this) }/>
      CAT 
   </p> 
    <p>
      <input 
        type="checkbox" 
        value="cnn"
        onChange={ function(event){ 
           return this.sendCheckBoxValue(event,'dog') 
        }.bind(this) }/>
      DOG
   </p> 
 

  </div>
   )
  } 

})

export default Rough


