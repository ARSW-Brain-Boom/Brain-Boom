
var PLAYGROUND_HEIGHT= 2000;
var PLAYGROUND_WIDTH = 2000;
var playerAnimation= new Array();
var playerx=500;
var playery=500;
$(function(){
	
	
		
    var backgroundanimation = new $.gQ.Animation({imageURL:"./Images/Background/background.jpg"});
	
        playerAnimation["up"] = new $.gameQuery.Animation({imageURL: "Images/character1/rotarcrash/0.png"});
        playerAnimation["down"] = new $.gameQuery.Animation({imageURL: "Images/character1/rotarcrash/0.png"});
        playerAnimation["left"] = new $.gameQuery.Animation({imageURL: "Images/character1/leftcrash/13.png"});
        playerAnimation["right"] = new $.gameQuery.Animation({imageURL: "Images/character1/rightcrash/12.png"});        
	
	
	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH})
        .addGroup("background",{width: PLAYGROUND_WIDTH, height:PLAYGROUND_HEIGHT}).end()
        .addGroup("players", {posx: PLAYGROUND_WIDTH/2, posy: PLAYGROUND_HEIGHT/2, width: 100, height: 26});
	$("#background").addSprite("background1",{width:PLAYGROUND_WIDTH,height:PLAYGROUND_HEIGHT,animation:backgroundanimation});
	$("#players").addSprite("player",{width: 100, height: 26,animation:playerAnimation["idle"],posx:playerx, posy:playery});
	
    $("#start").click(function () {
            $.playground().startGame(function () {
                $("#start").remove();
            })
    });
});
$(document).keydown(function(e){
            switch(e.keyCode){
            case 32: //this is shoot (space)
                    //shoot missile here
		
                break;
            case 37: //this is left! (left arrow)
				//$("#player").setAnimation(playerAnimation["left"]);
                //$("#player").x(-10,true);
                $("#player").remove();
				$("#players").addSprite("player",{width: 100, height: 26,animation:playerAnimation["left"],posx:playerx-10,posy:playery});
				playerx-=10;
                break;
            case 38: //this is up! (up arrow)
					//$("#player").setAnimation(playerAnimation["up"]);
					//$("#player").y(10,true);
                    $("#player").remove();
					$("#players").addSprite("player",{width: 100, height: 26,animation:playerAnimation["up"],posx:playerx,posy:playery-10});
					playery-=10;
                    break;
                case 39: //this is right (right arrow)
					//$("#player").setAnimation(playerAnimation["right"]);
					//$("#player").x(10,true);
                    $("#player").remove();
                    $("#players").addSprite("player",{width: 100, height: 26,animation:playerAnimation["right"],posx:playerx+10,posy:playery});
					playerx+=10;
                    break;
                case 40: //this is down! (down arrow)
					//$("#player").setAnimation(playerAnimation["down"]);
					//$("#player").x(-10,true);
                    $("#player").remove();
                    $("#players").addSprite("player",{width: 100, height: 26,animation:playerAnimation["down"],posx:playerx,posy:playery+10});
					playery+=10;
                    break;
    /*        if(e.keyCode== "w"){
                $("#player").setAnimation(playerAnimation["up"]);
                $("#player").y(10,true);
            }
            else if(e.keyCode== "s"){
                $("#player").setAnimation(playerAnimation["down"]);
                $("#player").y(-10,true);
            }
            else if(e.keyCode== "a"){
                $("#player").setAnimation(playerAnimation["left"]);
                $("#player").x(-10,true);
            }
            else if(e.keyCode== "d"){
                $("#player").setAnimation(playerAnimation["right"]);
                $("#player").x(10,true);
            }*/
          }
});