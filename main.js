const http = require('http');
const fs = require('fs');

const dashboard = require('./dashboard.js');
const database = require('./pseudo_database.js');

http.createServer((request, response) => {
    if (request.url.toLowerCase().indexOf('.css') > -1)
    {
      var filePath = '.' + request.url;
      fs.readFile(filePath, function(error, content)
      {
        response.writeHead(200, {'Content-type' : 'text/css'});
        return response.end(content, 'utf-8');
      });
    }
    else if (request.url.toLowerCase().indexOf('.png') > -1)
    {
      var filePath = '.' + request.url;
      fs.readFile(filePath, function(error, content)
      {
        response.writeHead(200, {'Content-type' : 'image/png'});
        return response.end(content);
      });
    }
    else
    {
      response.writeHead(200, {'Content-Type': 'text/html'});
      dashboard.GetHtml(response, callback);
      function callback(){ return response.end(); }
    }
}).listen(8088);