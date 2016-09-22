/*
Node js server
 */
var http = require('http');
var server = http.createServer(function(){

});

server.listen(1234,function(){
	console.log('Port 1234 working YAAAS.');
});
 /*
 web socket server
  */
 
 var webSocketServer = require('websocket').server;
 var wsServer = new webSocketServer({
 	/*
 	recibe un objeto
 	 */
 	httpServer: server
 });

 var count = 0;
 var clients = {
 	/*
 	objeto
 	 */
 };

 wsServer.on('request',function(req){
 	/*
 	acepto la conexion y le doy el protocolo echo, y el request.origin me da 
 	los datos del cliente en el cual esta conectado.
 	 */
 	var connection = req.accept('echo-protocol',req.origin); 
 	var id = count++;
 	/*
 		le agrego al objeto el id
 	 */
 	clients[id] = connection;
 	console.log("New connection accepted yujuuu! " + id);
 	/*
 	Recibe el mjs desde el utf8 de html
 	 */
 	connection.on('message',function(message){
 		var msString = message.utf8Data;
 		/*
 			broadcasting
 			recorrer un objeto
 		 */
 		
 		for(var client in clients){
 			clients[client].sendUTF(msString);
 		}

 	});
 	/*
 		cliente exit
 	 */
 	connection.on('close',function(reasonCode,description){
 		delete clients[id];
 		console.log('Client desconnected. Id ' + id + ', address: '+ connection.remoteAdress + '\n' + description);
 	});
 });



