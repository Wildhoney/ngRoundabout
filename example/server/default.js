(function($process) {

    "use strict";

    var express     = require('express'),
        app         = express(),
        server      = require('http').createServer(app),
        chunk       = require('chunk'),
        glob        = require('glob'),
        path        = require('path'),
        httpRequest = require('request');

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

    app.get('/imgur.json', function(request, response) {

        var options = {
            url: 'https://api.imgur.com/3/gallery/random/random/1',
            headers: {
                Authorization: 'Client-ID 026d06d6abb16e6'
            }
        };

        httpRequest(options, function(error, res, body) {

            var collection = JSON.parse(body).data,
                images     = [];

            collection.forEach(function forEach(model) {

                var parsedPath = path.extname(model.link).split('.'),
                    extension  = parsedPath[parsedPath.length - 1];

                if (extension) {
                    images.push(model.link);
                }

            });

            response.send(JSON.stringify(images || []));

        });

    });

})(process);