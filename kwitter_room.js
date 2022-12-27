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
document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

  function add_room(){
    room_name = document.getElementById("room_name").value;
    firebase.database().ref("/").child(room_name).update({
        purpose: "Add Room"
    });

    localStorage.setItem("room_name",room_name);
      window.location = "kwitter_page.html";
  }

  function getData() {firebase.database().ref("/").on('value',
function(snapshot) {document.getElementById("output").innerHTML =
"";snapshot.forEach(function(childSnapshot) {childKey = childSnapshot.key;
Room_names = childKey;
//Start code

row = "<div class='room_name' id="+Room_names+" onclick='redirect(this.id)'>#" +Room_names+ "</div><hr>";

document.getElementById("output").innerHTML += row;

//End code
});});}
getData();

function redirect(name){
  localStorage.setItem("room_name",name);
  window.location = "kwitter_page.html"
}

function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}