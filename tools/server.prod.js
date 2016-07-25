var express = require("express");
var path = require("path");
var app = express();

/* 
 * clean dist, copy assets, copy index.html, etc.....
 * minify, bundle, inject, etc...
 * 
 * either programatically via node, or through the CLI via npm scripts, up to you
 */

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', function(req, res) {
    res.render('../dist/index.html');
});

app.listen(3000, function(){
    console.log("Server is listening on port 3000");
});