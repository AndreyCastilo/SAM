/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$('document').ready(function(){
    enterUsuario();
    enterPassword();
    $('#loading').hide();
});

function login(){    
     $('#loading').show();
    $("#labelErrorLogin").empty();    
    if( validaLogin() ){
        let usuarioLogin = $("#usuarioLogin").val();
        let passwordLogin=$("#passwordLogin").val();
        Proxy.login(usuarioLogin,passwordLogin,function(respuesta){ 
            if(respuesta!==null){
                    $('#loading').hide();                
                redirecciona(respuesta);
                
            }               
            else{
      
               $("#labelErrorLogin").html("*Usuario o contraseña invalidos");
            }
        });
    }
}

function validaLogin(){
    let ps = validaPasswordLogin();
    let us = validaUsuarioLogin();
    return (ps && us);
}

function validaUsuarioLogin(){
    if( $('#usuarioLogin').val() === "" ){
        $("#labelErrorLogin").html("*El usuario es requerido");
	return false;
    }
    //$("#labelErrorLogin").html("");
    return true;
}

function validaPasswordLogin(){
    if( $('#passwordLogin').val() === "" ){
        $("#labelErrorLogin").html("*La contraseña es requerida");
	return false;
    }
    //$("#labelErrorLogin").html("");
    return true;
}

function redirecciona(user){
    switch(user.puesto){
        case "Encargado de Jefatura":{
                document.location="/SAM/encargadoJefatura.jsp";
                break;
        }
        case "Administradora": {
                document.location="/SAM/administradora.jsp";
                break;
        }
        case "Encargado de Mantenimiento":{
                document.location="/SAM/encargadoMantenimiento.jsp";
                break;              
        }
    }
}


function enterUsuario(){
    $("#usuarioLogin").on("keypress",function(event){
        if(event.keyCode == 13){
            login();
        }
    });

}

function enterPassword(){
    $("#passwordLogin").on("keypress",function(event){
        if(event.keyCode == 13){
            login();
        }
    });
            
}

