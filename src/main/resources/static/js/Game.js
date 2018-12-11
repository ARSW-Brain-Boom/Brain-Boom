
//Variables globales
var PLAYGROUND_HEIGHT = 600;
var PLAYGROUND_WIDTH = 800;
var playerAnimation = new Array();
var bombas = new Array();
var blocks = new Array();
var solidBlocks = new Array();
var softBlocks = new Array();
var playerx = 25;
var playery = 25;
var playerWidth = 25;
var playerHeight = 25;
var plg = null;
var idPlayer="white";
/**
 * Funciones que ofrece el juego usando el patrón módulo.
 * 
 * @type 
 */
var game = (function () {

    /**
     * Ejecutar una animación según el botón que se oprima
     * 
     * @param {type} e, número correspondiente de un botón en el teclado
     * @returns {undefined}
     */
    var updatePositionPlayer = function (e,color) {
        switch (e) {
            case 32: //this is bomb (space)
                var name = "bomb" + playerx.toString() + playery.toString();
                $("#bombas").addSprite(name, {animation: bombas["black"], posx: playerx, posy: playery, width: 25, height: 25});
                $("#" + name).addClass("playerBombs");
                setTimeout(boom, 1500, name);
                break;
            case 37: // (left arrow)
                var nextPos = playerx - 25;
                if (nextPos >= 25 && !solidBlocks.includes(nextPos + "," + playery) && !softBlocks.includes(nextPos + "," + playery)) {
                    $("#player").remove();
                    $("#players").addSprite("player", {width: playerWidth, height: playerHeight, animation: playerAnimation["left"+color], posx: nextPos, posy: playery});
                    playerx = nextPos;
                }
                break;
            case 38: // (up arrow)
                var nextPos = playery - 25;
                if (nextPos >= 25 && !solidBlocks.includes(playerx + "," + nextPos) && !softBlocks.includes(playerx + "," + nextPos)) {
                    $("#player").remove();
                    $("#players").addSprite("player", {width: playerWidth, height: playerHeight, animation: playerAnimation["up"+color], posx: playerx, posy: nextPos});
                    playery = nextPos;
                }
                break;
            case 39: //this is right (right arrow)
                var nextPos = playerx + 25;
                if (nextPos <= PLAYGROUND_WIDTH - 50 && !solidBlocks.includes(nextPos + "," + playery) && !softBlocks.includes(nextPos + "," + playery)) {
                    $("#player").remove();
                    $("#players").addSprite("player", {width: playerWidth, height: playerHeight, animation: playerAnimation["right"+color], posx: nextPos, posy: playery });
                    playerx = nextPos;
                }
                break;
            case 40: //this is down! (down arrow)
                var nextPos = playery + 25;
                if (nextPos <= PLAYGROUND_HEIGHT - 50 && !solidBlocks.includes(playerx + "," + nextPos) && !softBlocks.includes(playerx + "," + nextPos)) {
                    $("#player").remove();
                    $("#players").addSprite("player", {width: playerWidth, height: playerHeight, animation: playerAnimation["down"+color], posx: playerx, posy: nextPos});
                    playery = nextPos;
                }
                break;

        }
    };

    /**
     * Ejecutar una animación después de que un botón se ha oprimido
     * 
     * @param {type} e, número correspondiente de un botón en el teclado
     * @returns {undefined}
     */
    var updateStatePlayer = function (e,color) {
        switch (e) {
            case 37: //this is left! (left arrow)
                $("#player").setAnimation(playerAnimation["idle_left"+color]);
                break;
            case 38: //this is up! (up arrow)
                $("#player").setAnimation(playerAnimation["idle_up"+color]);
                break;
            case 39: //this is right (right arrow)
                $("#player").setAnimation(playerAnimation["idle_right"+color]);
                break;
            case 40: //this is down! (down arrow)
                $("#player").setAnimation(playerAnimation["idle_down"+color]);
                break;
        }
    }

    return {
        updatePositionPlayer: updatePositionPlayer,
        updateStatePlayer: updateStatePlayer,
    };
})();

$(function () {

    //The background
    var backgroundanimation = new $.gQ.Animation({imageURL: "./Images/maps/yellowMapSimple.png"});
    /*
    //Player animations
    playerAnimation["idle_down"] = new $.gameQuery.Animation({imageURL: "./Images/character/static/down/down_black.png"});
    playerAnimation["idle_up"] = new $.gameQuery.Animation({imageURL: "./Images/character/static/up/up_black.png"});
    playerAnimation["idle_right"] = new $.gameQuery.Animation({imageURL: "./Images/character/static/right/right_black.png"});
    playerAnimation["idle_left"] = new $.gameQuery.Animation({imageURL: "./Images/character/static/left/left_black.png"});

    playerAnimation["up"] = new $.gameQuery.Animation({imageURL: "./Images/character/up/up_black_idle.png", numberOfFrame: 4,
        delta: 26, rate: 200, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_MULTI});

    playerAnimation["down"] = new $.gameQuery.Animation({imageURL: "./Images/character/down/down_black_idle.png", numberOfFrame: 4,
        delta: 26, rate: 200, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_MULTI});

    playerAnimation["left"] = new $.gameQuery.Animation({imageURL: "./Images/character/left/left_black_idle.png", numberOfFrame: 8,
        delta: 30, rate: 150, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_MULTI});

    playerAnimation["right"] = new $.gameQuery.Animation({imageURL: "./Images/character/right/right_black_idle.png", numberOfFrame: 8,
        delta: 30, rate: 140, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_MULTI});*/
    playerSetup(idPlayer);
    //Bombas
    bombas["black"] = new $.gameQuery.Animation({imageURL: "./Images/bomb/static/black_bomb.png", numberOfFrame: 4,
        delta: 25, rate: 200, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_PINGPONG});
    bombas["blast"] = new $.gameQuery.Animation({imageURL: "./Images/bomb/blast/black_blast.png", numberOfFrame: 5,
        delta: 25, rate: 200, type: $.gameQuery.ANIMATION_VERTICAL | $.gameQuery.ANIMATION_ONCE});
    bombas["blast_up"] = new $.gameQuery.Animation({imageURL: "./Images/bomb/up/up_black_blast.png"});
    bombas["blast_down"] = new $.gameQuery.Animation({imageURL: "./Images/bomb/down/down_black_blast.png"});
    bombas["blast_right"] = new $.gameQuery.Animation({imageURL: "./Images/bomb/right/right_black_blast.png"});
    bombas["blast_left"] = new $.gameQuery.Animation({imageURL: "./Images/bomb/left/left_black_blast.png"});

    //Blocks
    blocks["solid"] = new $.gQ.Animation({imageURL: "./Images/blocks/solid_yellow.png"});
    blocks["soft"] = new $.gQ.Animation({imageURL: "./Images/blocks/soft_yellow.png"});

    // Initialize the game:
    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, keyTracker: true});

    // Initialize the background, each group (addgroup) is a layer.
    $.playground().addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
            .addSprite("background1", {animation: backgroundanimation, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
            .end()
            .addGroup("solidBlocks", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
            .end()
            .addGroup("softBlocks", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
            .end()
            .addGroup("players", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
            .addSprite("player", {animation: playerAnimation["idle_down"+idPlayer], posx: playerx, posy: playery, width: playerWidth, height: playerHeight})
            .end()
            .addGroup("bombas", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT});

    createBlocks();

    $("#start").click(function () {
        $.playground().startGame(function () {
            $("#start").fadeTo(1000, 0, function () {
                $(this).remove();
                
            });
        });
    });

//    $.playground().registerCallback(function () {
//        $(".SolidBlocks").each(function () {
//            var collided = $(this).collision("#player,." + $.gQ.groupCssClass);
//            //console.log($("#player").y(), $(this).y());
//            //$("#player").y(playery+25);
//            if (collided.length > 0) {
//                collided.each(function () {
//                    console.log($("#player").x(), $(this).y());
//                })
//            }
//
//        });
//    }, 1000);

});

/**
 * 
 * @param {type} name
 * @returns {undefined}
 */
function boom(name) {
    var blastName = name + 1; // El uno se debe cambiar por la cantidad de bombas que puede poner un jugador
    var x = $("#" + name).x();
    var y = $("#" + name).y();
    $("#" + name).remove();
    $("#" + name).removeClass();
    $("#bombas").addSprite(blastName, {animation: bombas["blast"], posx: x, posy: y, width: 25, height: 25});

    setTimeout(function () {
        $("#" + blastName).remove()
    }, 900);
}
/**
 * 
 * @param nombre 
 * @returns {void}
 */
function playerSetup(color) {
    
    //Player animations
    playerAnimation["idle_down"+color] = new $.gameQuery.Animation({imageURL: "./Images/character/static/down/down_"+color+".png"});
    playerAnimation["idle_up"+color] = new $.gameQuery.Animation({imageURL: "./Images/character/static/up/up_"+color+".png"});
    playerAnimation["idle_right"+color] = new $.gameQuery.Animation({imageURL: "./Images/character/static/right/right_"+color+".png"});
    playerAnimation["idle_left"+color] = new $.gameQuery.Animation({imageURL: "./Images/character/static/left/left_"+color+".png"});

    playerAnimation["up"+color] = new $.gameQuery.Animation({imageURL: "./Images/character/up/up_"+color+"_idle.png", numberOfFrame: 4,
        delta: 26, rate: 200, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_MULTI});

    playerAnimation["down"+color] = new $.gameQuery.Animation({imageURL: "./Images/character/down/down_"+color+"_idle.png", numberOfFrame: 4,
        delta: 26, rate: 200, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_MULTI});

    playerAnimation["left"+color] = new $.gameQuery.Animation({imageURL: "./Images/character/left/left_"+color+"_idle.png", numberOfFrame: 8,
        delta: 30, rate: 150, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_MULTI});

    playerAnimation["right"+color] = new $.gameQuery.Animation({imageURL: "./Images/character/right/right_"+color+"_idle.png", numberOfFrame: 8,
        delta: 30, rate: 140, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_MULTI});

}

/**
 * Poner los diferentes bloques en el mapa
 * 
 * @returns {undefined}
 */
function createBlocks() {

    var callback = {

        onSuccess: function (blockList) {
            //Recorrer el tablero para poner los bloques solidos y blandos
            for (var i in blockList) {
                for (var j in blockList[i]) {
                    switch (j) {
                        case "x":
                            var x = blockList[i][j];
                            break;
                        case "y":
                            var y = blockList[i][j];
                            break;
                        case "tipo":
                            if (blockList[i][j] == "SOLID") {
                                var name = "solidBlocks_" + x + "_" + y;
                                $("#solidBlocks").addSprite(name, {animation: blocks["solid"], posx: x, posy: y, width: 25, height: 25});
                                $("#" + name).addClass("SolidBlocks");
                                solidBlocks.push(x + "," + y);
                            } else {
                                var name = "softBlocks_" + x + "_" + y;
                                $("#softBlocks").addSprite(name, {animation: blocks["soft"], posx: x, posy: y, width: 25, height: 25});
                                $("#" + name).addClass("SoftBlocks");
                                softBlocks.push(x + "," + y);
                            }
                            break;
                    }
                }
            }
        }
    }
    bnbController.getMap(callback);
}

/*
 * 
 */
$(document).keydown(function (e) {
    switch (e.keyCode) {
        
        case 32: //this is bomb (space)
            stomp.publishPosition(e.keyCode,idPlayer);
            break;
        case 37: // (left arrow)
            stomp.publishPosition(e.keyCode,idPlayer);
            break;
        case 38: // (up arrow)
            stomp.publishPosition(e.keyCode,idPlayer);
            break;
        case 39: //this is right (right arrow)
            stomp.publishPosition(e.keyCode,idPlayer);
            break;
        case 40: //this is down! (down arrow)
            stomp.publishPosition(e.keyCode,idPlayer);
            break;
        
        /*
                case 32: //this is bomb (space)
            stomp.publishPosition(e.keyCode);
            break;
        case 37: // (left arrow)
            stomp.publishPosition(e.keyCode);
            break;
        case 38: // (up arrow)
            stomp.publishPosition(e.keyCode);
            break;
        case 39: //this is right (right arrow)
            stomp.publishPosition(e.keyCode);
            break;
        case 40: //this is down! (down arrow)
            stomp.publishPosition(e.keyCode);
            break;
            */
    }
});

//this is where the keybinding occurs
$(document).keyup(function (e) {
    switch (e.keyCode) {
        case 37: //this is left! (left arrow)
            stomp.publishState(e.keyCode,idPlayer);
            break;
        case 38: //this is up! (up arrow)
            stomp.publishState(e.keyCode,idPlayer);
            break;
        case 39: //this is right (right arrow)
            stomp.publishState(e.keyCode,idPlayer);
            break;
        case 40: //this is down! (down arrow)
            stomp.publishState(e.keyCode,idPlayer);
            break;
    }
});
