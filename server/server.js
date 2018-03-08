// var http = require('http'),
//     url = require("url"),
//     path = require("path"),
//     fs = require("fs");
//
// var currentPath = process.cwd()
// http.createServer(function (req, res) {
//
//     var uri = url.parse(req.url).pathname;
//
//     if(uri === '/'){
//         fs.readFile(path.join(currentPath, '../dist/index.html'), "binary", function(err, file) {
//             if(err) {
//                 res.writeHead(500, {"Content-Type": "text/html"});
//                 res.write(err + "\n");
//                 res.end();
//                 return;
//             }
//
//             res.writeHead(200);
//             res.write(file, "binary");
//             res.end();
//             return;
//         });
//     }
//     else if(uri === '/about' || uri === '/about/'){
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.write(uri);
//         res.end();
//         return;
//     }
//     else {
//         res.writeHead(404, {"Content-Type": "text/plain"});
//         res.write("404 Not Found\n");
//         res.end();
//     }
//
// }).listen(8888);

var http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs")
port = process.argv[2] || 8800;

http.createServer(function(request, response) {

    var uri = url.parse(request.url).pathname
        , filename = path.join(process.cwd() + '/../dist', uri);

    var contentTypesByExtension = {
        '.html': "text/html",
        '.css':  "text/css",
        '.js':   "text/javascript"
    };

    fs.exists(filename, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            var headers = {
                "Cache-Control": "public, max-age=86400",
                "Expires": new Date(Date.now() + 86400000).toUTCString()
            };

            var contentType = contentTypesByExtension[path.extname(filename)];
            if (contentType) headers["Content-Type"] = contentType;
            response.writeHead(200, headers);
            response.write(file, "binary");
            response.end();
        });
    });
}).listen(parseInt(port, 10));

console.log("Static file server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");