
//Variables globales
var PLAYGROUND_HEIGHT = 475;
var PLAYGROUND_WIDTH = 675;
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

/**
 * Funciones que ofrece el juego usando el patrón módulo.
 * 
 * @type 
 */
var game = (function () {

    var getMap = function () {
        return createMap();
    }

    var setMap = function (map) {
        plg = map;
    }

    /**
     * Ejecutar una animación según el botón que se oprima
     * 
     * @param {type} e, número correspondiente de un botón en el teclado
     * @returns {undefined}
     */
    var updatePositionPlayer = function (e) {
        switch (e) {
            case 32: //this is bomb (space)
                var name = "bomb" + playerx.toString() + playery.toString();
                var playerPosx = playerx;
                var playerPosy = playery;
                $("#bombas").addSprite(name, {animation: bombas["black"], posx: playerPosx, posy: playerPosy, width: 25, height: 25});
                $("#" + name).addClass("playerBombs");
                setTimeout(boom, 1500, name, playerPosx, playerPosy);
                break;
            case 37: // (left arrow)
                var nextPos = playerx - 25;
                if (nextPos >= 25 && !solidBlocks.includes(nextPos + "," + playery) && !softBlocks.includes(nextPos + "," + playery)) {
                    $("#player").remove();
                    $("#players").addSprite("player", {width: playerWidth, height: playerHeight, animation: playerAnimation["left"], posx: nextPos, posy: playery});
                    playerx = nextPos;
                }
                break;
            case 38: // (up arrow)
                var nextPos = playery - 25;
                if (nextPos >= 25 && !solidBlocks.includes(playerx + "," + nextPos) && !softBlocks.includes(playerx + "," + nextPos)) {
                    $("#player").remove();
                    $("#players").addSprite("player", {width: playerWidth, height: playerHeight, animation: playerAnimation["up"], posx: playerx, posy: nextPos});
                    playery = nextPos;
                }
                break;
            case 39: //this is right (right arrow)
                var nextPos = playerx + 25;
                if (nextPos <= PLAYGROUND_WIDTH - 50 && !solidBlocks.includes(nextPos + "," + playery) && !softBlocks.includes(nextPos + "," + playery)) {
                    $("#player").remove();
                    $("#players").addSprite("player", {width: playerWidth, height: playerHeight, animation: playerAnimation["right"], posx: nextPos, posy: playery});
                    playerx = nextPos;
                }
                break;
            case 40: //this is down! (down arrow)
                var nextPos = playery + 25;
                if (nextPos <= PLAYGROUND_HEIGHT - 50 && !solidBlocks.includes(playerx + "," + nextPos) && !softBlocks.includes(playerx + "," + nextPos)) {
                    $("#player").remove();
                    $("#players").addSprite("player", {width: playerWidth, height: playerHeight, animation: playerAnimation["down"], posx: playerx, posy: nextPos});
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
    var updateStatePlayer = function (e) {
        switch (e) {
            case 37: //this is left! (left arrow)
                $("#player").setAnimation(playerAnimation["idle_left"]);
                break;
            case 38: //this is up! (up arrow)
                $("#player").setAnimation(playerAnimation["idle_up"]);
                break;
            case 39: //this is right (right arrow)
                $("#player").setAnimation(playerAnimation["idle_right"]);
                break;
            case 40: //this is down! (down arrow)
                $("#player").setAnimation(playerAnimation["idle_down"]);
                break;
        }
    }

    return {
        updatePositionPlayer: updatePositionPlayer,
        updateStatePlayer: updateStatePlayer,
        getMap: getMap,
        setMap: setMap
    };
})();

$(function () {

    //The background
    var backgroundanimation = new $.gQ.Animation({imageURL: "./Images/maps/yellowMapSimple.png"});

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
        delta: 30, rate: 140, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_MULTI});

    //Bombas
    bombas["black"] = new $.gameQuery.Animation({imageURL: "./Images/bomb/static/black_bomb.png", numberOfFrame: 4,
        delta: 25, rate: 200, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_PINGPONG});
    bombas["blast"] = new $.gameQuery.Animation({imageURL: "./Images/bomb/blast/black_blast.png", numberOfFrame: 5,
        delta: 25, rate: 200, type: $.gameQuery.ANIMATION_VERTICAL | $.gameQuery.ANIMATION_ONCE});

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
            .addSprite("player", {animation: playerAnimation["idle_down"], posx: playerx, posy: playery, width: playerWidth, height: playerHeight})
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
 * @returns {undefined}
 */
function print() {
    //$("#gQ_scenegraph").clone().appendTo("#test");
    $("#test").append(playground);
    /*var plg = document.getElementById("playground");
     var plgc = plg.cloneNode(true);
     document.getElementById("test").appendChild(plgc);
     console.log("print");*/
    //$("#test").html();
}

/**
 * 
 * @param {type} name
 * @returns {undefined}
 */
function boom(name, x, y) {
    var blastName = name + 1; // El uno se debe cambiar por la cantidad de bombas que puede poner un jugador
    $("#" + name).remove();
    $("#" + name).removeClass();
    $("#bombas").addSprite(blastName, {animation: bombas["blast"], posx: x, posy: y, width: 25, height: 25});
    setTimeout(function () {
        $("#" + blastName).remove()
    }, 900);
}

/**
 * Cambiar el valor de una variable booleana
 * 
 * @param {type} b
 * @returns {Boolean}
 */
function changeValue(b) {
    if (b) {
        b = false;
    } else {
        b = true;
    }
    return b;
}

/**
 * Poner los diferentes bloques en el mapa
 * 
 * @returns {undefined}
 */
function createBlocks() {
    //Lista que contiene las coordenadas de los espacios que hay que dejar sin bloques para garantizar que los jugadores no queden encerrados
    var blanks = ["25, 25", "50, 25", "25, 50", "25, 400", "25, 425", "50, 425", "600, 25", "625, 25", "625, 50", "600, 425", "625, 425", "625, 400"];
    //Banderas
    var putRow = true;
    var putColumn = true;
    //Recorrer el tablero para poner los bloques solidos y blandos
    for (var i = 0; i < PLAYGROUND_HEIGHT; i += 25) {
        for (var j = 0; j < PLAYGROUND_WIDTH; j += 25) {
            //Condición para tomar los espacios dentro del borde del tablero
            if (i > 0 && i < PLAYGROUND_HEIGHT - 25 && j > 0 && j < PLAYGROUND_WIDTH - 25) {
                var randomNum = Math.floor(Math.random() * 10) % 2; //Número random para determinar si se pone un bloque o no
                if (putRow && putColumn && !blanks.includes(j + ", " + i)) { //Poner los bloques solidos, dejando una columna y fila de por medio
                    var name = "solidBlocks_" + j + "_" + i;
                    $("#solidBlocks").addSprite(name, {animation: blocks["solid"], posx: j, posy: i, width: 25, height: 25});
                    $("#" + name).addClass("SolidBlocks");
                    solidBlocks.push(j + "," + i);
                } else if (!blanks.includes(j + ", " + i) && randomNum == 0) { //En caso de que la coordenada no esté en la lista y el número es par, se pone el bloque
                    var name = "softBlocks_" + j + "_" + i;
                    $("#softBlocks").addSprite(name, {animation: blocks["soft"], posx: j, posy: i, width: 25, height: 25});
                    $("#" + name).addClass("SoftBlocks");
                    softBlocks.push(j + "," + i);
                }
            } else { //Tomar el borde del tablero para poner los bloques solidos
                var name = "solidBlocks_" + j + "_" + i;
                $("#solidBlocks").addSprite(name, {animation: blocks["solid"], posx: j, posy: i, width: 25, height: 25});
                //$("#" + name).addClass("SolidBlocks");
            }
            putColumn = changeValue(putColumn);
        }
        putRow = changeValue(putRow);
    }
}

$(document).keydown(function (e) {
    switch (e.keyCode) {
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

    }
});

//this is where the keybinding occurs
$(document).keyup(function (e) {
    switch (e.keyCode) {
        case 37: //this is left! (left arrow)
            stomp.publishState(e.keyCode);
            break;
        case 38: //this is up! (up arrow)
            stomp.publishState(e.keyCode);
            break;
        case 39: //this is right (right arrow)
            stomp.publishState(e.keyCode);
            break;
        case 40: //this is down! (down arrow)
            stomp.publishState(e.keyCode);
            break;
    }
});
