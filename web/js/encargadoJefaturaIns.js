
$('document').ready(function () {
    cargarInicio();
    funcionalidadModals();
    entersCrearSolicitud();
});
function displayAgregaSolicitud() {

    limpiaDatosCrearSoli();
    $("#labelEnc").html("");
    let span = $("<span>");
    let i = $("<i>");
    i.addClass("fa fa-angle-right");
    span.html("Solicitudes ");
    span.on("click", function () {
        cargarSolicitudesDiv();
    });
    $("#labelEnc").append(span).append(i).append(" Crear Solicitud de Mantenimiento");
    $("#solicitudesInicio").css("display", "none");
    $("#agregaSolicitud").css("display", "block");
}

function hidingFormAgregar() {
    cargarSolicitudesDiv();
}

function funcionalidadModals() {
    $("#myModal").on("show.bs.modal", function (event) {
        $('#labelErrorActual').html("");
        $('#labelErrorNueva').html("");
        $('#labelErrorConf').html("");
        $("#passwordActual").val("");
        $("#passwordNueva").val("");
        $("#passwordConfirmar").val("");
    });
    $("#modalAgregaUsuario").on("show.bs.modal", function (event) {
        limpiaCamposAgregar();
    });
    $("#modalCorregirSolicitud").on("show.bs.modal", function (event) {
        limpiaDatosCorregir();
        let btn = $(event.relatedTarget);
        let solicitud = btn.data("solicitud");
        let btnConfirma = $("#corregirSolicitud").data("solicitudd", solicitud);
        $("#unidadCorregir").val(solicitud.unidad);
        $("#lugarTrabajoCorregir").val(solicitud.lugarDeTrabajo);
        $("#descripcionCorregir").val(solicitud.descripcion);
    });

    $("#modalMostrarRechazo").on("show.bs.modal", function (event) {
        let btn = $(event.relatedTarget);
        let solicitud = btn.data("solicitud");
        if (solicitud.ob[0]) {
           $("#rechazoFecha").val(solicitud.ob[0].date2);
            $("#rechazadoPor").val(solicitud.ob[0].usuario.nombre + " " + solicitud.ob[0].usuario.apellido);
            $("#descripcionRechazo").val(solicitud.ob[0].descripcion);
        }
    });
    
     $("#modalObservacionesSolicitud").on("show.bs.modal", function (event) {
        let btn = $(event.relatedTarget);
        let solicitud = btn.data("solicitud");
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

function cargarInicio() {
    $("#labelEnc").html("Inicio");
    $(".sidebar ul li").removeClass("selected");
    $(".sidebar ul li:eq(0)").addClass("selected");
    $("#main > div").css("display", "none");
    //obtenerSolicitudesInicio();
    cargarSolicitudesInicio();
    $("#inicio").css("display", "block");
  
}

function cargarSolicitudesDiv() {
    $("#labelEnc").html("Solicitudes");
    $(".sidebar ul li").removeClass("selected");
    $(".sidebar ul li:eq(1)").addClass("selected");
    $("#main > div").css("display", "none");
      obtenerSolicitudes();
    $("#agregaSolicitud").css("display", "none");
    $("#solicitudesInicio").css("display", "block");
    $("#solicitudes").css("display", "block");
  
    
}

function cargarAdminCuenta() {

    $("#labelEnc").html("Administración de Cuenta");
    $("#main > div").css("display", "none");
    $("#tablaCuenta").css("display", "block");
    $(".sidebar ul li").removeClass("selected");
    $(".sidebar ul li:eq(2)").addClass("selected");
}


function cargarSolicitudesInicio() {

    Proxy.obtenerSolicitudesRechazadas(function (resp) {
    let table = $('#tablaSolicitudesInicio').DataTable({
        "bDestroy": true,
        "aaData": resp,
        "order": [[1, "desc" ]],
        "columnDefs": [
            {"width": 200, "targets": 7},
            {"type": "date-eu", "targets": 1},
            {"type": "prioridad"},
            {"orderable": false, "targets": 7},
            {"searchable": false, "targets": 7}
        ],
        "aoColumns": [
            {"mDataProp": "unidad"},
            {"mDataProp": "date2"},
            {"mDataProp": "user",
                "render": function (data, type, row) {
                    return data.nombre + " " + data.apellido;
                }},
            {"mDataProp": "lugarDeTrabajo"},
            {"mDataProp": "est.nombre"},
            {"mDataProp": "pr",
                "render": function (data, type, row) {
                    return '<span class="pr-' + data.color + '" data-pr=' + data.codigo + ' ></span>';
                }
            },
            {"mDataProp": "descripcion"},
            {"mDataProp": 'est',
                "render": function (data, type, row) {
                        return '<button class="btn btn-primary" data-toggle="modal" data-target="#modalCorregirSolicitud">Corregir</button><button class="btn btn-warning" data-toggle="modal" data-target="#modalMostrarRechazo">Ver Rechazo</button>';
                    
                }
            }
        ],
        "language": idioma});

        $("#tablaSolicitudesInicio tbody").unbind("click");

    $("#tablaSolicitudesInicio tbody").on("click", ".btn-primary", function (e) {
        let soli = table.row($(this).parents("tr")).data();
        $(this).data("solicitud", soli);
    });

    $("#tablaSolicitudesInicio tbody").on("click", ".btn-warning", function (e) {
        let soli = table.row($(this).parents("tr")).data();
        $(this).data("solicitud", soli);
    });
    });
}


function cargarSolicitudes(solicitudes) {
    let divSolicitudes = $("#divSolicitudes");
    divSolicitudes.empty();
    let flecha = $("<i>");
    flecha.addClass("fa fa-angle-right fa-fw");
    $("#labelSoliciSolici").empty();
    if (solicitudes.length === 0) {
        $("#labelSoliciSolici").append('No hay solicitudes para mostrar').append(flecha);
    } else {
        $("#labelSoliciSolici").append('Solicitudes Realizadas').append(flecha);
        for (let i = 0; i < solicitudes.length; i++) {
            let solicitud = solicitudes[i];
            let divPanelSoli = $("<div>");
            divPanelSoli.addClass("panel");
            divPanelSoli.addClass("panel-default");
            let divPanelHeadingSoli = $("<div>");
            divPanelHeadingSoli.addClass("panel-heading");
            divPanelHeadingSoli.append($("<i>").addClass("fa fa-hashtag fa-fw")).append("Solicitud " + solicitud.codigo);
            divPanelHeadingSoli.appendTo(divPanelSoli);
            let divRight = $("<div>");
            divRight.addClass("pull-right");
            //let fecha = solicitud.date.dayOfMonth+"-"+solicitud.date.month+"-"+solicitud.date.year;
            divRight.append($("<i>").addClass("fa fa-calendar-o fa-fw")).append(" " + solicitud.date2);
            divRight.appendTo(divPanelHeadingSoli);
            let divBody = $("<div>").addClass("panel-body");
            let divUnidad = $("<div>").append($("<strong>").html("Unidad:  ")).append(solicitud.unidad);
            let divLugar = $("<div>").append($("<strong>").html("Lugar de trabajo:  ")).append(solicitud.lugarDeTrabajo);
            let divEstado = $("<div>").append($("<strong>").html("Estado:  ")).append(solicitud.est.nombre);
            let divDescripcion = $("<div>").append($("<strong>").html("Descripcion:  ")).append(solicitud.descripcion);
            divBody.append(divUnidad).append(divLugar).append(divEstado).append(divDescripcion);
            divBody.appendTo(divPanelSoli);
            divSolicitudes.append(divPanelSoli);
        }

    }
    divSolicitudes.css("display", "block");
}

function obtenerSolicitudes() {
    Proxy.obtenerSolicitudes(function (resp) {
        console.log(resp);
// cargarSolicitudes(resp);
        let table = $('#tablaSolicitudes').DataTable({
            "destroy": true,
            "aaData": resp,
            "columnDefs": [
                {"width": 200, "targets": 7},
                {"type": "date-eu", "targets": 1},
                {"type": "prioridad"},
                {"orderable": false, "targets": [8,7]},
                {"searchable": false, "targets": [8,7]}
            ],
            "aoColumns": [
                {"mDataProp": "unidad"},
                {"mDataProp": "date2"},
                {"mDataProp": "user",
                    "render": function (data, type, row) {
                        return data.nombre + " " + data.apellido;
                    }},
                {"mDataProp": "lugarDeTrabajo"},
                {"mDataProp": "est.nombre"},
                {"mDataProp": "pr",
                    "render": function (data, type, row) {
                        return '<span class="pr-' + data.color + '" data-pr=' + data.codigo + ' ></span>';
                    }
                },
                {"mDataProp": "descripcion"},
                {"mDataProp": 'est',
                    "render": function (data, type, row) {
                        if (data.codigo === 0)
                            return '<button class="btn btn-primary" data-toggle="modal" data-target="#modalCorregirSolicitud">Corregir</button><button class="btn btn-warning" data-toggle="modal" data-target="#modalMostrarRechazo">Ver Rechazo</button>';
                            return '';
                    }
                },
                 {"mDataProp": 'ob', 
                     "render": function (data, type, row) {
                        return '<button class="btn btn-info" data-toggle="modal" data-target="#modalObservacionesSolicitud">Ver(' + data.length + ')</button>';
                    }
                }
            ],
            "language": idioma});

            $("#tablaSolicitudes tbody").unbind("click");

        $("#tablaSolicitudes tbody").on("click", ".btn-primary", function (e) {
            let soli = table.row($(this).parents("tr")).data();
            $(this).data("solicitud", soli);
        });

        $("#tablaSolicitudes tbody").on("click", ".btn-warning", function (e) {
            let soli = table.row($(this).parents("tr")).data();
            $(this).data("solicitud", soli);
        });
        
        $("#tablaSolicitudes tbody").on("click", ".btn-info", function (e) {
            let soli = table.row($(this).parents("tr")).data();
            $(this).data("solicitud", soli);
        });
    });
}

function obtenerSolicitudesInicio() {

    Proxy.obtenerSolicitudes(function (resp) {
        cargarSolicitudesInicio(resp);
    });
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
    return(password === passwordConfirm);
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
            alerta("info", "Contraseña modificada exitosamente.");
        } else {
            $("#labelErrorActual").html("*Error, contraseña incorrecta");
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
    if (passwordActual.length === 0) {
        $("#labelErrorActual").html("*Contraseña actual es requerida");
        aux = false;
    }
    if (passwordNuevo.length === 0) {
        $("#labelErrorNueva").html("*Contraseña nueva es requerida");
        aux = false;
    }
    if (passwordConfirmar.length === 0) {
        $("#labelErrorConf").html("*Confirmar contraseña es requerida");
        aux = false;
    }
    return aux;
}

function crearSolicitudMant() {

// SOLO VALIDA QUE NO ESTÉN VACÍOS
    let unid = "Área de Salud San Rafael de Heredia";
    let lugarTrab = $("#lugarTrabajoAgregar").val();
    let descrip = $("#descripcionAgregar").val();
    let solicitud = {_class: "Solicitud", codigo: 1, pr: null, est: null, ob: null, unidad: unid, lugarDeTrabajo: lugarTrab, descripcion: descrip, date: null, date2: null, user: null};
    $("#btnAgregarSolicitud").prop('disabled',true);
    Proxy.crearSolicitudMantenimiento(solicitud, function (resp) {
        if (resp === 1) {
            hidingFormAgregar();
            alerta("success", "Solicitud de Mantenimiento Creada Correctamente");
        } else {
            hidingFormAgregar();
            alerta("danger", "No se pudo realizar la creación de la solicitud");
        }
        $("#btnAgregarSolicitud").prop('disabled',true);
    });
}

function validarCrearSoli() {
    let ds = validaDescripcion(1);
    return (ds);
}

function validarCorregirSoli() {
    let ds = validaDescripcion(2);
    return (ds);
}

function validaDescripcion(num) {
    if (num === 1) {
        if ($('#descripcionAgregar').val() === "") {
            $("#labelErrorAgregarDescripcion").html("*Descripción es requerida");
            return false;
        }
        $("#labelErrorAgregarDescripcion").html("");
        return true;
    } else {
        if ($('#descripcionCorregir').val() === "") {
            $("#labelErrorCorregirDescripcion").html("*Descripción es requerida");
            return false;
        }
        $("#labelErrorCorregirDescripcion").html("");
        return true;
    }

}

function limpiaDatosCrearSoli() {
    $('#descripcionAgregar').val("");
    $('#lugarTrabajoAgregar').val("Administración");
    $('#unidadAgregar').val("");
    $("#labelErrorAgregarDescripcion").html("");
    $("#labelErrorAgregarLugarTrabajo").html("");
    $("#labelErrorAgregarUnidad").html("");
    
    $("#agregaSolicitud > form > div ").removeClass('has-error has-danger');
    $("#agregaSolicitud > form > div > .help-block").html("");
}

function entersCrearSolicitud() {
    $("#unidadAgregar").on("keypress", function (event) {
        if (event.keyCode === 13) {
            crearSolicitudMant();
        }
    });
    $("#lugarTrabajoAgregar").on("keypress", function (event) {
        if (event.keyCode === 13) {
            crearSolicitudMant();
        }
    });
}

///// ------------------

function corregirSolicitudMant() {
    let solicitud = $("#corregirSolicitud").data("solicitudd");
    if (validarCorregirSoli()) {

        solicitud.unidad = $("#unidadCorregir").val();
        solicitud.lugarDeTrabajo = $("#lugarTrabajoCorregir").val();
        solicitud.descripcion = $("#descripcionCorregir").val();

        solicitud.est.codigo = 1;
        
        if ($(".sidebar ul li:eq(0)").hasClass("selected")) {

        Proxy.editarSolicitud(solicitud, function (resp) {
            if (resp > 0) {
                alerta("success", "Solicitud Reenviada exitosamente.");
                cargarInicio();
            } else
                alerta("danger", "Error, No Se Pudo Reenviar la Solicitud.");
        });
    }else{
         Proxy.editarSolicitud(solicitud, function (resp) {
            if (resp > 0) {
                alerta("success", "Solicitud Reenviada exitosamente.");
                obtenerSolicitudes();
            } else
                alerta("danger", "Error, No Se Pudo Reenviar la Solicitud.");
        });
    }
    $("#modalCorregirSolicitud").modal("toggle");
    }
}

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


function limpiaDatosCorregir(){
    $("#modalCorregirSolicitud > form > div").removeClass('has-error has-danger');
    $("#modalCorregirSolicitud > form > div > .help-block").html("");
}