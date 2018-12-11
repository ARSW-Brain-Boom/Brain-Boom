var nickName;
var room=0;

function newRoom(){
	room+=1;  
	localStorage.setItem("room",room); 
	//stomp.connectSuscribe(localStorage.getItem('room'));
	nickName=document.getElementById('nick').value; 
  	localStorage.setItem("nickName",nickName); 
	saveNick();
}

function joinRoom(){
	var join=document.getElementById('join').value;
	localStorage.setItem("room",join);   
	nickName=document.getElementById('nick').value; 
    localStorage.setItem("nickName",nickName); 
	saveNick();
}

function saveNick(){ 
  nickName=document.getElementById('nick').value;   
  if(nickName==""){
  	alert("Por favor ingrese un Nickname");
  } else{
	  axios.post('/bnb/player', nickName)
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	  });
    savePlayers(nickName);
    console.log(nickName);  
	  location.href='selectMap.html'  
	}
  //
}

function main(){
	saveNick();
}

function goTo(){
	location.href='selectMap.html'; 
}
