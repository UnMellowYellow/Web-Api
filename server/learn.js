var express = require('express');  
var app = express(); 
var fs = require('fs'); 
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/bower_components'));  



app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
    io.on('connection', function(client) {  
	    console.log('Client connected...');

	    client.on('join', function(data) {
        console.log(data);
        fs.writeFile('test.json', JSON.stringify(data),"utf-8",function (err) {
            if (err) return console.log(err);
             console.log('Hello World > test.txt');
        });
        client.emit('messages',"Hello from the Server!");
        return;
    	});
	});

    //.on('Submit',function(client){ 
    	 //ient.emit('text',data);
    	 //nsole.log("Hello");
});

/*fs.writeFile('test.txt', , function (err) {
  if (err) return console.log(err);
  //console.log('Hello World > test.txt');
});*/



server.listen(1337);



