Remote server instance wrapper for [https://github.com/arnorhs/stevejobs](SteveJobs), worker/job/task/queue processor.

### Install stevejobs-server from npm:

    npm install stevejobs-server

### Usage:

Make a new file and call it busy-greeter.js

```javascript
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
```
Start the server using:

    node busy-greeter.js

From another terminal window do an HTTP POST request to add a job:

    curl -X POST localhost:1337/job --data "name=greeter&data=Arnor"

And your job should be run by the server.

You can add the option `verbose` to start logging stuff to the console.

### TODO:

- Write tests .. somehow

