


	function login(){
		//var uid = device.uuid;
		var room_form = $("#room").val();
		var ip_form = $("#ip").val();
		var ip_device = $("#ip_device").val();
		var serial = $("#serial").val();
		var versionSmart = "1.0";
		
		var url = cordova.file.externalRootDirectory + "licencia.json";
		$.get(url,{room:"a"}, res);

		function res(response){
			//localStorage.setItem["mem_licencia",response];
			var uid = response;
			localStorage.setItem("mem_lic", uid);
			localStorage.setItem("mem_registro", ip_form);
			localStorage.setItem("mem_room", room_form);


			$.get("http://"+ ip_form + "/servicios/tv.php",{room: room_form, uid: uid, version: versionSmart, ip: ip_device, serial: serial}, tvres, "jsonp");

			function tvres(respuesta){

				console.log("parseo respuesta header y contenido ");

				var contenido = respuesta.contenido;
				var header = respuesta.header;
				var reserva = respuesta.reserva;
				var nombre = respuesta.nombre;
				var mensajes = respuesta.mensajes;
				var salida = respuesta.salida;
				var llegada = respuesta.llegada;
				var idioma = respuesta.idioma;

				localStorage.setItem("mem_reserva", reserva);
				localStorage.setItem("mem_nombre", nombre);
				localStorage.setItem("mem_llegada", llegada);
				localStorage.setItem("mem_salida", salida);
				localStorage.setItem("mem_mensajes","[]");
				if (idioma == "es"){localStorage.setItem("mem_lenguaje", idioma)}else{localStorage.setItem("mem_lenguaje", null)};

				$(header).appendTo("head");
				$('#cuerpo').html(contenido);


			}

		
		
		}
	}
  
	function aaap(appa,actividad){
		actividad = actividad || 'MainActivity';
		$.showLoading({name: 'circle-fade',allowHide: true}); 
		window.launch.app({package:appa, activity:'MainActivity'});
	}


	function autoIni(){
	//alert ("Inicio funciones");
	//$.showLoading({name: 'circle-fade',allowHide: true});
	var registro = localStorage.getItem("mem_registro");
	//var registro = "186.116.1.117";
	var room = localStorage.getItem("mem_room");
	//var uid = "100000000002";
	var uid = localStorage.getItem("mem_lic");
	var online = navigator.onLine;
	//var uid = device.uuid;
	//alert ("uid es: " +uid);
		if (online){
			if (registro == null){
				
				// TV no registrado, imprimo formulario para registrarlo.
				var contenido = '<div class="container content px-5"> <div class="row h-100 justify-content-center align-items-center mt-2 mb-2 overflow-hidden"> <div class="col-6 vh-67 my-vh-1-5"> <div class="row d-flex flex-column"> <div class="col-12"> <div class="card bg-overlay text-white"> <div class="card-body"> <h1 class="card-title text-warning">SmartHotel TV</h1> <p class="card-text">Este TV aún no se encuentra registrado en SmartHost, ingrese los datos y registrelo:</p></div></div></div><div class="col-12"> <div class="card bg-overlay text-white"> <div class="card-body"> <div class="row"> <div class="col-5 mx-4 border border-light">Dirección SmartHost</div><div class="col-5 text-center border border-light"><input type="text" id="ip" placeholder="xxx.xxx.xxx.xx" ></div><div class="w-100"></div><div class="col-5 mx-4 border border-light">IP Terminal</div><div class="col-5 text-center border border-light"><input type="text" id="ip_device" placeholder="xxx.xxx.xxx.xx" ></div><div class="w-100"></div><div class="col-5 mx-4 border border-light">Serial Terminal</div><div class="col-5 text-center border border-light"><input type="text" id="serial" placeholder="xxxx" ></div><div class="w-100"></div><div class="col-5 mx-4 mt-2 border border-light">Habitación</div><div class="col-5 mt-2 text-center border border-light"><input type="text" id="room" placeholder="xxx" ></div><div class="w-100"></div><div class="col-12 mt-3 text-right"><button onClick="login()"> Registrar! </button></div><div class="w-100"></div></div></div></div></div></div></div></div></div>';
				$('#cuerpo').html(contenido);
				$.hideLoading();
				
				
			} else {
				
				$.get("http://"+ registro + "/servicios/tv.php",{room: room, uid: uid}, tvres, "jsonp");
		 
				function tvres(respuesta){
			 
					console.log("gogo smarthome!");

					var contenido = respuesta.contenido;
					var header = respuesta.header;
					
					var contenido = respuesta.contenido;
					var header = respuesta.header;
					var reserva = respuesta.reserva;
					var nombre = respuesta.nombre;
					//var mensajes = respuesta.mensajes;
					var urlinfo = respuesta.urlinfo;
					var salida = respuesta.salida;
					var llegada = respuesta.llegada;
					var idioma = respuesta.idioma;
					
					//var urlinfo = localStorage.getItem("mem_urlinfo");$('a.infoa').attr("href", urlinfo);
					localStorage.setItem("mem_urlinfo", urlinfo);
					localStorage.setItem("mem_reserva", reserva);
					localStorage.setItem("mem_nombre", nombre);
					//localStorage.setItem("mem_mensajes", "[]"); no puedo porque nunca tendria mensajes siempre los borraria
					localStorage.setItem("mem_llegada", llegada);
					localStorage.setItem("mem_salida", salida);
					if (idioma != "es"){localStorage.setItem("mem_lenguaje", idioma)}else{localStorage.setItem("mem_lenguaje", null)};
					
					//$(header).appendTo("head");
					$('#cuerpo').html(contenido);
					
					$.hideLoading();
				
				}
				
				
				}
		}else{
			
		var contenido = '<div class="alert alert-danger" role="alert" id="msgalerta"> <p><b>Fuera de Línea:</b> Por favor conecte el TV a la red inalámbrica del hotel para disfrutar de una mejor experiencia en línea. <button type="button" onClick="aaap(\'com.android.tv.settings\',\'connectivity.NetworkActivity\')" class="close text-red px-1 selectable-contour selectable " data-toggle="collapse" data-target="#msgalerta" aria-label="Close"><span aria-hidden="true">Abrir Conexiones</span></p></button></div><div class="messages-container collapse" id="messagesContainer"><button type="button" class="close text-white px-1 selectable-contour selectable " data-toggle="collapse" data-target="#messagesContainer" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="message"><p class="text-justify"><span class="fa fa-caret-right"></span>Sin mensajes nuevos... </p></div></div><div class="container"><div class="row"><div class="col-lg-6"><div class="card bg-overlay text-white overflow-auto"><div id="widgets" class="card-body font-weight-bold"><h1 class="card-title text-yellow ">Bienvenido estimado Huésped!</h1><p class="card-text">Gracias por preferirnos, el equipo esta presto a servirle.</p><table class="custom-table"><tr><td class="text-left">Fecha Check In</td><td></td></tr><tr><td class="text-left">Fecha Check Out</td><td></td></tr><tr><td rowspan="2"><h2>Room: - Fuera de Línea -</h2></td><td><span id="picoyplaca">- Fuera de Línea -</span><br>Pico y Placa</td></tr><tr><td><span class="border-right pr-2"><i class="fas fa-dollar-sign"></i></span><span class="ml-2" >USD <span id="dolar"></span> </span></td></tr><tr><td><span class="border-right pr-2" ><span id="clima"></span>°</span><span class="border-right px-4">Bogota DC</span><span class="px-2"><a href="apps.html"><i class="fas fa-cloud m-auto"></i></a></span></td><td><span class="border-right pr-2"><i class="fas fa-euro-sign"></i></span><span class="ml-2">Euro <span id="euro"></span></span></td></tr></table></div></div></div><div class="col-lg-6"><div class="card text-left overflow-auto text-white"><div class="embed-responsive embed-responsive-16by9"><video autoplay muted controls loop><source src="http://186.116.1.117/video/video.mp4" type="video/mp4"> video no soportado </video></div></div></div></div></div>';
				$('#cuerpo').html(contenido);
				$.hideLoading();

		}
	}
	

function print_vuelos()
{
	$.showLoading({name: 'circle-fade',allowHide: true}); 
//	alert ("inicio vuelos");
	var control_name_vuelos = localStorage.getItem("nombredb");
	var registro = localStorage.getItem("mem_registro");
	/*
	var control_vueloshtml = localStorage.getItem("mem_vueloshtml");	
	if(control_vueloshtml){

		var animation="slideInRight";
  		$("#variableContent").hide();
		$("#mainContent").hide();
  		$("#varTitle").html("Salidas de Vuelos");

		$("#varImage").hide();
		$("#varText").html(control_vueloshtml);
					
  		if(!$('#variableContent').is(':visible')){
  			$("#variableContent").addClass('animated '+animation);
  			$("#variableContent").show();	       
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                $("#variableContent").removeClass('animated '+animation);
            }, 1000);
        }
		console.log("Tengo en memoria asi que imprimo ");
	}else{*/

	
						$.get("http://"+registro+"/servicios/vuelos.php",{nombre: control_name_vuelos}, vuelosres, "jsonp");
 function vuelosres(respuesta){
	 
	 console.log("parseo respuesta vuelos solos: " + respuesta);
	 html ='';
	 html +='<div class="introForm" style=" allign:center; width: 90%;"><p>Mostrando los vuelos salientes del aeropuerto local en la pr&oacute;xima hora:</p><br></div>';
	 $.each(respuesta, function() {
	 html +='<div id="infoVuelo">';
	 html += '<div class="aerolinea">'+this['aerolinea'];
						if(this['delays']){
						html += '<span id="vuelo" class="pull-right">Vuelo Retrasado '+this['delays']+' Minutos</span></div>';
						}else{
							html += '<span id="vuelo" class="pull-right">Estado: '+this['estado']+'</span></div>';
						}
						html += '<div class="destino">'+this['avion_salida']+' - '+this['avion_destino']+' / '+this['minutosalaire'];
                        html += '<span id="vuelo" class="pull-right">Flight '+this['avion_numero']+'</span>';
                        html += '</div>';
                        html += '<div class="salida">Salida <span class="pull-right">Llegada</span></div>';
                        html += '<div class="hora">';
                        html += '<img src="imagesjv/icon_horario_vuelos.svg" width="20px"></img> '+this['salida'];
                        html += '<div id="horaLegada" class="pull-right"><span class="fa fa-clock-o"></span> '+this['llegada']+'</div>';
                        html += '</div>'
                    	html += '</div>'
	 
	 });
	 
	 //localStorage.setItem("mem_vueloshtml", html);
	 
	 
  		var animation="slideInRight";
  		$("#variableContent").hide();
		$("#mainContent").hide();
  		$("#varTitle").html("Salidas de Vuelos");

		//$("#varImage").hide();
		$("#varText").html(html);
					
  		if(!$('#variableContent').is(':visible')){
  			$("#variableContent").addClass('animated '+animation);
  			$("#variableContent").show();	       
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                $("#variableContent").removeClass('animated '+animation);
            }, 1000);
        }
		$.hideLoading();
  	
	 
	 
	 
	 //}
	}
}


function print_cuenta(){
	$.showLoading({name: 'circle-fade',allowHide: true});
var control_reserva = localStorage.getItem("mem_reserva");
var control_room = localStorage.getItem("mem_room");
	var registro = localStorage.getItem("mem_registro");
console.log("pido cuenta datos: " +control_reserva +" hab: "+ control_room);

						$.get("http://"+registro+"/servicios/cuenta.php",{reserva: control_reserva,room: control_room}, cuentares, "jsonp");
 function cuentares(respuesta){
	 html ='';
	 var totalc = 0;
	 html +='<div class="introForm" style=" allign:center; width: 90%;"><p>Estado de cuenta para reserva #'+control_reserva+':</p><br></div>';
	 $.each(respuesta, function() {
     html += '<div><span>'+this['cargo']+'</span><span class="price">'+this['precio']+'</span></div>';
	 var totaltempnum = this['precio'].replace(/\D/g, '');
	 var totaltempint = parseInt(totaltempnum);
 	 var totalc = totalc + totaltempint;
	 });
	 html += '<div><span>Total: </span><span class="price">'+totalc+'</span></div>';
	 html += '<div class="account-summary text-right text-white"><h4 class="card-title text-yellow ">IMPORTANTE*</h1><br>Estos valores no incluyen cargos por alojamiento, <br>los valores incluyen impoconsumo e iva.</div>';
	 $("#cuenta").html(html);
	 $.hideLoading();
	 
 }
	
}

function goservicios(servicio) {
  //console.log("goservicios");
  var control_room = localStorage.getItem("mem_room");
  var control_nombre = localStorage.getItem("mem_nombre");
  var opcion = $( "#serv_opcion option:selected" ).text();
  var com = $( "#serv_commentarios").val();
  var registro = localStorage.getItem("mem_registro");
  
  console.log("opcion "+opcion+" com "+com);
  if (servicio == "Ama de llaves") {
  $.get("http://"+registro+"/controller/crear_mucama.php",{opcion: opcion,com: com,room: control_room, nombre: control_nombre}, res, "jsonp");
	function res(respuesta){var cod = respuesta.codigosolicitud;console.log(cod);};
  }
  if (servicio == "Conserjeria") {
  $.get("http://"+registro+"/controller/crear_conserje.php",{opcion: opcion,com: com,room: control_room, nombre: control_nombre}, res, "jsonp");
	function res(respuesta){var cod = respuesta.codigosolicitud;console.log(cod);};
  }
  if (servicio == "Mantenimiento") {
  $.get("http://"+registro+"/controller/crear_mantenimiento.php",{opcion: opcion,com: com,room: control_room, nombre: control_nombre}, res, "jsonp");
	function res(respuesta){var cod = respuesta.codigosolicitud;console.log(cod);};
  }
  
  
  
  var msg="<p>Se ha realizado su solicitud de "+servicio+" para "+opcion+" con &eacute;xito.</p><p>Estamos procesandola y enviandola al departamento adecuado. Recibir&aacute; un mensaje de notificaci&oacute;n cuando &eacute;esta sea aceptada y se encuentre en proceso.</p>";
  
  showMessage(msg,true);
  var animation="slideInRight";
  $("#variableContent").hide();
  $("#mainContent").hide();
  if(!$('#mainContent').is(':visible')){
  			$("#mainContent").addClass('animated '+animation);
  			$("#mainContent").show();	       
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                $("#mainContent").removeClass('animated '+animation);
            }, 1000);
    }

}

function showMessage(message,autoclose){
  $('#messageTitle').html("Resumen de orden");
  $('#messageBody').html("<p>"+message+"</p>");
  $('#myModal').modal('show');
  if(autoclose){
    window.setTimeout( function(){
        $('#myModal').modal('hide');
    }, 6000);
  }
}

function checkKey(e){
     switch (e.keyCode) {
        case 221:
			$.showLoading({name: 'circle-fade',allowHide: true});                                                                                                                                                                                                                                                                                                                                           
            location.href="./room_service.html";
            break;			
            }      
}



function tvhome(){
	
	var online = navigator.onLine;
	
	if (online)	{ 

	//console.log("tv home go");
		var registro = localStorage.getItem("mem_registro");
		var room = localStorage.getItem("mem_room");
		var nombre = localStorage.getItem("mem_nombre");
		var llegada = localStorage.getItem("mem_llegada");		
		var salida = localStorage.getItem("mem_salida");
		//var uid = device.uuid;
		//var uid = "100000000002";	
		var uid = localStorage.getItem("mem_lic");
		
		$.get("http://"+ registro + "/servicios/tv-home.php",{room: room, uid: uid, nombre: nombre, llegada: llegada, salida: salida}, tvres, "jsonp");

		function tvres(respuesta){
	 

			var contenido = respuesta.contenido;
			
			//$(header).appendTo("head");
			$('#widgets').html(contenido);
			
			$.hideLoading();
		
		}
		

	} else {
		var contenido = '<div class="alert alert-danger" role="alert" id="msgalerta"> <p><b>Fuera de Línea:</b> Por favor conecte el TV a la red inalámbrica del hotel para disfrutar de una mejor experiencia en línea. <button type="button" onClick="aaap(\'com.android.tv.settings\',\'connectivity.NetworkActivity\')" class="close text-red px-1 selectable-contour selectable " data-toggle="collapse" data-target="#msgalerta" aria-label="Close"><span aria-hidden="true">Abrir Conexiones</span></p></button></div><div class="messages-container collapse" id="messagesContainer"><button type="button" class="close text-white px-1 selectable-contour selectable " data-toggle="collapse" data-target="#messagesContainer" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="message"><p class="text-justify"><span class="fa fa-caret-right"></span>Sin mensajes nuevos... </p></div></div><div class="container"><div class="row"><div class="col-lg-6"><div class="card bg-overlay text-white overflow-auto"><div id="widgets" class="card-body font-weight-bold"><h1 class="card-title text-yellow ">Bienvenido estimado Huésped!</h1><p class="card-text">Gracias por preferirnos, el equipo esta presto a servirle.</p><table class="custom-table"><tr><td class="text-left">Fecha Check In</td><td></td></tr><tr><td class="text-left">Fecha Check Out</td><td></td></tr><tr><td rowspan="2"><h2>Room: - Fuera de Línea -</h2></td><td><span id="picoyplaca">- Fuera de Línea -</span><br>Pico y Placa</td></tr><tr><td><span class="border-right pr-2"><i class="fas fa-dollar-sign"></i></span><span class="ml-2" >USD <span id="dolar"></span> </span></td></tr><tr><td><span class="border-right pr-2" ><span id="clima"></span>°</span><span class="border-right px-4">Bogota DC</span><span class="px-2"><a href="apps.html"><i class="fas fa-cloud m-auto"></i></a></span></td><td><span class="border-right pr-2"><i class="fas fa-euro-sign"></i></span><span class="ml-2">Euro <span id="euro"></span></span></td></tr></table></div></div></div><div class="col-lg-6"><div class="card text-left overflow-auto text-white"><div class="embed-responsive embed-responsive-16by9"><video autoplay muted controls loop><source src="http://186.116.1.117/video/video.mp4" type="video/mp4"> video no soportado </video></div></div></div></div></div>';
		$('#cuerpo').html(contenido);
		$.hideLoading();
	}
}

	var days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
	
	var monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
	  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
	];


function servicios(){

	var date = new Date();

	//Miércoles 9 de octubre de 2018 Hora: 5:00 p
	var fechaTop = days[date.getDay()] +" "+ date.getDate() + " de " + monthNames[date.getMonth()] + " de " + date.getFullYear() + " |";
	var horaTop =  date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, timeZone: "America/Bogota" }); //date.getHours()+":"+date.getMinutes();
	//var fechaSoloDia = "Octubre " + date.getDate();
	console.log("Servicios ");
	
	$('#fecha_top').html(fechaTop);
	$('#hora_top').html(horaTop);

	var online = navigator.onLine;
	
	if (online)	{
	
		var registro = localStorage.getItem("mem_registro");
		var room = localStorage.getItem("mem_room");
		var mem_mensa = localStorage.getItem("mem_mensajes","[]");
		if (mem_mensa == null) {var mem_mensa = "[]";}
		var mensajes = JSON.parse(mem_mensa);
		var mensajesNew = [];
		//var uid = "23423423432";
		var uid = localStorage.getItem("mem_lic");
		
		$.get("http://"+ registro + "/servicios/servicios.php",{room: room}, tvres, "jsonp");

			function tvres(respuesta){
 			//console.log("respuesta: "+JSON.stringify(respuesta, null, 4) + typeof respuesta);			
				html ='';
				//mensajesNew = $.merge(mensajes, respuesta);
				mensajesNew = respuesta.concat(mensajes);
				console.log(typeof mensajesNew);
				console.log("respuesta 2: "+JSON.stringify(mensajesNew, null, 4));
				$( ".message" ).remove();
				
				$.each(mensajesNew, function() {
					html += '<div class="message"><p class="text-justify"><span class="fa fa-caret-right"></span> '+this['mensaje']+'</p></div>';
				});
				$("#messagesContainer").prepend( html );
				localStorage.setItem("mem_mensajes",JSON.stringify(mensajesNew));
				$('.notify-badge').html(mensajesNew.length);
		 		$.hideLoading();
					console.log("lengths: " + mensajes.length + mensajesNew.length);
					if(mensajes.length < mensajesNew.length){
					document.getElementById('mensajeaudio').play();
					}
			}
	} else {
		var contenido = '<div class="alert alert-danger" role="alert" id="msgalerta"> <p><b>Fuera de Línea:</b> Por favor conecte el TV a la red inalámbrica del hotel para disfrutar de una mejor experiencia en línea. <button type="button" onClick="aaap(\'com.android.tv.settings\',\'connectivity.NetworkActivity\')" class="close text-red px-1 selectable-contour selectable " data-toggle="collapse" data-target="#msgalerta" aria-label="Close"><span aria-hidden="true">Abrir Conexiones</span></p></button></div><div class="messages-container collapse" id="messagesContainer"><button type="button" class="close text-white px-1 selectable-contour selectable " data-toggle="collapse" data-target="#messagesContainer" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="message"><p class="text-justify"><span class="fa fa-caret-right"></span>Sin mensajes nuevos... </p></div></div><div class="container"><div class="row"><div class="col-lg-6"><div class="card bg-overlay text-white overflow-auto"><div id="widgets" class="card-body font-weight-bold"><h1 class="card-title text-yellow ">Bienvenido estimado Huésped!</h1><p class="card-text">Gracias por preferirnos, el equipo esta presto a servirle.</p><table class="custom-table"><tr><td class="text-left">Fecha Check In</td><td></td></tr><tr><td class="text-left">Fecha Check Out</td><td></td></tr><tr><td rowspan="2"><h2>Room: - Fuera de Línea -</h2></td><td><span id="picoyplaca">- Fuera de Línea -</span><br>Pico y Placa</td></tr><tr><td><span class="border-right pr-2"><i class="fas fa-dollar-sign"></i></span><span class="ml-2" >USD <span id="dolar"></span> </span></td></tr><tr><td><span class="border-right pr-2" ><span id="clima"></span>°</span><span class="border-right px-4">Bogota DC</span><span class="px-2"><a href="apps.html"><i class="fas fa-cloud m-auto"></i></a></span></td><td><span class="border-right pr-2"><i class="fas fa-euro-sign"></i></span><span class="ml-2">Euro <span id="euro"></span></span></td></tr></table></div></div></div><div class="col-lg-6"><div class="card text-left overflow-auto text-white"><div class="embed-responsive embed-responsive-16by9"><video autoplay muted controls loop><source src="http://186.116.1.117/video/video.mp4" type="video/mp4"> video no soportado </video></div></div></div></div></div>';
		$('#cuerpo').html(contenido);
		$.hideLoading();
	}	
}


function ajustes(){
			localStorage.setItem("conf",(parseInt(localStorage.getItem("conf","1")+1)));
			if (localStorage.getItem("conf") == "11111") {location.href="./apps.html";} 
}


$(document).ready(function(){

//$.showLoading({name: 'circle-fade',allowHide: true});
	
$(document).keydown (checkKey);
		
	iniMenusActions();
	window.setInterval(function(){servicios()}, 20000);	
	
});	
//var urlinfo = localStorage.getItem("mem_urlinfo"); $('a.infoa').attr("href", urlinfo);