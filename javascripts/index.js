var lat;
var lng;

$(function(){
  var loc = getUserLoc();
  //hide signUpBox
  $(".signUpBox").hide();
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


//get geo location api
function getUserLoc() {
  if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(savePosition);
    } else {
        console.log("Error accessing location.");
    }
    function savePosition(position) {
    lat = position.coords.latitude;
    lng = position.coords.longitude;
  }
}


//firebase write call
//write to firebase
function writeUserData(name, email,pass,phone,prof,gen,lat,lng,teach,studies) {
  firebase.database().ref('users/' + phone).set({
    username: name,
    email:email,
    password:pass,
    phone: phone,
    profession : prof,
    latitude: lat,
    longitude: lng,
    teaches:teach,
    studies:studies
  });
}

//show signUpBox
$("#signUpLoad").click(function(e) {
  e.preventDefault();
  $(".loginBox").fadeOut(1000);
  $(".signUpBox").fadeIn(1000);
});


//go to signIn page
$("#signInLoad").click(function(e){
  e.preventDefault();
  $(".signUpBox").fadeOut(1000);
  $(".loginBox").fadeIn(1000);
});

//submit from the signup btn
$(".signUpBox").submit(function(event){
  event.preventDefault();
  var name=$("#name").val();
  var email=$("#email").val();
  var pass=$("#pass").val();
  var phone=$("#phone").val();
  var teach=$("#teach").val();
  var studies=$("#stu").val();
  var prof=document.getElementById("Teacher");
  if(document.getElementById("Teacher").checked){
    prof=document.getElementById("Teacher").value;

  }
  else{
    prof=document.getElementById("Student").value;

  }
  //gender
  var gen=document.getElementById("male");
  if(document.getElementById("male").checked){
    gen=document.getElementById("male").value;
  }
  else{
    gen=document.getElementById("female").value;
  }

  console.log(name,email,pass,phone,prof,gen,lat,lng,teach,studies);
  writeUserData(name,email,pass,phone, prof,gen,lat,lng,teach,studies);
  //adding conformation
  alert("Data Saved");

  $(".signUpBox").fadeOut(1000);
  initMap();
  $(".mapView").fadeIn(1000);


});

//signIn functionality
$().submit(function() {
    var email=$().val();
    var password=$().val();
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
});




var mapStyles = {
        default: null,
        hide: [
          {
            featureType: 'poi.business',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          }
        ]
      };


//init map
function initMap() {
  var pos = {lat: lat, lng: lng};
  var bounds = new google.maps.LatLngBounds();
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: pos
  });
  //changed code here from previous checkpt.

//marker



  var infoWindow = new google.maps.InfoWindow({
    content: 'Info here'
  });
  var nearbyCircle = new google.maps.Circle({
            strokeColor: '#808080',
            strokeOpacity: 0.60,
            strokeWeight: 2,
            fillColor: '#006600',
            fillOpacity: 0.35,
            map: map,
            center: pos,
            radius: 1000
          });
  google.maps.event.addDomListener(window, "resize", function() {
    var center = map.getCenter();
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
    map.setOptions({styles: styles['hide']});
  });


  var data=firebase.database();
  var dataRef=firebase.database().ref("users/");
  dataRef.on("child_added",function(data){
    var ref=dataRef.key;
    const userElement=data.val();
    var latData=userElement.latitude;
    var lngData=userElement.longitude;
    console.log("latitude=>"+latData);
    var _kCord = new google.maps.LatLng(latData, lngData);
    var _pCord = new google.maps.LatLng(latData, lngData);
    var dist = google.maps.geometry.spherical.computeDistanceBetween(_pCord,_kCord);
    if (dist < 1000)
      {
        const name = userElement.username;
        const phone = userElement.phone;
        const prof = userElement.profession;
        var marker = [name, latData, lngData];
        var pos = new google.maps.LatLng(marker[1], marker[2]);
        bounds.extend(pos);
        map.fitBounds(bounds);
        marker = new google.maps.Marker({
            position: pos,
            map: map,
            animation: google.maps.Animation.DROP,
            title: marker[0],
            icon:'myMarker.png',
            label: prof.charAt(0).toUpperCase()
        });
        marker.addListener('click', function() {
          infoWindow.setContent('<div><strong>' + name + '</strong><br>' + prof + '<br>Phone: ' + phone + '</div>');
          infoWindow.open(map, marker);
        });
      }

  });
}
