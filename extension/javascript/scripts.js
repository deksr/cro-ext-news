// console.log("from javascript extension");

// $( document ).ready(function() {
//   console.log( "ready from jquery!" );


//   $('.settings-button').click(function(event) {
//     $('.checkbox-list').toggle() ;
//   });

// });






// document.addEventListener('DOMContentLoaded', function() {


//   var checkPageButton = document.getElementById('checkPage');
//   checkPageButton.addEventListener('click', function() {

//   document.getElementById("demo").innerHTML = "Hello World";



//     chrome.tabs.create({'url': "/options.html" } )


//     chrome.tabs.getSelected(null, function(tab) {
//       d = document;

//       var f = d.createElement('form');
//       // f.action = 'http://gtmetrix.com/analyze.html?bm';
//       f.action = 'http://gtmetrix.com/analyze.html?bm';
//       f.method = 'post';
//       var i = d.createElement('input');
//       i.type = 'hidden';
//       i.name = 'url';
//       i.value = tab.url;
//       f.appendChild(i);
//       d.body.appendChild(f);
//       f.submit();
//     });
//   }, false);
// }, false);

