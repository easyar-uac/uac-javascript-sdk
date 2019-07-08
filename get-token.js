'use strict';

var argv = require('yargs')
    .usage('Usage: $0 [apiKey] [apiSecret]')
    .demand(1)
    .help('h').alias('h', 'help')
    .epilog('copyright 2019, sightp.com')
    .argv;

var host = 'https://uac.easyar.com';

var apikey = argv._[0];
var apisecret = argv._[1];
var acl = [{
    "service": "ecs:spatialmap", 
    "effect": "Allow",  
    "resource": [
        "Your spatialmap cloud ID" 
    ],
    "permission": ["READ"]
}] 

var uacClient = require('./uacClient')(host, apikey, apisecret);

uacClient.getToken({
    'apiKey': apikey,
    // ACL is optional
    //'acl': JSON.stringify(acl),
    'expires': 3600
})
.then(function(resp) {
    console.log(resp);
})
.fail(function(err) {
    console.log(err);
});
