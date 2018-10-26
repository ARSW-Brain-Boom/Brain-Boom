var nickName;

function saveNick(){
  nickName=document.getElementById('nick').value;
  console.log(nickName);
  savePlayers(nickName);
  location.href='selectMap.html'; 
}

