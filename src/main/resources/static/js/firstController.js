var nickName;
var room=0;

function saveNick(){
  nickName=document.getElementById('nick').value;
  console.log(nickName);
  room+=1;  
  //savePlayers(nickName);
  location.href='selectMap.html'; 
  conect();
}

function conect(){
	console.log(room);
}

