var nickName;
var room=0;

function saveNick(){
  nickName=document.getElementById('nick').value;
  room+=1;  
  axios.post('/bnb/player', nickName)
	  .then(function (response) {
	    console.log(response);
	  })
	  .catch(function (error) {
	    console.log(error);
	});
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
