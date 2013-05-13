var SteveJobs = require('stevejobs'),
    http = require('./lib/http'),
    xtend = require('xtend'),
    inherits = require('util').inherits;

function SteveJobsServer(options) {
    if (!(this instanceof SteveJobsServer)) {
        return new SteveJobsServer(options);
    }

    options = xtend({}, {
        port: 7039
    }, options);

    SteveJobs.call(this, options);
    steve = this;

    // there's only one thing from the server we care about
    this.http = http(function(name, data) {
        steve.addJob(name, data);
    });
}
inherits(SteveJobsServer, SteveJobs);

module.exports = SteveJobsServer;

SteveJobsServer.prototype.listen = function() {
    this.start();
    this.http.listen(parseInt(this.options.port, 10));
};

SteveJobsServer.prototype.close = function() {
    this.stop();
    this.http.close();
};
