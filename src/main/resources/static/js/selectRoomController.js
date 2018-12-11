var player;

function getPlayers(){
	player=localStorage.getItem('play');
	console.log(player+"OK")
	var table=document.getElementById('players');
	var textHtml='<ul class="list-group"'+" style='position: relative; left: -450px;top: -30px;width: 290px;'>"+'<li class="list-group-item text-center">Players in Room </li><li class="list-group-item list-group-item-primary text-center">';
	textHtml+=player;	
	textHtml+="</li></ul>"
	table.innerHTML+=textHtml;
	getRoom();
}

function getRoom(){
	room=localStorage.getItem('room');
	var text=document.getElementById('room');
	text.innerHTML+=room;
}

function savePlayers(nickName){
	player=nickName;
	localStorage.setItem("play",nickName);
	console.log(player);
	//getPlayers();
}