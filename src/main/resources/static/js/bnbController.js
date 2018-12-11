var bnbController = (function () {

    var getMap = function (callback) {
        axios.get('/bnb/blocklist').then(function (response) {
            callback.onSuccess(response.data);
        }).catch(function (error) {
            console.log(error);
        })
    };

    var setRoom = function (id) {
        axios.post('/bnb/room', id, {headers: {'Content-Type': 'application/json'}}).then(function (response) {
            stomp.connectSuscribe(id);
        }).catch(function (error) {
            console.log(error);
        });
    };
    var getPlayers = function (callback) {
        axios.get('/bnb/players').then(function (response) {
            callback.onSuccess(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    };

    return {
        getMap: getMap,
        setRoom: setRoom,
        getPlayers: getPlayers
    };

})();