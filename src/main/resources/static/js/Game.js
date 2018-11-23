
var PLAYGROUND_HEIGHT = 480;
var PLAYGROUND_WIDTH = 850;
var playerAnimation = new Array();
var bombas = new Array();
var playerx = 15;
var playery = 0;
var playerWidth = 75;
var playerheight = 50;

var game = (function () {

    var updatePositionPlayer = function (e) {
        switch (e) {
            case 32: //this is bomb (space)
                name = "bomb" + playerx.toString() + playery.toString();
                $("#bombas").addSprite(name, {width: 25, height: 25, animation: bombas["black"], posx: playerx, posy: playery});
                break;
            case 37: // (left arrow)
                $("#player").remove();
                $("#players").addSprite("player", {width: playerWidth / 3, height: playerheight, animation: playerAnimation["left"], posx: playerx - 25, posy: playery});
                playerx -= 25;
                break;
            case 38: // (up arrow)
                $("#player").remove();
                $("#players").addSprite("player", {width: playerWidth / 3, height: playerheight, animation: playerAnimation["up"], posx: playerx, posy: playery - 25});
                playery -= 25;
                break;
            case 39: //this is right (right arrow)
                $("#player").remove();
                $("#players").addSprite("player", {width: playerWidth / 3, height: playerheight, animation: playerAnimation["right"], posx: playerx + 25, posy: playery});
                playerx += 25;
                break;
            case 40: //this is down! (down arrow)
                $("#player").remove();
                $("#players").addSprite("player", {width: playerWidth / 3, height: playerheight, animation: playerAnimation["down"], posx: playerx, posy: playery + 25});
                playery += 25;
                break;

        }
    };

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
        updateStatePlayer: updateStatePlayer
    };
})();

$(function () {

    //The background
    var backgroundanimation = new $.gQ.Animation({imageURL: "./Images/maps/yellowMap.png"});

    //Player animations
    playerAnimation["idle_down"] = new $.gameQuery.Animation({imageURL: "./Images/character/static/down/down_black.png"});
    playerAnimation["idle_up"] = new $.gameQuery.Animation({imageURL: "./Images/character/static/up/up_black.png"});
    playerAnimation["idle_right"] = new $.gameQuery.Animation({imageURL: "./Images/character/static/right/right_black.png"});
    playerAnimation["idle_left"] = new $.gameQuery.Animation({imageURL: "./Images/character/static/left/left_black.png"});

    playerAnimation["up"] = new $.gameQuery.Animation({imageURL: "./Images/character/up/idle_up_black.png", numberOfFrame: 424,
        delta: 26, rate: 200, distance: 26, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_ONCE});

    playerAnimation["down"] = new $.gameQuery.Animation({imageURL: "./Images/character/down/idle_down_black.png", numberOfFrame: 424,
        delta: 26, rate: 200, distance: 26, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_MULTI});

    playerAnimation["left"] = new $.gameQuery.Animation({imageURL: "./Images/character/left/idle_left_black.png", numberOfFrame: 1920,
        delta: 30, rate: 150, distance: 26, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_MULTI});

    playerAnimation["right"] = new $.gameQuery.Animation({imageURL: "./Images/character/right/idle_right_black.png", numberOfFrame: 1920,
        delta: 30, rate: 140, distance: 26, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_MULTI});

    //Bombas
    bombas["black"] = new $.gameQuery.Animation({imageURL: "./Images/bomb/bomb_black.png", numberOfFrame: 800,
        delta: 50, rate: 200, distance: 26, type: $.gameQuery.ANIMATION_HORIZONTAL | $.gQ.ANIMATION_MULTI});


    // Initialize the game:
    $("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, keyTracker: true});

    // Initialize the background
    $.playground().addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
            .addSprite("background1", {animation: backgroundanimation, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
            .end()
            .addGroup("players", {posx: playerx, posy: playery, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
            .addSprite("player", {animation: playerAnimation["idle_down"], posx: playerx, posy: playery, width: playerWidth, height: playerheight})
            .end()
            .addGroup("bombas", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT});

    $("#start").click(function () {
        $.playground().startGame(function () {
            $("#start").fadeTo(1000, 0, function () {
                $(this).remove();
            });
        })
    });
});


var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

$(document).on('keyup', function (e) {
    delay(function () {
        //$("#player").remove();
        //$("#players").addSprite("player", {width: playerWidth, height: playerheight, animation: playerAnimation["idle"], posx: playerx, posy: playery});
        //$("#bombas").addSprite(name, {width: 25, height: 25, animation: bombas["black"], posx: playerx, posy: playery});
    }, 400);
});


$(document).keydown(function (e) {
    stomp.publishPosition(e.keyCode);
});

//this is where the keybinding occurs
$(document).keyup(function (e) {
    stomp.publishState(e.keyCode);
});
