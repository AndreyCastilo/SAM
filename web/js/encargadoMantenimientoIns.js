$('document').ready(function () {
    cargarInicio();
    funcionalidadModals();
});


function funcionalidadModals() {
    $("#myModal").on("show.bs.modal", function (event) {
        $('#labelErrorActual').html("");
        $('#labelErrorNueva').html("");
        $('#labelErrorConf').html("");
        $("#passwordActual").val("");
        $("#passwordNueva").val("");
        $("#passwordConfirmar").val("");

    });
    $("#modalEditarSolicitud").on("show.bs.modal", function (event) {
        let btn = $(event.relatedTarget);
        let solicitud = btn.data("solicitud");
        let btnConfirma = $("#confirmarEditarSolicitud").data("solicitud", solicitud);
        $("#unidadEditar").val(solicitud.unidad);
        $("#lugarTrabajoEditar").val(solicitud.lugarDeTrabajo);
        $("#descripcionEditar").val(solicitud.descripcion);
        $("#estadoEditar").val(solicitud.est.codigo);
    });

    $("#modalObservacionesSolicitud").on("show.bs.modal", function (event) {
        let btn = $(event.relatedTarget);
        let solicitud = btn.data("solicitud");
        limpiaCamposAgregarObservacion();
        let btnConfirma = $("#btnAgregarObservacion").data("solicitud", solicitud);
        $("#campoSolicitud").html('<strong>Solicitud: </strong> ' + solicitud.codigo);
        $("#campoAutor").html('<strong>Autor: </strong> ' + solicitud.user.nombre + solicitud.user.apellido);
        $("#campoFecha").html('<strong>Fecha: </strong> ' + solicitud.date2);
        $("#campoLugar").html('<strong>Lugar: </strong> ' + solicitud.lugarDeTrabajo);
        $("#campoDescripcion").html('<strong>Descripción: </strong> ' + solicitud.descripcion);
        $("#campoEstado").html('<strong>Estado: </strong> ' + solicitud.est.nombre);
        $("#campoPrioridad").html('<strong>Prioridad:</strong> ' + '<span class="pr-sm-' + solicitud.pr.color + '" ></span>');
        listarObservaciones(solicitud);
    });
}


function agregarObservacion() {
    let solicitud = $("#btnAgregarObservacion").data("solicitud");   
    let obs = {_class: 'Observacion', descripcion: $("#descripcionObservacion").val(), fecha: null, solicitud: solicitud, date2: null, usuario: null};
    guardarObservacion(obs, function (resp) {
        $('#descripcionObservacion').val("");
        $('#descripcionObservacion').attr('rows', '1');
        limpiaCamposAgregarObservacion();
        $('#btnAgregarObservacion').addClass('hidden');
        cargarSolicitudes();    
        Proxy.obtenerSolicitudPorCodigo(solicitud.codigo,function(resp){
            listarObservaciones(resp);                 
        });      
        alerta("success", "Se ha agreado la observacion correctamente.");
    });
}

function guardarObservacion(obs, cb) {
    Proxy.guardarObservacion(obs, function (resp) {
        cb(resp);
    });
}



function cargarInicio() {
    $("#labelEnc").html("Solicitudes Pendientes");
    $(".sidebar ul li").removeClass("selected");
    $(".sidebar ul li:eq(0)").addClass("selected");
    $("#main > div").css("display", "none");
    obtenerSolicitudesPendientes();
    $("#solicitudes").css("display", "block");
    $("#solicitudesInicio").css("display", "block");
}

function cargarSolicitudesEnReparacion() {
    $("#labelEnc").html("Solicitudes En Reparación");
    $(".sidebar ul li").removeClass("selected");
    $(".sidebar ul li:eq(1)").addClass("selected");
    $("#main > div").css("display", "none");
    obtenerSolicitudesEnReparacion();
    $("#divSolicitudesEnReparacion").css("display", "block");



}

function cargarSolicitudesReparadas() {
    $("#labelEnc").html("Solicitudes Reparadas");

    $(".sidebar ul li").removeClass("selected");
    $(".sidebar ul li:eq(2)").addClass("selected");
    $("#main > div").css("display", "none");

    obtenerSolicitudesReparadas();
    $("#divSolicitudesReparadas").css("display", "block");

}



function cargarAdminCuenta() {

    $("#labelEnc").html("Administración de Cuenta");
    $("#main > div").css("display", "none");

    $("#tablaCuenta").css("display", "block");
    $(".sidebar ul li").removeClass("selected");
    $(".sidebar ul li:eq(3)").addClass("selected");
}


function alerta(tipo, titulo) {
    let alerta = $("#alerta-" + tipo);
    alerta.empty();

    let strong = $("<strong></strong>");
    strong.html(titulo);
    alerta.append(strong);
    alerta.fadeTo(5000, 500).slideUp(500, function () {
        alerta.css("display", "none");
    });
}

function validarPasswordConfirmacion(password, passwordConfirm) {
    return(password == passwordConfirm);
}
function editarPasswordUsuario() {
    let passwordNuevo = $('#passwordNueva').val();
    let passwordActual = $('#passwordActual').val();
    let passwordConfirmar = $('#passwordConfirmar').val();
    $("#labelErrorConf").empty();
    $("#labelErrorActual").empty();
    $("#labelErrorNueva").empty();
    if (validaEspaciosContrasena()) {
        if (validarPasswordConfirmacion(passwordNuevo, passwordConfirmar)) {
            modificarContrasena(passwordActual, passwordNuevo);

        } else {
            $("#labelErrorConf").html("*Error, las contraseñas no coinciden");
        }
    }

}

function limpiaPassword() {
    $('#passwordNueva').val("");
    $('#passwordActual').val("");
    $('#passwordConfirmar').val("");
}

function modificarContrasena(password, passwordNuevo) {
    Proxy.modificarContrasena(password, passwordNuevo, function (resp) {
        $("#labelErrorActual").empty();
        if (resp > 0) {
            $("#myModal").modal("toggle");
            limpiaPassword();
            alerta("info", "Contraseña Modificada Exitosamente.");
        } else {
            $("#labelErrorActual").html("*Error, Contraseña Incorrecta");
        }
    });
}

function logout() {
    Proxy.logout(function () {
        document.location = "/SAM/index.jsp";
    });
}

function validaEspaciosContrasena() {
    let passwordNuevo = $('#passwordNueva').val();
    let passwordActual = $('#passwordActual').val();
    let passwordConfirmar = $('#passwordConfirmar').val();
    let aux = true;
    if (passwordActual.length == 0) {
        $("#labelErrorActual").html("*Contraseña Actual es Requerida");
        aux = false;
    }
    if (passwordNuevo.length == 0) {
        $("#labelErrorNueva").html("*Contraseña Nueva es Requerida");
        aux = false;
    }
    if (passwordConfirmar.length == 0) {
        $("#labelErrorConf").html("*Confirmar Contraseña es Requerida");
        aux = false;
    }
    return aux;
}

///// ------------------------- nuevo

function obtenerSolicitudesReparadas() {
    Proxy.obtenerSolicitudesMantenimientoReperadas(function (resp) {
        let table = $('#tablaSolicitudesReparadas').DataTable({
            "bDestroy": true,
            "aaData": resp,
            "order": [[0, "desc" ]],
            "columnDefs": [
                {"width": 100, "targets": 6},
                {"type": "date-eu", "targets": 0},
                {"orderable": false, "targets": 6},
                {"searchable": false, "targets": 6}
            ],
            "aoColumns": [
                {"mDataProp": "date2"},
                {"mDataProp": "user",
                    "render": function (data, type, row) {
                        return data.nombre + " " + data.apellido;
                    }},
                {"mDataProp": "lugarDeTrabajo"},
                {"mDataProp": "est.nombre"},
                {"mDataProp": "pr",
                    "render": function (data, type, row) {
                        return '<span class="pr-' + data.color + '" data-pr=' + data.codigo + ' ></span>'
                    }
                },
                {"mDataProp": "descripcion"},
               /* {"mDataProp": 'est',
                    "render": function (data, type, row) {
                        return '<button class="btn btn-primary" data-toggle="modal" data-target="#modalEditarSolicitud">Actualizar</button>';
                    }
                },*/
                {"mDataProp": 'ob', "render": function (data, type, row) {
                        return '<button class="btn btn-warning" data-toggle="modal" data-target="#modalObservacionesSolicitud">Ver(' + data.length + ')</button>';
                    }
                }
            ],
            "language": idioma});

            $("#tablaSolicitudesReparadas tbody").unbind("click");

        $("#tablaSolicitudesReparadas tbody").on("click", ".btn-warning", function (e) {
            let soli = table.row($(this).parents("tr")).data();
            $(this).data("solicitud", soli);
        });

    });
}
/////////----------------------------------------/


function obtenerSolicitudesEnReparacion() {
    Proxy.obtenerSolicitudesMantenimientoEnReparcion(function (resp) {
        let table = $('#tablaSolicitudesEnReparacion').DataTable({
            "bDestroy": true,
            "aaData": resp,
            "order": [[4, "desc" ]],
            "columnDefs": [
                {"width": 100, "targets": [7, 6]},
                {"type": "date-eu", "targets": 0},
                {"orderable": false, "targets": [6,7]},
                {"searchable": false, "targets": [7, 6]}
            ],
            "aoColumns": [
                {"mDataProp": "date2"},
                {"mDataProp": "user",
                    "render": function (data, type, row) {
                        return data.nombre + " " + data.apellido;
                    }},
                {"mDataProp": "lugarDeTrabajo"},
                {"mDataProp": "est.nombre"},
                {"mDataProp": "pr",
                    "render": function (data, type, row) {
                        return '<span class="pr-' + data.color + '" data-pr=' + data.codigo + ' ></span>'
                    }
                },
                {"mDataProp": "descripcion"},
                {"mDataProp": 'est',
                    "render": function (data, type, row) {
                        return '<button class="btn btn-primary" data-toggle="modal" data-target="#modalEditarSolicitud">Actualizar</button>';
                    }
                },
                {"mDataProp": 'ob', "render": function (data, type, row) {
                        return '<button class="btn btn-warning" data-toggle="modal" data-target="#modalObservacionesSolicitud">Ver(' + data.length + ')</button>';
                    }
                }
            ],
            "language": idioma});

        $("#tablaSolicitudesEnReparacion tbody").unbind("click");
        
        $("#tablaSolicitudesEnReparacion tbody").on("click", ".btn-warning", function (e) {
            let soli = table.row($(this).parents("tr")).data();
            //alert(soli.unidad);
            $(this).data("solicitud", soli);
        });

        $("#tablaSolicitudesEnReparacion tbody").on("click", ".btn-primary", function (e) {
            let soli = table.row($(this).parents("tr")).data();
            //alert(soli.unidad);
            $(this).data("solicitud", soli);
        });
    });
}

//------////////////////////////////////////-


function obtenerSolicitudesPendientes() {
    Proxy.obtenerSolicitudesMantenimientoPriorizadas(function (resp) {
        let table = $('#tablaSolicitudes').DataTable({
            "bDestroy": true,
            "aaData": resp,
            "order": [[4, "desc" ]],
            "columnDefs": [
                {"width": 100, "targets": [7, 6]},
                {"type": "date-eu", "targets": 0},
                {"orderable": false, "targets": [6,7]},
                {"searchable": false, "targets": [7, 6]}
            ],
            "aoColumns": [
                {"mDataProp": "date2"},
                {"mDataProp": "user",
                    "render": function (data, type, row) {
                        return data.nombre + " " + data.apellido;
                    }},
                {"mDataProp": "lugarDeTrabajo"},
                {"mDataProp": "est.nombre"},
                {"mDataProp": "pr",
                    "render": function (data, type, row) {
                        return '<span class="pr-' + data.color + '" data-pr=' + data.codigo + ' ></span>'
                    }
                },
                {"mDataProp": "descripcion"},
                {"mDataProp": 'est',
                    "render": function (data, type, row) {
                        return '<button class="btn btn-primary" data-toggle="modal" data-target="#modalEditarSolicitud">Actualizar</button>';
                    }
                },
                {"mDataProp": 'ob', "render": function (data, type, row) {
                        return '<button class="btn btn-warning" data-toggle="modal" data-target="#modalObservacionesSolicitud">Ver(' + data.length + ')</button>';
                    }
                }
            ],
            "language": idioma});

            $("#tablaSolicitudes tbody").unbind("click");

        $("#tablaSolicitudes tbody").on("click", ".btn-warning", function (e) {
            let soli = table.row($(this).parents("tr")).data();
            //alert(soli.unidad);
            $(this).data("solicitud", soli);
        });

        $("#tablaSolicitudes tbody").on("click", ".btn-primary", function (e) {
            let soli = table.row($(this).parents("tr")).data();
            //alert(soli.unidad);
            $(this).data("solicitud", soli);
        });
    });
}

/////////////////////----------------------------------------------/////
function editarSolicitud() {

    let solicitud = $("#confirmarEditarSolicitud").data("solicitud");
    let codigoActual =  solicitud.est.codigo;
    solicitud.est.codigo = $("#estadoEditar").val();
    if ($(".sidebar ul li:eq(0)").hasClass("selected")) {
        Proxy.cambioEstado(solicitud.codigo, parseInt(solicitud.est.codigo), function (resp) {
            if (resp > 0) {
                if(solicitud.est.codigo != codigoActual && solicitud.est.codigo == 5 ){
                    let obs = {_class: 'Observacion', descripcion: "Solicitud Reparada", fecha: null, solicitud: solicitud, date2: null, usuario: null};
                    Proxy.guardarObservacion(obs,function(){
                        
                    });
                }
                alerta("success", "Solicitud Editada Exitosamente.");
                cargarInicio();
            } else {
                alerta("warning", "No se ha podido editar la solicitud.");
            }
        });
    } else {
        if ($(".sidebar ul li:eq(1)").hasClass("selected")) {
            Proxy.cambioEstado(solicitud.codigo, parseInt(solicitud.est.codigo), function (resp) {
                if (resp > 0) {
                if(solicitud.est.codigo != codigoActual && solicitud.est.codigo == 5 ){
                    let obs = {_class: 'Observacion', descripcion: "Solicitud Reparada.", fecha: null, solicitud: solicitud, date2: null, usuario: null};
                    Proxy.guardarObservacion(obs,function(){
                        
                    });
                }
                    alerta("success", "Solicitud Editada Exitosamente.");
                    cargarSolicitudesEnReparacion();
                } else {
                    alerta("warning", "No se ha podido editar la solicitud.");
                }
            });
        } else {
            Proxy.cambioEstado(solicitud.codigo, parseInt(solicitud.est.codigo), function (resp) {
                if (resp > 0) {
                 if(solicitud.est.codigo != codigoActual && solicitud.est.codigo == 5 ){
                    let obs = {_class: 'Observacion', descripcion: "Solicitud Reparada", fecha: null, solicitud: solicitud, date2: null, usuario: null};
                    Proxy.guardarObservacion(obs,function(){
                        
                    });
                }
                    alerta("success", "Solicitud Editada Exitosamente.");
                    cargarSolicitudesReparadas();
                } else {
                    alerta("warning", "No se ha podido editar la solicitud.");
                }
            });
        }
    }

    $("#modalEditarSolicitud").modal("toggle");

}

function cargarSolicitudes() {
    if ($(".sidebar ul li:eq(0)").hasClass("selected")) 
         cargarInicio();
    else if ($(".sidebar ul li:eq(1)").hasClass("selected"))
        cargarSolicitudesEnReparacion();
    else if ($(".sidebar ul li:eq(2)").hasClass("selected"))
        cargarSolicitudesReparadas();
    else
         cargarInicio();
}



////////////////////// agregar observaciones

function listarObservaciones(solicitud) {

    let contenedor = $("#divObservaciones");
    contenedor.empty();
    let observaciones=solicitud.ob;
    for (let i = 0; i < observaciones.length; i++) {

        let divObservacion = $("<div>");
        divObservacion.addClass("observacion");

        let divHead = $("<div>");
        let labelFecha = $("<small>");
        let labelAutor = $("<span>");
        let iAu = $('<i>');
        iAu.addClass("fa fa-user fa-fw");
        let iCa = $('<i>');
        iCa.addClass("fa fa-calendar fa-fw");

        labelAutor.addClass('text-muted').append(iAu).append(observaciones[i].usuario.nombre + " " + observaciones[i].usuario.apellido + "     ");
        labelFecha.append(iCa).append(observaciones[i].date2).addClass("pull-right");
        labelFecha.addClass('text-muted');
        divHead.append(labelAutor).append(labelFecha);
        let divDesc = $('<div>');
        divDesc.addClass("container");
        divDesc.append("<strong>Descripción: </strong>").append(observaciones[i].descripcion);
        divObservacion.append(divHead).append(divDesc);
        contenedor.append(divObservacion);
    }


}

function focusAgregarObservacion() {
    $('#descripcionObservacion').attr('rows', '3');
    $('#btnAgregarObservacion').removeClass('hidden');
}

function focusLostAgregarObservacion() {
    if ($('#descripcionObservacion').val().length <= 0) {
        $('#descripcionObservacion').attr('rows', '1');
        limpiaCamposAgregarObservacion();
        $('#btnAgregarObservacion').addClass('hidden');
    }
}

function limpiaCamposAgregarObservacion() {
    $("#formAgregarObservacion > form > div").removeClass('has-error has-danger');
    $("#formAgregarObservacion > form > div > .help-block").html("");
    $('#descripcionObservacion').val("");
    $('#descripcionObservacion').attr('placeholder', 'Escriba su observación');
    $('#descripcionObservacion').attr('rows', '1');
    $('#btnAgregarObservacion').addClass('hidden');
}
