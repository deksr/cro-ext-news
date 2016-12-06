console.log("this is script.js");
var request = require('browser-request')
import  axios from 'axios';

// this is still giving an error 401 because it is not able to access the data. need to register
// $(document).ready(function(){
	// $.ajax({
 //    url: "http://eventregistry.org/json/article?ignoreKeywords=&keywords=fruits%20nuts&action=getArticles&resultType=articles&callback=JSON_CALLBACK",
 //    method: 'GET',
 //    dataType: "json"
 //  }).fail(function (err) {
 //  	console.log(err)
 //  }).done(function(data) {
 //    console.log(data); 
 //  })

// 	$.ajax({
// 	    url: "http://eventregistry.org/json/article?ignoreKeywords=&keywords=fruits%20nuts&action=getArticles&resultType=articles",
// 	    method: 'POST',
// 	    dataType: "json",
// 	    data: {"username": "d@yahoo.com", "password": "paword"}
// 	  }).fail(function (err) {
// 	  	console.log(err)
// 	  }).done(function(data) {
// 	    console.log(data); 
// 	  })
// })


// this works:
 axios.get('https://newsapi.org/v1/articles?source=the-next-web&sortBy=latest&apiKey=60941c39a76e4f14902097a5030f4cab').then(function (response) {
    // console.log(response.data.pokemon);
   console.log(response.data)
 
  })


// below code works:
 // axios.get('http://eventregistry.org/json/suggestConcepts?prefix=deer&lang=eng').then(function (response) {
 //    // console.log(response.data.pokemon);
 //   console.log(response.data)
 //  })


 // **********Not post but tried with post** gives 401 error as usual
 // axios.post('http://eventregistry.org/json/article?sourceUri=www.bbc.co.uk&sourceUri=www.nytimes.com&ignoreKeywords=&keywords=fruits%20nuts&dateStart=2016-12-01&dateEnd=2016-12-05&lang=eng&action=getArticles&resultType=articles&callback=JSON_CALLBACK').then(function (response) {
 //    // console.log(response.data.pokemon);
 //   console.log(response)

 //  }).catch(function (error) {
 //    console.log(error);
 //  });



 // ********** gives 401 error as usual
// request({method:'GET', url:'http://eventregistry.org/json/article?sourceUri=www.bbc.co.uk&sourceUri=edition.cnn.com&sourceUri=www.nytimes.com&ignoreKeywords=&keywords=vitamin%20d%20%2B%20eggs&lang=eng&action=getArticles&resultType=articles&callback=JSON_CALLBACK', body:'{"relaxed":true}', json:true}, on_response)

// function on_response(er, response, body) {
//   if(er){
//   	console.log(er)
//   }
//   else {
//   	console.log(response)
//   }
  
// }
