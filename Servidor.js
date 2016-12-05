var net = require("net");
var manejador = require('./manejadorclientes').manejador_clientes(3);
var child = require('child_process').spawn; 


var envioserial=false;
var server = net.createServer();

function BloqueoPuerta(){
	//ejecutar script desbloquearpuerta
	var python = child( 'python',['Serialcom.py','off']);
	console.log("Puerta Bloqueada de Nuevo");
 	manejador.Clearlientes();
	envioserial=false;	
}

server.on("connection", function (socket){
	console.log("nueva conexion establecida");
	socket.on("data",function(data){
		console.log("dato enviado: "+data);
		if(manejador.IsActivo()){
			manejador.InsertClientes(data.toString());
		}		
		if(!manejador.IsActivo() && !envioserial){			
			if(manejador.IsDierent()){
				//ejecutarScript envio serial
				var python = child( 'python',['Serialcom.py','on']);
				envioserial=true;//ya envio el alto
				console.log("puerta Desbloqueada");
				setTimeout(BloqueoPuerta,1000*30);				
			}
			else{
				console.log("Intente de Nuevo");
				manejador.Clearlientes();
			}//fin pregunta si es diferente
		}// fin pregunta si debe enviar el pulso alto		
	});
});
server.listen(1234,function(){
	console.log("Servidor Activo");
});

