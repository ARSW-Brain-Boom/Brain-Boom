var nickName;
var room=0;

function newRoom(){
	room+=1;  
	localStorage.setItem("room",room); 
	saveNick();
}

function joinRoom(){
	var join=document.getElementById('join').value;
	localStorage.setItem("room",join);   
	saveNick();
}

function saveNick(){
  nickName=document.getElementById('nick').value; 
  if(nickName==""){
  	alert("Por favor ingrese un Nickname");
  } else{
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
