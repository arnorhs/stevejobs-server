var SteveJobs = require('stevejobs');

function SteveJobsServer(options) {
    if (!(this instanceof SteveJobsServer)) {
        return new SteveJobsServer(options);
    }
    this.steveJobs = SteveJobs(options);

    // create the http server.. or i guess something
}
module.exports = SteveJobsServer;

SteveJobsServer.prototype.connect = function() {
    // connect the http server
    // add request handlers for certain requests to add to the queue
};



