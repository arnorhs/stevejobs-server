var assert = require('assert');
var SteveJobsServer = require('../');
var request = require('request');
var http = require('http');

var options = {
    delay: 20,
    workers: 0, // we aren't testing the goodness of the underlying SteveJobs module (though we should)
    port: 1337
};

var host = 'localhost';

var server;
beforeEach(function() {
    server = SteveJobsServer(options);
    server.listen();
});

afterEach(function() {
    server.close();
});

function r(method, url, form, cb) {
    request({
        url: 'http://' + host + ":" + options.port + url,
        method: method,
        form: form
    }, cb);
}

// technically doesn't use the beforeEach, but whatever
describe('instantiating', function() {
    var steve = SteveJobsServer();
    it('should result in an instance of SteveJobsServer', function() {
        assert(steve instanceof SteveJobsServer, "assigned variable is not an instance of the server");
    });
    it('should have the http property and it should be an instance of http server', function() {
        assert(steve.http instanceof http.Server, "the http property is a " + steve.http.constructor);
    });
});

describe('after adding a job the queue', function() {
    var customString = "Custom string",
        jobName = 'do_something';
    beforeEach(function(done) {
        r('POST', '/job', { name: jobName, data: customString }, function(err, res, body) {
            if (err) throw new Error(err);
            assert(res.statusCode == 200, "Request code should be 200");
            done();
        });
    });
    describe('the queue', function() {
        it('should contain one item', function(done) {
            console.log(server.jobs);
            assert(server.jobs.length === 1, "Job queue does not contain one item after adding");
            done();
        });
    });
    describe('the data', function() {
        it('should contain the same variable that was inserted', function(done) {
            assert(server.jobs[0].data === customString, "The right data variable was not passed in");
            done();
        });
        it('should contain 0 retries', function(done) {
            assert(server.jobs[0].retries === 0, "Retries are not 0");
            done();
        });
        it('should contain the same name as was inserted', function(done) {
            assert(server.jobs[0].name === jobName, "The same name was not inserted");
            done();
        });
    });
});

describe('a request', function() {
    var customString = "Custom string",
        jobName = 'do_something';
    describe('to a wrong url', function() {
        it('should return a 404 and not add a job', function(done) {
            r('POST', '/asjdfsdjkf', { name: jobName, data: customString }, function(err, res) {
                if (err) throw new Error(err);
                assert(server.jobs.length === 0, "Job queue should not be updated");
                assert(res.statusCode == 404, "Server did not respond with a 404");
                done();
            });

        });
    });
    describe('to the right url without doing a POST request', function() {
        it('should return a 404 and not add a job', function(done) {
            r('GET', '/job', { name: jobName, data: customString }, function(err, res) {
                if (err) throw new Error(err);
                assert(server.jobs.length === 0, "Job queue should not be updated");
                assert(res.statusCode == 404, "Server did not respond with a 404");
                done();
            });
        });
    });
});

