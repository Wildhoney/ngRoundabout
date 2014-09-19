(function($process) {

    "use strict";

    var express     = require('express'),
        app         = express(),
        server      = require('http').createServer(app),
        chunk       = require('chunk'),
        glob        = require('glob'),
        path        = require('path');

    app.use(express.static(__dirname + '/..'));
    server.listen($process.env.PORT || 3507);

    app.get('/pictures.json', function(request, response) {

        glob('example/images/*.jpg', {}, function (error, files) {

            files = files.map(function map(file) {
                return 'images/' + path.basename(file);
            });

            var groupedPictures = chunk(files, 3);
            response.send(JSON.stringify(groupedPictures));

        });

    });

})(process);