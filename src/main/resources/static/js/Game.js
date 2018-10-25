
var PLAYGROUND_HEIGHT= 500;
var PLAYGROUND_WIDTH = 700;
var playerAnimation= new Array();
var playerx=10;
var playery=10;
var playerWidth=120;
var playerheight=46;

$(function(){
	
	
		
    var backgroundanimation = new $.gQ.Animation({imageURL:"./Images/Background/background.jpg"});
		playerAnimation["idle"] = new $.gameQuery.Animation({imageURL: "Images/character1/idle.png"});
        playerAnimation["up"] = new $.gameQuery.Animation({imageURL: "Images/character1/rotarcrash/0.png"});
        playerAnimation["down"] = new $.gameQuery.Animation({imageURL: "Images/character1/rotarcrash/0.png"});
        playerAnimation["left"] = new $.gameQuery.Animation({imageURL: "Images/character1/leftcrash/13.png"});
        playerAnimation["right"] = new $.gameQuery.Animation({imageURL: "Images/character1/rightcrash/12.png"});
		playerAnimation["bombas"] = new $.gameQuery.Animation({imageURL: "Images/bomb1.png"});
	
	
	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
        .addGroup("background",{width: PLAYGROUND_WIDTH, height:PLAYGROUND_HEIGHT}).end()
        .addGroup("players", {posx: PLAYGROUND_WIDTH/2, posy: PLAYGROUND_HEIGHT/2, width: PLAYGROUND_WIDTH, height:PLAYGROUND_HEIGHT}).end()
		.addGroup("bombas",{width: PLAYGROUND_WIDTH, height:PLAYGROUND_HEIGHT});
	$("#background").addSprite("background1",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT,animation:backgroundanimation});
	$("#players").addSprite("player",{width: playerWidth, height: playerheight,animation:playerAnimation["idle"],posx:playerx, posy:playery});
	
    $("#start").click(function () {
            $.playground().startGame(function () {
                $("#start").remove();
            })
    });
});
$(document).keydown(function(e){
            switch(e.keyCode){
            case 32: //this is bomb (space)
                    //put bomb
				alert("bomba");
				name="bomb"+playerx.toString()+playery.toString();
				$("#bombas").addSprite(name,{width: playerWidth, height: playerheight,animation:playerAnimation["bomba"] ,posx:playerx ,posy:playery});
                break;
            case 37: // (left arrow)

                $("#player").remove();
				$("#players").addSprite("player",{width: playerWidth, height: playerheight,animation:playerAnimation["left"],posx:playerx-10,posy:playery});
				playerx-=10;
                break;
            case 38: // (up arrow)

                    $("#player").remove();
					$("#players").addSprite("player",{width: playerWidth, height: playerheight,animation:playerAnimation["up"],posx:playerx,posy:playery-10});
					playery-=10;
                    break;
                case 39: //this is right (right arrow)
                    $("#player").remove();
                    $("#players").addSprite("player",{width: playerWidth, height: playerheight,animation:playerAnimation["right"],posx:playerx+10,posy:playery});
					playerx+=10;
                    break;
                case 40: //this is down! (down arrow)

                    $("#player").remove();
                    $("#players").addSprite("player",{width: playerWidth, height: playerheight,animation:playerAnimation["down"],posx:playerx,posy:playery+10});
					playery+=10;
                    break;
    
          }
});