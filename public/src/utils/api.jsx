var Fetch = require("whatwg-fetch");

module.exports = {
    get: function(urlpath) {
        console.log("Getting:", urlpath);
        return fetch(urlpath)
                .then(
                    function(response){
                        console.log("Response Received", response)
                        if(response.status>=400 && response.status<600) { 
                            return {status:response.status, fetchHasFailed:true}; 
                        }
                        else { return response.json(); }
                    },
                    function(error) { console.log("Error", error) }
                );
    },
    post: function(urlpath, payload) {
        console.log("Posting:", urlpath, payload);
        var header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        var payload = JSON.stringify(payload);
        return fetch(urlpath, {method:"POST", headers:header, body:payload} )
                .then(
                    function(response){
                        console.log("Response Received", response);
                        if(response.status>=400 && response.status<600) { 
                            return {status:response.status, fetchHasFailed:true, statusText:response.statusText}; 
                        }
                        else { return response.json(); }
                    },
                    function(error) { console.log("Error", error) }
                );
    },
    delete: function(urlpath) {
        console.log("Deleting:", urlpath);
        return fetch(urlpath, {method:"DELETE"} )
                .then(
                    function(response){
                        console.log("Response Received", response);
                        if(response.status>=400 && response.status<600) { 
                            return {status:response.status, fetchHasFailed:true, statusText:response.statusText}; 
                        }
                        else { return response; }
                    },
                    function(error) { console.log("Error", error); }
                );
    }
}