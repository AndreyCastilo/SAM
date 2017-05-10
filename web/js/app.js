/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




function insertarUsuario(nom,ape,ced,carn,pu){
    let user = {_class:"Usuario",nombre:nom,apellido:ape,cedula:ced,carnet:carn,
        puesto:pu};
    
    Proxy.insertarUsuario(user,function(resp){
        if(resp==1){
           alerta("success","Usuario agregado exitosamente<br>Contraseña asignada: 0000");
           $("#modalAgregaUsuario").modal("toggle");
           cargarAdminUsers(); 
        }
        else{
            $("#labelErrorAgregarCarnet").html("*Ya existe un usuario con dicho Carnet")
        }
        
    });
}



function modificarContrasena(){
    let carnet = "12345686";
    let nueva = "2222";
    Proxy.modificarContrasena(carnet,nueva,function(resp){
        alert("Usuario cambi:"+resp);
    })   
}

function editarUsuario2(nom,ape,ced,carn,pu){
    let user = {_class:"Usuario",nombre:nom,apellido:ape,cedula:ced,carnet:carn,
        puesto:pu};

    Proxy.editarUsuario(user,function(resp){
        //alert(resp);
        cargarAdminUsers();
    });
}

function buscarUsuarioFiltro(filtro){
    Proxy.getUsuariosFiltrados(filtro,function(resp){
       cargarTablaUsuariosAdmin(resp);
    });
}

function buscarUsuarioTodos(){
    Proxy.getTodosUsuarios(function(resp){
        cargarTablaUsuariosAdmin(resp);
    });
}

function infoSolicitud(solicitud,divId){
    
    
    let divWrapper = $(divId);
    divWrapper.empty();
    let divCampoSolicitud = $("<div>");
    let divCampoAutor = $("<div>");
    let divCampoFecha = $("<div>");
    let divCampoLugar = $("<div>");
    let divCampoDescripcion = $("<div>");
    let divCampoEstado = $("<div>");
    let divCampoPrioridad = $("<div>").addClass("vertical-center");
   
    divCampoSolicitud.html('<strong>Solicitud: </strong> ' + solicitud.codigo);
    divCampoAutor.html('<strong>Autor: </strong> ' + solicitud.user.nombre + solicitud.user.apellido);
    divCampoFecha.html('<strong>Fecha: </strong> ' + solicitud.date2);
    divCampoLugar.html('<strong>Lugar: </strong> ' + solicitud.lugarDeTrabajo);
    divCampoDescripcion.html('<strong>Descripción: </strong> ' + solicitud.descripcion);
    divCampoEstado.html('<strong>Estado: </strong> ' + solicitud.est.nombre);
    divCampoPrioridad.html('<strong>Prioridad:</strong> ' + '<span class="pr-sm-' + solicitud.pr.color + '" ></span>');

    divWrapper.append(divCampoSolicitud).append(divCampoAutor).
            append(divCampoFecha).append(divCampoLugar).append(divCampoDescripcion)
            .append(divCampoEstado).append(divCampoPrioridad);
}
