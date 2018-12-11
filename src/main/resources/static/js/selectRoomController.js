var player;


function getPlayers(){
	axios.get('/bnb/players').then(function(response) {
			console.log("ENTRE");
			console.log(response);
			var table = document.getElementById('players');
			var textHtml = '<ul class="list-group"' + " style='position: relative; left: -450px;top: -30px;width: 290px;'>" + '<li class="list-group-item text-center">Players in Room </li>';
			console.log(localStorage.getItem('nickName'));
			for(i=0; i<response.data.length;i++){
				console.log(response.data[i]);
				textHtml+='<li class="list-group-item list-group-item-primary text-center">';
				textHtml+=response.data[i].nickName;
     
				if(response.data[i].nickName==localStorage.getItem('nickName')){
					if(i==0){
						localStorage.setItem("color","red");
					}
					if(i==1){
						localStorage.setItem("color","black");
					}
					if(i==2){
						localStorage.setItem("color","white");
					}
					if(i==3){
						localStorage.setItem("color","purple");
					}
					console.log(localStorage.getItem('color'));
				}				
				textHtml += "</li>";
			}
			textHtml += "</ul>"
			table.innerHTML += textHtml;
		})
		.catch(function(error) {
			alert("Error");
		});
	getRoom();
}

function getRoom(){
	room=localStorage.getItem('room');
	var text=document.getElementById('room');
	text.innerHTML+=room;
}


function savePlayers(nickName) {
	player = nickName;
	localStorage.setItem("play", nickName);
	console.log(player);
	//getPlayers();
}