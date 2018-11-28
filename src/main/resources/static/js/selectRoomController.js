var player;

function getPlayers(){
	player=localStorage.getItem('play');
	console.log(player+"OK")
	var table=document.getElementById('players');
	var textHtml='<ul class="list-group"'+" style='position: absolute; top: 400px; left: 50px;width: 290px; height: 10px'>"+'<li class="list-group-item text-center">Players in Room </li><li class="list-group-item list-group-item-primary text-center">';
	textHtml+=player;	
	textHtml+="</li></ul>"
	table.innerHTML+=textHtml;
}

function savePlayers(nickName){
	player=nickName;
	localStorage.setItem("play",nickName);
	console.log(player);
	//getPlayers();
}