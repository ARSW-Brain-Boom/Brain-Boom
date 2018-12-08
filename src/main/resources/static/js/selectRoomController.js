var player;

function getPlayers() {
	axios.get('/bnb/players').then(function(response) {
			console.log("ENTRE");
			console.log(response);

			var table = document.getElementById('players');
			var textHtml = '<ul class="list-group"' + " style='position: relative; left: -450px;top: -30px;width: 290px;'>" + '<li class="list-group-item text-center">Players in Room </li>';
			for(i=0; i<response.data.length;i++){
				console.log(response.data[i]);
				textHtml+='<li class="list-group-item list-group-item-primary text-center">';
				textHtml+=response.data[i].nickName;
				textHtml += "</li>";
			}
			textHtml += "</ul>"
			table.innerHTML += textHtml;
		})
		.catch(function(error) {
			alert("Error");
		});

}

function savePlayers(nickName) {
	player = nickName;
	localStorage.setItem("play", nickName);
	console.log(player);
	//getPlayers();
}