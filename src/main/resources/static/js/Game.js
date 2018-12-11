
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
var jugadoreslist = [];
var jugadoresvivos = [];
var plg = null;
var idPlayer = localStorage.getItem('color');
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
    var updatePositionPlayer = function (e, color) {
        var indice = findPersonaje(color);
        switch (e) {
            case 32: //this is bomb (space)
                var name = "bomb" + jugadoreslist[indice].posx.toString() + jugadoreslist[indice].posy.toString();
                $("#bombas").addSprite(name, {animation: bombas[color], posx: jugadoreslist[indice].posx, posy: jugadoreslist[indice].posy, width: 25, height: 25});
                $("#" + name).addClass("playerBombs");
                setTimeout(boom, 1500, name, color);
                break;
            case 37: // (left arrow)
                var nextPos = jugadoreslist[indice].posx - 25;
                if (nextPos >= 25 && !solidBlocks.includes(nextPos + "," + jugadoreslist[indice].posy) && !softBlocks.includes(nextPos + "," + jugadoreslist[indice].posy)) {
                    $("#player" + color).remove();
                    $("#players").addSprite("player" + color, {width: playerWidth, height: playerHeight, animation: playerAnimation["left" + color], posx: nextPos, posy: jugadoreslist[indice].posy});
                    jugadoreslist[indice].posx = nextPos;
                }
                break;
            case 38: // (up arrow)
                var nextPos = jugadoreslist[indice].posy - 25;
                if (nextPos >= 25 && !solidBlocks.includes(jugadoreslist[indice].posx + "," + nextPos) && !softBlocks.includes(jugadoreslist[indice].posx + "," + nextPos)) {
                    $("#player" + color).remove();
                    $("#players").addSprite("player" + color, {width: playerWidth, height: playerHeight, animation: playerAnimation["up" + color], posx: jugadoreslist[indice].posx, posy: nextPos});
                    jugadoreslist[indice].posy = nextPos;
                }
                break;
            case 39: //this is right (right arrow)
                var nextPos = jugadoreslist[indice].posx + 25;
                if (nextPos <= PLAYGROUND_WIDTH - 50 && !solidBlocks.includes(nextPos + "," + jugadoreslist[indice].posy) && !softBlocks.includes(nextPos + "," + jugadoreslist[indice].posy)) {
                    $("#player" + color).remove();
                    $("#players").addSprite("player" + color, {width: playerWidth, height: playerHeight, animation: playerAnimation["right" + color], posx: nextPos, posy: jugadoreslist[indice].posy});
                    jugadoreslist[indice].posx = nextPos;
                }
                break;
            case 40: //this is down! (down arrow)
                var nextPos = jugadoreslist[indice].posy + 25;
                if (nextPos <= PLAYGROUND_HEIGHT - 50 && !solidBlocks.includes(jugadoreslist[indice].posx + "," + nextPos) && !softBlocks.includes(jugadoreslist[indice].posx + "," + nextPos)) {
                    $("#player" + color).remove();
                    $("#players").addSprite("player" + color, {width: playerWidth, height: playerHeight, animation: playerAnimation["down" + color], posx: jugadoreslist[indice].posx, posy: nextPos});
                    jugadoreslist[indice].posy = nextPos;
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
    var updateObjectHealth = function (e, color) {


    }

    /**
     * Ejecutar una animación después de que un botón se ha oprimido
     * 
     * @param {type} e, número correspondiente de un botón en el teclado
     * @returns {undefined}
     */
    var updateStatePlayer = function (e, color) {
        switch (e) {
            case 37: //this is left! (left arrow)
                $("#player" + color).setAnimation(playerAnimation["idle_left" + color]);
                break;
            case 38: //this is up! (up arrow)
                $("#player" + color).setAnimation(playerAnimation["idle_up" + color]);
                break;
            case 39: //this is right (right arrow)
                $("#player" + color).setAnimation(playerAnimation["idle_right" + color]);
                break;
            case 40: //this is down! (down arrow)
                $("#player" + color).setAnimation(playerAnimation["idle_down" + color]);
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
    var backgroundanimation = new $.gQ.Animation({imageURL: "./Images/maps/blueMapSimple.png"});
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

    //Bombas
//    bombas["black"] = new $.gameQuery.Animation({imageURL: "./Images/bomb/static/black_bomb.png", numberOfFrame: 4,
//        delta: 25, rate: 200, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_PINGPONG});
//    bombas["blast"] = new $.gameQuery.Animation({imageURL: "./Images/bomb/blast/black_blast.png", numberOfFrame: 5,
//        delta: 25, rate: 200, type: $.gameQuery.ANIMATION_VERTICAL | $.gameQuery.ANIMATION_ONCE});

    //Blocks
    blocks["solid"] = new $.gQ.Animation({imageURL: "./Images/blocks/solid_yellow.png"});
    blocks["soft"] = new $.gQ.Animation({imageURL: "./Images/blocks/soft_yellow.png"});

    // Initialize the game:
    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, keyTracker: true});

    // Initialize the background, each group (addgroup) is a layer.
    $.playground().addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
            .addSprite("background1", {animation: backgroundanimation, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
            .end()
            .addGroup("bombas", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
            .end()
            .addGroup("softBlocks", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
            .end()
            .addGroup("players", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
            .end()
            .addGroup("solidBlocks", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT});

    createBlocks();
    obtenerDatosPersonajes();
    $("#start").click(function () {
        $.playground().startGame(function () {
            $("#start").fadeTo(300, 0, function () {
                $(this).remove();
            });
            $("#icons").fadeTo(300, 0, function () {
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
function boom(name, color) {
    var blastName = name + 1; // El uno se debe cambiar por la cantidad de bombas que puede poner un jugador
    var x = $("#" + name).x();
    var y = $("#" + name).y();
    $("#" + name).remove();
    $("#" + name).removeClass();
    $("#bombas").addSprite(blastName, {animation: bombas["blast" + color], posx: x, posy: y, width: 25, height: 25});
    colisionBomba(x, y, color);
    setTimeout(function () {
        $("#" + blastName).remove();
    }, 900);
}
/**
 * 
 * @param nombre 
 * @returns {void}
 */
function playerSetup() {

    var opciones = ["danger", "dark", "info", "success"];
    for (i = 0; i < jugadoreslist.length; i++) {
        var color = jugadoreslist[i].color;
        var playerxx = jugadoreslist[i].posx;
        var playeryy = jugadoreslist[i].posy;
        jugadoresvivos.push(color);
        var bar = document.getElementById('barravida');
        bar.innerHTML += '<div class="progress" style="position: relative;  height: 25px; width: 150px; "><div aria-valuemax="100" aria-valuemin="0" aria-valuenow="' + jugadoreslist[i].vida + '" class="progress-bar-striped bg-' + opciones[i] + '" role="progressbar" style="width: ' + jugadoreslist[i].vida + '%;"></div></div>';

        //Player first pose
        //$("#players").;
        //Player animations
        playerAnimation["idle_down" + color] = new $.gameQuery.Animation({imageURL: "./Images/character/static/down/down_" + color + ".png"});
        playerAnimation["idle_up" + color] = new $.gameQuery.Animation({imageURL: "./Images/character/static/up/up_" + color + ".png"});
        playerAnimation["idle_right" + color] = new $.gameQuery.Animation({imageURL: "./Images/character/static/right/right_" + color + ".png"});
        playerAnimation["idle_left" + color] = new $.gameQuery.Animation({imageURL: "./Images/character/static/left/left_" + color + ".png"});

        playerAnimation["up" + color] = new $.gameQuery.Animation({imageURL: "./Images/character/up/up_" + color + "_idle.png", numberOfFrame: 4,
            delta: 26, rate: 200, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_MULTI});

        playerAnimation["down" + color] = new $.gameQuery.Animation({imageURL: "./Images/character/down/down_" + color + "_idle.png", numberOfFrame: 4,
            delta: 26, rate: 200, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_MULTI});

        playerAnimation["left" + color] = new $.gameQuery.Animation({imageURL: "./Images/character/left/left_" + color + "_idle.png", numberOfFrame: 8,
            delta: 30, rate: 150, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_MULTI});

        playerAnimation["right" + color] = new $.gameQuery.Animation({imageURL: "./Images/character/right/right_" + color + "_idle.png", numberOfFrame: 8,
            delta: 30, rate: 140, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_MULTI});
        $("#background").addSprite("player" + color, {animation: playerAnimation["idle_down" + color], posx: playerxx, posy: playeryy, width: playerWidth, height: playerHeight});

        bombas[color] = new $.gameQuery.Animation({imageURL: "./Images/bomb/static/" + color + "_bomb.png", numberOfFrame: 4,
            delta: 25, rate: 200, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gameQuery.ANIMATION_PINGPONG});
        bombas["blast" + color] = new $.gameQuery.Animation({imageURL: "./Images/bomb/blast/" + color + "_blast.png", numberOfFrame: 5,
            delta: 25, rate: 200, type: $.gameQuery.ANIMATION_VERTICAL | $.gameQuery.ANIMATION_ONCE});
    }
}

/**
 * Verificar si hay algún objeto con el que colisione las bombas
 * 
 * @param {x,y} Coordenadas de la bomba.
 * @returns {Array,Array} jugadores, bloquesblandos
 */
function colisionBomba(x, y, color) {
    //alert(x);
    //alert(y);
    var xder = x + 25;
    var xiz = x - 25;
    var yab = y + 25;
    var yar = y - 25;
    var posibilidades = [xder + "," + y, xiz + "," + y, x + "," + yar, x + "," + yab, x + "," + y];
    posibilidades.forEach(function (word) {
        var nameWord = word.replace(",", "alfa");
        var blastColision = word.split(",");
        $("#bombas").addSprite(nameWord, {animation: bombas["blast" + color], posx: blastColision[0], posy: blastColision[1], width: 25, height: 25});
        if (softBlocks.includes(word)) {
            //Mejorar blastX y blastY. No dejarlos estaticos.
            var index = softBlocks.indexOf(word);
            softBlocks.splice(index, 1);
            wordi = word.replace(",", "_");
            name = "softBlocks_" + wordi;
            $("#" + name).remove();
            $("#" + name).removeClass();
        }
        var bar = document.getElementById('barravida');
        bar.innerHTML = "";
        for (i = 0; i < jugadoreslist.length; i++) {
            var opciones = ["danger", "dark", "info", "success"];
            var calc = jugadoreslist[i].posx + "," + jugadoreslist[i].posy;
            if (calc.includes(word)) {
                jugadoreslist[i].vida -= 25;
            }
            bar.innerHTML += '<div class="progress" style="position: relative;  height: 25px; width: 150px; "><div aria-valuemax="100" aria-valuemin="0" aria-valuenow="' + jugadoreslist[i].vida + '" class="progress-bar-striped bg-' + opciones[i] + '" role="progressbar" style="width: ' + jugadoreslist[i].vida + '%;"></div></div>';
            if (jugadoreslist[i].vida <= 0) {

                if (idPlayer == jugadoreslist[i].color) {
                    idPlayer = "muerto";

                }
                $("#player" + jugadoreslist[i].color).remove();
                jugadoresvivos.splice(i, 1);
                jugadoreslist[i].vida = 1000;
                if (jugadoresvivos.length == 1) {
                    alert("gano el jugador " + jugadoresvivos[0]);
                }
            }
        }
        setTimeout(function () {
            $("#" + nameWord).remove();
        }, 900);
    });
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
 * Encontrar indice del personaje
 * 
 * @param {String} color
 * @returns {Int}
 */
function findPersonaje(colorx) {
    var indice = -1;
    for (i = 0; i < jugadoreslist.length; i++) {
        if (jugadoreslist[i].color == colorx) {
            indice = i;
        }
    }
    return indice;
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

/**
 * Guardar los datos de los diferentes jugadores 
 * 
 * @returns {Lista con todos los personajes}
 */
function obtenerDatosPersonajes() {

    var callback = {

        onSuccess: function (List) {
            jugadoreslist = List;
            playerSetup();


        }
    }
    bnbController.getPlayers(callback);
}

/*
 * 
 */
$(document).keydown(function (e) {
    switch (e.keyCode) {

        case 32: //this is bomb (space)
            stomp.publishPosition(e.keyCode, idPlayer);
            break;
        case 37: // (left arrow)
            stomp.publishPosition(e.keyCode, idPlayer);
            break;
        case 38: // (up arrow)
            stomp.publishPosition(e.keyCode, idPlayer);
            break;
        case 39: //this is right (right arrow)
            stomp.publishPosition(e.keyCode, idPlayer);
            break;
        case 40: //this is down! (down arrow)
            stomp.publishPosition(e.keyCode, idPlayer);
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
            stomp.publishState(e.keyCode, idPlayer);
            break;
        case 38: //this is up! (up arrow)
            stomp.publishState(e.keyCode, idPlayer);
            break;
        case 39: //this is right (right arrow)
            stomp.publishState(e.keyCode, idPlayer);
            break;
        case 40: //this is down! (down arrow)
            stomp.publishState(e.keyCode, idPlayer);
            break;
    }
});
