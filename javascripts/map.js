var lat;
var long;
//js for getting elements and then sending them over to firebase

// Initialize Firebase on Load of page
function  startUp() {
  var loc=getUserLocation();
  var config = {
    apiKey: "AIzaSyDZpM9AOjqDI2N8Nwbf0cRFNoew1nbCdrU",
    authDomain: "metutu-f579c.firebaseapp.com",
    databaseURL: "https://metutu-f579c.firebaseio.com",
    projectId: "metutu-f579c",
    storageBucket: "metutu-f579c.appspot.com",
    messagingSenderId: "500001567185"
  };
  firebase.initializeApp(config);
}


//show map
function initMap() {
  var pos = {lat: lat, lng: long};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: pos
  });
  var marker = new google.maps.Marker({
    position: pos,
    map: map
  });
}


//get user location function.
function getUserLocation(){



    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(savePosition);
    } else {
        console.log("Can't get Location");
    }

}

//save longitude and latitude
function savePosition(position){
  lat=position.coords.latitude;
  long=position.coords.longitude;
}


//write to firebase
function writeDataFirebase(name,email,pass,phone,lat,long,prof,gen,teaches,studies){


 var userRef=firebase.database().ref('user/'+ phone).set({
   username:name,
   email:email,
   password:pass,
   phoneNo:phone,
   profession:prof,
   gender:gen,
   latitude:lat,
   longitude:long,
   teaches:teaches,
   studies:studies
 });


}



//listen for form submit
var form=document.getElementById("signUpForm");

form.onsubmit=function (e){
    e.preventDefault();
    var prof,gen;
    var name=getValueId('name');
    var email=getValueId('email');
    var pass=getValueId('pass');
    var phone=getValueId('phone');
    var teaches=getValueId('can_teach');
    var studies=getValueId('wanna_learn');

    prof = document.getElementById('Teacher').value;
    if (document.getElementById('Teacher').checked){
      prof = document.getElementById('Teacher').value;
    }
    else {
      prof = document.getElementById('Student').value;
    }
      gen = document.getElementById('male').value;
    if (document.getElementById('male').checked){
        gen = document.getElementById('male').value;
      }
    else {
        gen = document.getElementById('female').value;
    }
    console.log(name,email,pass,phone,lat,long,prof,gen);
    //write info to database
    writeDataFirebase(name,email,pass,phone,lat,long,prof,gen,teaches,studies);

    //adding conformation
    alert("Data Saved");
    initMap();
    document.getElementById('signUpForm').reset();
    /*document.location.href = "home.html";*/

}


//to get form values
function getValueId(id){

    return document.getElementById(id).value;

}
