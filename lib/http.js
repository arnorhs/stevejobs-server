var http = require('http'),
    url = require('url'),
    qs = require('querystring');

module.exports = function(callback) {
    return http.createServer(function(req, res) {
        var uri = url.parse(req.url).pathname;

        if (!uri.match(/job/) || req.method !== 'POST') {
            return response(res, 404);
        }
        // somebody's adding a job
        var body = '';
        req.on('data', function (data) {
            body += data;
        });

        req.on('end', function () {
            var postParams = qs.parse(body);
            var name = postParams.name;
            var data = postParams.data;
            if (!data || !name) {
                response(res, 400);
            } else {
                callback(name, data);
                response(res, 200);
            }
        });
    });
};

function response(res, no) {
    var codes = {
        "400": "400 Bad request\n",
        "404": "404 Not Found\n",
        "200": "200 OK\n"
    };

    res.writeHead(no, {"Content-Type": "text/plain"});
    res.write(codes[no]);
    res.end();
}
