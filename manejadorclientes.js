module.exports.manejador_clientes=function(cantidadClientes){ 
	//------Declaracion de variables------//
	var _cantidadClientes= cantidadClientes;
	var activo=true;	

  	//-----Prototipo de clientes-------//
	function cliente(){
		var activo= false;
		var Id="";
		function get_isActive(){return activo;};
		function get_ClientId(){return Id;};
		function Set_ClientID(ClientID){
				Id=ClientID;
				activo=true;		
		};
	
		function Clearcliente(){
			Id="";
			activo= false;
		};

		return {	
				get_isActive:get_isActive,get_ClientId:get_ClientId,
	       			Set_ClientID:Set_ClientID,Clearcliente:Clearcliente
		};
	}

	//---Definicion Prototipo Principal//
	
	
	var arregloclientes = new Array(_cantidadClientes);

	for(var i=0; i< arregloclientes.length;i++){
		 arregloclientes[i]= new cliente();
	}

	function IsActivo(){ return activo;};
	
	function InsertClientes(Id){
		var iterador=0;
		var ClientesActivos= arregloclientes.length;
		for(iterador in arregloclientes){
			if(activo && !arregloclientes[iterador].get_isActive()){
				arregloclientes[iterador].Set_ClientID(Id);				
				break;
			}
			else{
				ClientesActivos--;
			}
		}
		activo = (ClientesActivos == 0 || iterador== arregloclientes.length-1)  ? false : true; // si no hay cupo libre en ninguno de la lista clientes el manejador es falso            
			 
	};
	
	function Clearlientes(){
	
		for(var iterador in arregloclientes){
			arregloclientes[iterador].Clearcliente();
		}
		activo= true;
	}

	function IsDierent(){
		var IsDiferentID=true;
		if(arregloclientes.length>1){
			for(var i=0; i< arregloclientes.length-1 && IsDiferentID; i++){
				var clave=arregloclientes[i].get_ClientId();
				for(var j=i+1; j< arregloclientes.length && IsDiferentID; j++){
					IsDiferentID = (clave != arregloclientes[j].get_ClientId()) ? true : false;					
				}

			}
		}
		else{
			IsDiferentID=true;		
		}
		
		return IsDiferentID;
	}

	return{ IsActivo:IsActivo, InsertClientes:InsertClientes, 
		Clearlientes:Clearlientes,IsDierent:IsDierent
	};

}; 

