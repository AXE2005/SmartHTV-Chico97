/*function productos(){

$.ajaxSetup({ cache: false });
 
        $.getJSON("http://192.168.1.20/backend/productos_read.php", function(data){ 
           
            var productosResources = $('#productos'); 
           
            var outputProductos="";
            
             jQuery.each(data.data, function( i, val ) {
              outputProductos+='<div onclick="srcImg('+val.id+');" id="" class="div-m"> <input class="input-width" placeholder="Quantity" id="quantity" type="number"> <span id="nombre'+val.id+'" >'+val.nombre+'</span>  <span class="value-m">'+val.precio+'</span>  <img id="imagen'+val.id+'" style="display: none;" src="'+val.imagen+'"> <input style="display: none;" id="descripcion'+val.id+'" value="'+val.descripcion+'" type="text">  </div>';
            });
             
             productosResources.html(outputProductos);
           
        });

} */
 //var = "http://172.20.8.50/servicios/room.php"

 //var tech = GetURLParameter('room');

$(document).ready(function(){
    //$('.modal').modal();
});

function rooms(room){

$.ajaxSetup({ cache: false });

        console.log("ROOM "+room);

        var url = "http://172.20.8.50/servicios/room.php?room="+room;

        console.log("URL "+url);
 
        $.getJSON(url, function(data){ 
             console.log(data);
             $('#nombre_user').text(data.nombre);
             /*** data.reserva no llega, entonces genera error de javascript ***************************************/
             //localStorage.setItem('reserva', data.reserva);
             
             
             localStorage.setItem('room', room);

             //cuenta(data.reserva, room);
             console.log(data);
            
        });

}


function categorias(room){

$.ajaxSetup({ cache: false });
        $.getJSON("http://172.20.8.50/backend/categorias_read.php", function(data){ 

           //rooms(room);
           
            var categoriasResources = $('#categorias');
            
            var outputCategorias="";
            
             jQuery.each(data.data, function( i, val ) {
              selected='';
              if(i==0){
                selected='id="selectedDefault"';
              }

              outputCategorias+='<button '+selected+' type="button" class="round-corners-menu-btn selectable activable" data-toggle="collapse" data-target="#cat'+val.id+'" aria-expanded="false" aria-controls="variable_info1">'+val.nombre+'</button>'+
                '<div class="collapse fade" id="cat'+val.id+'" aria-labelledby="variable_button1" data-parent="#variable_infoParent">'+
                  '<div class="navbar">'+
                    '<div id="contentCat'+val.id+'" class="navbar-nav w-100 pl-4">'+
                    '</div>'+
                 '</div>'+
                '</div>';

              productos(val.id);
              
            })

            categoriasResources.html(outputCategorias);
            console.log("products loaded");
            
            window.setTimeout( function(){
              iniMenusActions();
            }, 100);
        });

}

function productos(id){
        $.ajaxSetup({ cache: false });
 
        $.getJSON("http://172.20.8.50/backend/productos_read.php?id_categoria="+id, function(data){ 
           
            var productosResources = $('#contentCat'+id); 
            var arr="";  
            var outputProductos="";

            
             jQuery.each(data.data, function( i, val ) {
              arr = val;
              //console.log(val);
			  let str = val.imagen;
			  let res = str.split("/");
			  let imgsolo = res.pop();
			  let img = "./roomservice/"+imgsolo;
              outputProductos+='<button type="button" class="round-corners-menu-btn selectable activable" onclick="srcImg(this,'+val.id+')">'+
                        val.nombre+
                      '</button>'+
                      '<input type="hidden" id="pnom'+val.id+'" value="'+val.nombre+'">'+
                      '<input type="hidden" id="pdesc'+val.id+'" value="'+val.descripcion+'">'+
                      '<input type="hidden" id="pimg'+val.id+'" value="'+img+'">'+
                      '<input type="hidden" id="ppre'+val.id+'" value="'+val.precio+'">';
              //outputProductos+='<div onclick="srcImg('+val.id+');" id="" class="div-m"> <input class="input-width" placeholder="Quantity" id="quantity" type="number"> <span id="nombre'+val.id+'" >'+val.nombre+'</span>  <span id="precio'+val.id+'" class="value-m">'+val.precio+'</span>  <img id="imagen'+val.id+'" style="display: none;" src="'+val.imagen+'"> <input style="display: none;" id="descripcion'+val.id+'" value="'+val.descripcion+'" type="text">  </div>';
            });
            if (arr != "") {
              productosResources.html(outputProductos);
            }
           
        });

    //console.log("Categoria "+id);

}



function srcImg(btn,id){
	$('#commentProducto').val('');
    var nombre = $('#pnom'+id).val();
    var descripcion = $('#pdesc'+id).val();
    var imagen = $('#pimg'+id).val();
    var precio = '$'+$('#ppre'+id).val();
    console.log(nombre);

    $("#productId").val(id);
    $("#nombreProducto").html(nombre);
    $("#productDescription").html(descripcion);
    $("#productPrice").html(precio);
    $("#productPrice1").html(precio);
    $("#totalProducto").html('&nbsp;&nbsp;'+precio);
    $("#productImage").attr("src",imagen).fadeIn();
    $("#count-item1").html("1");
	$('#productPrice').formatCurrency({ roundToDecimalPlace: -2, groupDigits: false });
	$('.price').formatCurrency({ roundToDecimalPlace: -2, groupDigits: false });

    animate(btn);
}

function cuenta(){
    var res = localStorage.getItem('reserva');
    var roo = localStorage.getItem('mem_room');

    //*****************************  
    //Se comenta porque genera errores de javascript
    //
    /*var url = "http://172.20.8.50/servicios/cuenta.php?reserva="+res+"&room="+roo;
     console.log("URL CUENTA "+url);
    $.ajax({
       type: "GET",
       url: url,
       beforeSend: function () {
       
      },
       success: function(data) {
        console.log("CUENTA "+data);
        jQuery.each(data, function( i, val ) {

          console.log("CUENTA "+data);
           
        });


       }
     });*/
}



var products = [];
var cart = [];

function addProduct() {
  console.log("addProduct");
  var products = [];
    if(localStorage.getItem('productos')!==null){
    var products = JSON.parse(localStorage.getItem('productos'));
	}
  var productoID = $("#productId").val();
  var nombreProd = $( "#nombreProducto").html();
  var precio = $( "#productPrice").html();
  var qty = $( "#count-item1").html();
  var com = $( "#commentProducto").val();
  

  var newProduct = {
      product_id: null,
      product_qty: 1,
      product_price: 0.00,
  };
  newProduct.product_id = productoID;
  newProduct.product_name = nombreProd;
  newProduct.product_price = precio.replace("$","");
  newProduct.product_qty = qty;
  newProduct.product_comment = com;
  newProduct.room = localStorage.getItem('mem_room');

  // **************Revisar esto de reserva. Se comento porque esta generando errores de javascript******************************
  //newProduct.reserva = localStorage.getItem('reserva');
  //***************************************************************

  products.push(newProduct);

  localStorage.setItem('productos',JSON.stringify(products));
  //localStorage.setItem('productos', products);
  console.log(products);

  var total=0;
      
  for (var i = 0; i < products.length; i++) {
    var pre=parseFloat(products[i].product_price);
    var cant=parseInt(products[i].product_qty);
    total+=pre*cant;
  }

  var msg="<p>Se han adicionado "+qty+" "+nombreProd+" a la orden.</p><p>En total tienes "+products.length+" productos en el carrito por un valor de "+total+".</p><br><p> Para realizar tu pedido haz clic en ver carrito.</p>";
  
  showMessage(msg,true);

           
}

function deleteProduct(product_id, e) {

  if(localStorage.getItem('productos')!==null){
    var products = JSON.parse(localStorage.getItem('productos'));
    for (var i = 0; i < products.length; i++) {
        if (products[i].product_id == product_id) {
            // DO NOT CHANGE THE 1 HERE
            products.splice(i, 1);
        }
    }
    localStorage.setItem('productos',JSON.stringify(products));

    e.parentNode.parentNode.parentNode.remove();

    var total=obtenerTotal(products);
    $("#productsTotal").html('Total:&nbsp;&nbsp;$'+total.toFixed(2));
  }
} 

/*function renderCartTable() {
        var html = '';
        var ele = document.getElementById("demo2");
        ele.innerHTML = ''; 

        html += "<table id='tblCart' border='1|1'>";
        html += "<tr><td>Product ID</td>";
        html += "<td>Product Description</td>";
        html += "<td>Quantity</td>";
        html += "<td>Price</td>";
        html += "<td>Total</td>";
        html += "<td>Action</td></tr>";
        var GrandTotal = 0;
        for (var i = 0; i < cart.length; i++) {
            html += "<tr>";
            html += "<td>" + cart[i].product.product_id + "</td>";
            html += "<td>" + cart[i].product.product_desc + "</td>";
            html += "<td>" + cart[i].product_qty + "</td>";
            html += "<td>" + cart[i].product.product_price + "</td>";
            html += "<td>" + parseFloat(cart[i].product.product_price) * parseInt(cart[i].product_qty) + "</td>";
            html += "<td><button type='submit' onClick='subtractQuantity(\"" + cart[i].product.product_id + "\", this);'/>Subtract Quantity</button> &nbsp<button type='submit' onClick='addQuantity(\"" + cart[i].product.product_id + "\", this);'/>Add Quantity</button> &nbsp<button type='submit' onClick='removeItem(\"" + cart[i].product.product_id + "\", this);'/>Remove Item</button></td>";
            html += "</tr>";

           GrandTotal += parseFloat(cart[i].product.product_price) * parseInt(cart[i].product_qty);            

        }
        document.getElementById('demo3').innerHTML = GrandTotal;
        html += "</table>";
        ele.innerHTML = html;
    }

function removeItem(product_id)
        {
            
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].product.product_id == product_id) {
                    cart.splice(i,1);
                }

            }
            renderCartTable();
}*/

function miCarrito() {
    var products=null;
    if(localStorage.getItem('productos')!==null){
      products = JSON.parse(localStorage.getItem('productos'));
    }
    
    if(products!==null && products.length>0){
      var html = '';
      var total=0;
      
      for (var i = 0; i < products.length; i++) {
        var precio=parseFloat(products[i].product_price);
        var cantidad=parseInt(products[i].product_qty);
        total+=precio*cantidad;
        html+='<div class="productItemWrapper">'+
            '  <span class="text-nowrap">' + products[i].product_name + '</span>'+
            '  <div class="price-counter">'+
            '    <span>$' + precio.toFixed(2) + '</span>'+
            '    <div class="edit-controls">'+
            '      <a class="btn-icon plus selectable-contour selectable" target="count-item'+products[i].product_id+'"><span class="fa fa-plus"></span></a>'+
            '     <span id="count-item'+products[i].product_id+'" class="food-count">'+cantidad+'</span>'+
            '      <a class="btn-icon minus selectable-contour selectable" target="count-item'+products[i].product_id+'"><span class="fa fa-minus"></span></a>'+
            '      <button class="btn-text btn-small btn-border-inside selectable-contour selectable" onClick="deleteProduct('+products[i].product_id+',this)">'+
            '      <span>Eliminar</span>'+
            '      </button>'+
            '     </div>'+
            '  </div>'+
            '</div>';
      }
      html+='<div class="total">'+
                '<span id="productsTotal" class="price">Total:&nbsp;&nbsp;$'+total.toFixed(2)+'</span>'+
              '</div>';
      document.getElementById("carritoContent").innerHTML = html;
    }else{
      document.getElementById("carritoContent").innerHTML = "No tienes productos en el carrito";
    }

}

function obtenerTotal(products){
  var total=0;
  
  var products=null;
  if(localStorage.getItem('productos')!==null){
    products = JSON.parse(localStorage.getItem('productos'));
  }
  
  if(products!==null && products.length>0){
    for (var i = 0; i < products.length; i++) {
      var precio=parseFloat(products[i].product_price);
      var cantidad=parseInt(products[i].product_qty);
      total+=precio*cantidad;
    }
  }
  return total;
}

function confirmarPedido(){
  var total=obtenerTotal();
  var msg="<p>Para confirmar tu pedido por valor de "+total+" selecciona el método de pago que deseas usar:</p>";
  
  showMessage(msg,false);
}

function cancelarPedido(){
localStorage.setItem('productos',"[]");
location.href = "room_service.html";
}


function sendPedido(pago){
	
	if(localStorage.getItem('productos')!==null){
    products = JSON.parse(localStorage.getItem('productos'));
	}

    var url = "http://172.20.8.50/controller/crear_orden.php";
     console.log("URL CUENTA "+url);
     jsonString = JSON.stringify(products);
     console.log(jsonString);

     $.ajax({
     type: "POST",
     url: url,
 	 data: {arr: JSON.stringify(products), pago: pago},
     success: function(data){
        //alert("Su orden ha sido enviada, nos encontramos procesandola.");
        console.log("success:",data);
		localStorage.setItem('productos',"[]");
		$("#messageBody").html("<p>Gracias por su pedido, nos encontramos procesandolo ahora mismo, esperamos entregar su orden a la mayor brevedad posible. Disfrute de la experiencia Movich.</p>");
		$("#futer").html('<a href="index.html"><button type="button" class="btn-text btn-border-inside selectable-contour selectable edit-controls"><span>Cerrar</span></button></a>');
		//location.href="index.html";
		},
     failure: function(errMsg) {
        console.error("error:",errMsg);		
	
	}
    });
} 


function animate(btn){
  var animation1="fadeInRight";
  var animation2="fadeInRight delay-1s";
  $("#variableContent1").hide();
  $("#variableContent2").hide();
  if(!$('#variableContent1').is(':visible')){
    $("#variableContent1").addClass('animated '+animation1);
    $("#variableContent1").show();         
        //wait for animation to finish before removing classes
        window.setTimeout( function(){
            $("#variableContent1").removeClass('animated '+animation1);
            initNavigate();
        }, 1000);
    }

    if(!$('#variableContent2').is(':visible')){
    $("#variableContent2").addClass('animated '+animation2);
    $("#variableContent2").show();         
        //wait for animation to finish before removing classes
        window.setTimeout( function(){
            $("#variableContent2").removeClass('animated '+animation2);
            initNavigate();
        }, 2000);
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

 