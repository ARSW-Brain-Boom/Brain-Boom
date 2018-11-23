var stomp = (function () {

    var stompClient = null;
    var room = null;

    var connectAndSubscribe = function () {
        console.info('Connecting to WS...');
        var socket = new SockJS('/stompendpoint');
        stompClient = Stomp.over(socket);

        //subscribe to /topic/TOPICXX when connections succeed
        stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/newposition.' + room, function (eventbody) {
                game.updatePositionPlayer(parseInt(eventbody.body));
                //game.updateStatePlayer(parseInt(eventbody.body));
            });
            stompClient.subscribe('/topic/newstate.' + room, function (eventbody) {
                game.updateStatePlayer(parseInt(eventbody.body));
            });
        });
    };


    return {

        init: function () {
            //websocket connection
            //connectAndSubscribe();
        },

        publishPosition: function (e) {
            if (stompClient != null) {
                stompClient.send("/app/newposition." + room, {}, e);
            } else {
                alert("Al parecer no estás en una sala!");
            }
        },

        publishState: function (e) {
            if (stompClient != null) {
                stompClient.send("/app/newstate." + room, {}, e);
            } else {
                alert("Al parecer no estás en una sala!");
            }
        },

        connectSuscribe: function (r) {
            if (!isNaN(parseInt(r))) {
                room = r;
                connectAndSubscribe();
            } else {
                alert("Debe ingresar un número de sala válido");
            }
        },

        disconnect: function () {
            if (stompClient !== null) {
                stompClient.disconnect();
                stompClient = null;
                document.getElementById("btnConnect").disabled = false;
                document.getElementById("btnDisconnect").disabled = true;
                can.getContext('2d').clearRect(0, 0, can.width, can.height);
                can.removeEventListener("click", eventMouse);
            }
            //setConnected(false);
            console.log("Disconnected");
        }
    };

})();
