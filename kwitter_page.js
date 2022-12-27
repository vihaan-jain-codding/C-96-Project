const firebaseConfig = {
  apiKey: "AIzaSyDISXZY79x1i_VBKxb53ZFdfcN9Vv6rm1I",
  authDomain: "kwitter-46b62.firebaseapp.com",
  databaseURL: "https://kwitter-46b62-default-rtdb.firebaseio.com",
  projectId: "kwitter-46b62",
  storageBucket: "kwitter-46b62.appspot.com",
  messagingSenderId: "144868133077",
  appId: "1:144868133077:web:f2a56aea39d113ba29fa5c",
  measurementId: "G-Y5BZXR60V7"
};

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send(){
  msg = document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
        name : user_name,
        message : msg,
        like : 0
  });
  document.getElementById("msg").value = "";
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
     firebase_message_id = childKey;
     message_data = childData;
//Start code

console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
message = message_data['message'];
like = message_data['like'];

name_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'> </h4>";
message_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_tag = "<button class='btn btn-success' id="+firebase_message_id+" value="+like+" onclick='update_like(this.id)'>";
span_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + like + "</span> </button> <hr>";

//<button id="" value="" onclick=""> (inside span tag)thumbsup like: like</button>

row = name_tag + message_tag + like_tag + span_tag;

document.getElementById("output").innerHTML += row;

//End code
  } });  }); }
getData();

function update_like(message_id){
button_id = message_id;
likes = document.getElementById(button_id).value;
update_likes = Number(likes) + 1;
firebase.database().ref(room_name).child(message_id).update({
  like : update_likes
});
}

function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}