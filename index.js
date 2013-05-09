var SteveJobsServer = require('./lib/server.js');

var server = SteveJobsServer({
    port: 1337,
    secret: "Myawesomesecretpassword"
});

server.connect();

