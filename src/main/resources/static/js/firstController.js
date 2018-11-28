var nickName;
var room=0;

function saveNick(){
  nickName=document.getElementById('nick').value;
  room+=1;  
  savePlayers(nickName);
  console.log(nickName);
  localStorage.setItem("room",room); 
  location.href='selectMap.html'  
  //
}

function main(){
	saveNick();
}

function goTo(){
	location.href='selectMap.html'; 
}
