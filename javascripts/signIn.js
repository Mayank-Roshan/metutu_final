var lat;
var long;


//function thats hits on page load
$(function(){
  // Initialize Firebase
var config = {
apiKey: "AIzaSyDZpM9AOjqDI2N8Nwbf0cRFNoew1nbCdrU",
authDomain: "metutu-f579c.firebaseapp.com",
databaseURL: "https://metutu-f579c.firebaseio.com",
projectId: "metutu-f579c",
storageBucket: "metutu-f579c.appspot.com",
messagingSenderId: "500001567185"
};
firebase.initializeApp(config);
});

//signin authentication
$(".loginBox").submit(function(){
    event.preventDefault();
    var email=$("#").value();
    var



});
