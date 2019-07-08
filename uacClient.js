'use strict';

var request = require('superagent');
var Q = require('q');
Q.longStackSupport = true;

var auth = require('./auth');

function uacClient(host, apikey, apisecret) {

    function signParams(params) {
        params = params || {};
        return auth.signParams(params,
            new Date().getTime(),
            apikey,
            apisecret
        );
    }

    function errorJson(json) {
        return new Error(JSON.stringify(json, null, 2));
    }

    function done(resolve, reject) {
        return function(err, res) {
            if (err) {
                reject(err);
            } else {
                var body = res.body;
                if (body.statusCode) reject(errorJson(body));
                else resolve(body);
            }
        };
    }

    function getToken(apikey) {
        return Q.promise(function(resolve, reject) {
            request.post(host + '/token/v2')
            .send(signParams(apikey))
            .end(done(resolve, reject));
        });
    }


    return {
        getToken: getToken
    };

}

module.exports = uacClient;
