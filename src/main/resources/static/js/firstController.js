var nickName;
var room=0;

function saveNick(){
  nickName=document.getElementById('nick').value;
  room+=1;  
  if(nickName==""){
  	alert("Por favor ingrese un Nickname");
  } else{
	  savePlayers(nickName);
	  console.log(nickName);
	  localStorage.setItem("room",room); 
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
