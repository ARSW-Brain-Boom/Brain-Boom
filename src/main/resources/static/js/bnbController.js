var axios = (function () {

    var getMap = function () {
        axios.get('/bnb/blocklist')
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
    };

    var setRoom = function (id) {
        axios.post('/user', id, {headers: {'Content-Type': 'application/json'}})
                .then(function (response) {
                    console.log(response);
                })
    };
    
    return {
        getMap: getMap,
        setRoom: setRoom
    };
    
})();