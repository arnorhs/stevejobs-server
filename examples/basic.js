var Steve = require('../index');

var server = Steve({
    port: 1337,
    delay: 2000 // ms
});

server.addHandler('greeter', function(done, data) {
    console.log("Hello " + data);
    done();
});

server.listen();
