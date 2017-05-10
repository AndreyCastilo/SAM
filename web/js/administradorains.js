

$('document').ready(function () {
    cargarInicio();
    funcionalidadModals();
    entersCrearSolicitud();
});

function cargarAdminUsers() {
    $("#labelEnc").html("Administración de Usuarios");

    $(".sidebar ul li").removeClass("selected");
    $(".sidebar ul li:eq(2)").addClass("selected");

    $("#main > div").css("display", "none");
    $("#formAgregar").css("display", "none");
    $("#formEditarUsuario").css("display", "none");

    cargarTablaUsuariosTodos();
    $("#adminUsuariosInicio").css("display", "block");
    $("#adminUsuarios").css("display", "block");

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

    /* $("#modalEliminaUsuario").on("show.bs.modal", function (event) {
     let btn = $(event.relatedTarget);
     let usuario = btn.data("user");
     $("#labelElimina").text("¿ Esta seguro que desea eliminar al usuario " + usuario.nombre + " " + usuario.apellido + " ?");
     let btnConfirEli = $("#confirmaEliminacion");
     btnConfirEli.data("userCarnet", usuario.carnet);
     
     });*/

    $("#confirmarRechazo").on("show.bs.modal", function (event) {
        let btn = $(event.relatedTarget);
        let solicitud = btn.data("solicitud");
        let btnConfirma = $("#btnConfirmarRechazo");
        infoSolicitud(solicitud,"#infoSolicitudConfirmarRechazo");
        btnConfirma.data("solicitud", solicitud);
    });
    
    $("#aceptarSolicitud").on("show.bs.modal", function (event) {
        let btn = $(event.relatedTarget);
        let solicitud = btn.data("solicitud");
        let btnConfirma = $("#confirmarPriorizacion");
        infoSolicitud(solicitud,"#infoSolicitudAsignarPrioridad");
        if(solicitud.est==1){
        $('input[name="prioridad"]').prop('checked', true);
  }else{
         $('input[name="prioridad"]').filter('[value="' + solicitud.pr.codigo + '"]').prop('checked', true);
  }
        btnConfirma.data("solicitud", solicitud.codigo);
        if (solicitud.est.codigo == 1) {
            Proxy.cambioEstado(solicitud.codigo, 2, function (resp) { // Cambiar segundo parametro
                if (resp > 0)
                    alerta("success", "Solicitud Aceptada.");

            });
        }
    });


    $("#modalCorregirSolicitud").on("show.bs.modal", function (event) {
        let btn = $(event.relatedTarget);
        //let table = $('#tableSolicitudesPendientes').DataTable();
        // let soli = table.row(btn.parents("tr")).data();
        let solicitud = btn.data("solicitud");
        let btnConfirma = $("#corregirSolicitud").data("solicitudd", solicitud);
        $("#unidadCorregir").val(solicitud.unidad);
        $("#lugarTrabajoCorregir").val(solicitud.lugarDeTrabajo);
        $("#descripcionCorregir").val(solicitud.descripcion);
    });


    $("#modalEliminaUsuario").on("show.bs.modal", function (event) {
        let btn = $(event.relatedTarget);
        let usuario = btn.data("user");
        $("#labelElimina").text("¿ Esta seguro que desea eliminar al usuario " + usuario.nombre + " " + usuario.apellido + " ?");
        let btnConfirEli = $("#confirmaEliminacion");
        btnConfirEli.data("userCarnet", usuario.cedula);

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
    listarSolicitudesPendientes();
    $("#inicio").css("display", "block");
}

function cargarSolicitudesDiv() {
    $("#labelEnc").html("Solicitudes");

    $(".sidebar ul li").removeClass("selected");
    $(".sidebar ul li:eq(1)").addClass("selected");

    $("#main > div").css("display", "none");

    listarSolicitudes();
    $("#solicitudes").css("display", "block");
}

function listarSolicitudes() {

    Proxy.obtenerTodasSolicitudes(function (resp) {
        let table = $('#example').DataTable({
            "bDestroy": true,
            "aaData": resp,
            "order": [[1, "desc" ]],
            "columnDefs": [
                {"width": 190, "targets": 7},
                {"type": "date-eu", "targets": 1},
                {"type": "prioridad", "targets": 5},
                {"orderable": false, "targets": 7},
                {"searchable": false, "targets": 7}
            ],
            "aoColumns": [
                // {"mDataProp":"codigo"},
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
                        return '<span class="pr-' + data.color + '" data-pr=' + data.codigo + ' ></span>'
                    }
                },
                {"mDataProp": "descripcion"},
                {"mDataProp": 'est',
                    "render": function (data, type, row) {
                        if (data.codigo == 0 && row.user.puesto == "Administradora")
                            return '<button class="btn btn-warning" data-toggle="modal" data-target="#modalCorregirSolicitud">Corregir</button>';

                        if (data.codigo == 1)
                            return '<button class="btn btn-success" data-toggle="modal" data-target="#aceptarSolicitud" >Aceptar</button><button class="btn btn-danger " data-toggle="modal" data-target="#confirmarRechazo">Rechazar</button>';
                        else
                        if (data.codigo > 1 && data.codigo <4) {
                            return '<button class="btn btn-primary" data-toggle="modal" data-target="#aceptarSolicitud ">Priorizar</button>';
                           
                        }
                        return "";
                    }
                },
                {"mDataProp": 'ob', 
                     "render": function (data, type, row) {
                        return '<button class="btn btn-info" data-toggle="modal" data-target="#modalObservacionesSolicitud">Ver(' + data.length + ')</button>';
                    }
                }
            ],
            "language": idioma});

            $("#example tbody").unbind("click");

        $("#example tbody").on("click", ".btn-danger", function (e) {
            let soli = table.row($(this).parents("tr")).data();
            
            $(this).data("solicitud", soli);
        });
        $("#example tbody").on("click", ".btn-success", function (e) {
            let soli = table.row($(this).parents("tr")).data();
            
            $(this).data("solicitud", soli);
        });
        $("#example tbody").on("click", ".btn-primary", function (e) {
            let soli = table.row($(this).parents("tr")).data();
            
            $(this).data("solicitud", soli);
        });
        
            $("#example tbody").on("click", ".btn-info", function (e) {
            let soli = table.row($(this).parents("tr")).data();
            
            $(this).data("solicitud", soli);
        });
        
            $("#example tbody").on("click", ".btn-warning", function (e) {
            let soli = table.row($(this).parents("tr")).data();
            
            $(this).data("solicitud", soli);
        });
    });
}

function cargarAdminCuenta() {
    $("#labelEnc").html("Administración de Cuenta");

    $(".sidebar ul li").removeClass("selected");
    $(".sidebar ul li:eq(3)").addClass("selected");

    $("#main > div").css("display", "none");

    $("#tablaCuenta").css("display", "block");
}

function cargarTablaUsuariosTodos() {

    Proxy.getTodosUsuarios(function (resp) {
        let table = $('#usuariosTable').DataTable({
            "destroy": true,
            "aaData": resp,
            "columnDefs": [
                {"orderable": false, "targets": 4},
                {"searchable": false, "targets": 4}
            ],
            "aoColumns": [
                {"mDataProp": "cedula"},
                {"mDataProp": "nombre"},
                {"mDataProp": "apellido"},
                {"mDataProp": "puesto"},
                {"defaultContent": '<button class="btn btn-primary">Editar</button><button data-toggle="modal" data-target="#modalEliminaUsuario" class="btn btn-danger">Eliminar</button>'}
            ],
            "language": idioma});

            $("#usuariosTable tbody").unbind("click");

        $("#usuariosTable tbody").on("click", ".btn-primary", function () {
            let data = table.row($(this).parents('tr')).data();
   
            displayFormEditar(data);
        });
        $("#usuariosTable tbody").on("click", ".btn-danger", function () {
            let data = table.row($(this).parents('tr')).data();
            $(this).data("user", data);
        });
    });
}

function obtenerSolicitudes() {

    Proxy.obtenerTodasSolicitudes(function (resp) {
        cargarSolicitudes(resp);
    });

}

function cargarTablaUsuariosAdmin(usuarios) {
    let divTabla = $("#tablaUsuarios");
    divTabla.empty();

    if (usuarios.length == 0) {
        // manejar algo aquí
    } else {

        let tabla = $("<table></table>");
        tabla.addClass("table");
        tabla.addClass("table-striped");
        let tHead = $("<thead></thead>");
        tHead.addClass("bg-primary");
        let trHead = $("<tr></tr>");
        let thCedula = $("<th>");
        thCedula.html("Cedula");
        let thNombre = $("<th>");
        thNombre.html("Nombre Completo");
        let thPuesto = $("<th>");
        thPuesto.html("Puesto");
        let thAcciones = $("<th>");
        thAcciones.html("Acciones");
        trHead.append(thCedula).append(thNombre).append(thPuesto).append(thAcciones);
        trHead.appendTo(tHead);
        tabla.append(tHead);

        let tBody = $("<tbody>");

        for (let i = 0; i < usuarios.length; i++) {
            let user = usuarios[i];
            tBody.append(creaTdUsuario(user));
        }
        tabla.append(tBody);
        divTabla.append(tabla);
    }
    divTabla.css("display", "block");
}

function creaTdUsuario(user) {
    let trBody = $("<tr>");
    let tdCed = $("<td>");
    tdCed.html(user.cedula);
    let tdNom = $("<td>");
    tdNom.html(user.nombre + " " + user.apellido);

    let tdPuesto = $("<td>");
    tdPuesto.html(user.puesto);

    let tdBtns = $("<td>");
    tdBtns.addClass("btnsEdiEli");
    let btnEdit = $("<button>");
    btnEdit.addClass("btn");
    btnEdit.addClass("btn-primary");
    btnEdit.attr("data-toggle", "modal");
    btnEdit.attr("data-target", "#modalEditaUsuario");
    btnEdit.data("user", user);
    btnEdit.html("Editar");
    btnEdit.on("click", function (event) {
        let btn = $(event.target);
        let usuario = btn.data("user");
        displayFormEditar(usuario);
    });

    let btnElim = $("<button>");
    btnElim.addClass("btn");
    btnElim.addClass("btn-danger");
    btnElim.attr("data-toggle", "modal");
    btnElim.attr("data-target", "#modalEliminaUsuario");
    btnElim.data("user", user);
    btnElim.html("Eliminar");

    /*$("#modalEliminaUsuario").on("show.bs.modal", function (event) {
     let btn = $(event.relatedTarget);
     let usuario = btn.data("user");
     $("#labelElimina").text("¿ Esta seguro que desea eliminar al usuario " + usuario.nombre + " " + usuario.apellido + " ?");
     let btnConfirEli = $("#confirmaEliminacion");
     btnConfirEli.data("userCarnet", usuario.cedula);
     
     });*/

    tdBtns.append(btnEdit).append(btnElim);
    //trBody.append(th).append(tdCed).append(tdNom).append(tdPuesto).append(tdBtns);
    trBody.append(tdCed).append(tdNom).append(tdPuesto).append(tdBtns);
    return trBody;
}

function agregarUsuario() {

    // SOLO VALIDA QUE NO ESTÉN VACÍOS
    let carnet = $("#carnetAgregar").val();
    let cedula = $("#cedulaAgregar").val();
    let nombre = $("#nombreAgregar").val();
    let apellido = $("#apellidoAgregar").val();
    let puesto = $("#puestoAgregar").val();
    insertarUsuario(nombre, apellido, cedula, carnet, puesto);
}

function limpiaCamposAgregar() {
    $("#carnetAgregar").val("");
    $("#cedulaAgregar").val("");
    $("#nombreAgregar").val("");
    $("#apellidoAgregar").val("");
    $("#puestoAgregar").val("Administradora");

    $("#formAgregar > form > div").removeClass('has-error has-danger');
    $("#formAgregar > form > div > .help-block").html("");
}

function limpiaCamposEditar() {
    $("#formEditarUsuario > form > div").removeClass('has-error has-danger');
    $("#formEditarUsuario > form > div > .help-block").html("");
}

function editarUsuario() {

    // SOLO VALIDA QUE NO ESTÉN VACÍOS
    let carnet = $("#carnetEdita").val();
    let cedula = $("#cedulaEdita").val();
    let nombre = $("#nombreEdita").val();
    let apellido = $("#apellidoEdita").val();
    let puesto = $("#puestoEdita").val();

    editarUsuario2(nombre, apellido, cedula, carnet, puesto);
    alerta("info", "Usuario editado exitosamente");
}

function eliminaUsuario() {
    
    let carnet = $("#confirmaEliminacion").data("userCarnet");
    
    Proxy.eliminarUsuario(carnet, function (resp) {
        if (resp != "-1") {
            alerta("success", "El usuario ha sido eliminado exitosamente");
            cargarAdminUsers();
            $("#modalEliminaUsuario").modal("toggle");
        } else {
            alerta("warning", "No se puede eliminar el usuario actual");
            cargarAdminUsers();
            $("#modalEliminaUsuario").modal("toggle");
        }
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
    if (passwordActual.length == 0) {
        $("#labelErrorActual").html("*Contraseña actual es requerida");
        aux = false;
    }
    if (passwordNuevo.length == 0) {
        $("#labelErrorNueva").html("*Contraseña nueva es requerida");
        aux = false;
    }
    if (passwordConfirmar.length == 0) {
        $("#labelErrorConf").html("*Confirmar contraseña es requerida");
        aux = false;
    }
    return aux;
}

//////////////////////////////////////////////

function cargarSolicitudes(solicitudes) {
    let divSolicitudes = $("#divSolicitudes");
    divSolicitudes.empty();
    let flecha = $("<i>");
    flecha.addClass("fa fa-angle-right fa-fw");
    $("#labelSoliciSolici").empty();
    if (solicitudes.length == 0) {
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
            let divPrioridad;
            if (solicitud.est.codigo > 2) {
                divPrioridad = $("<div>").append($("<strong>").html("Prioridad:  "));
                let spanPrioridad = $("<span>");
                switch (solicitud.pr.codigo) {
                    case 2:
                    {
                        spanPrioridad.addClass("pr-verde");
                        break;
                    }
                    case 3:
                    {
                        spanPrioridad.addClass("pr-amarillo");
                        break;
                    }
                    case 4:
                    {
                        spanPrioridad.addClass("pr-rojo");
                        break;
                    }
                }
                divPrioridad.append(spanPrioridad);
                divPrioridad.addClass("divPrioridad");
            }
            let divDescripcion = $("<div>").append($("<strong>").html("Descripcion:  ")).append(solicitud.descripcion);

            let divBtns = $("<div>").addClass("pull-right");
            if (solicitud.est.codigo == 1) {
                let btnAceptar = $("<button>").addClass("btn").addClass("btn-success").css("margin-right", "10px").html("Aceptar");
                btnAceptar.addClass("btn");
                btnAceptar.addClass("btn-primary");
                btnAceptar.attr("data-toggle", "modal");
                btnAceptar.attr("data-target", "#aceptarSolicitud");
                btnAceptar.data("solicitud", solicitud);

                $("#aceptarSolicitud").on("show.bs.modal", function (event) {
                    let btn = $(event.relatedTarget);
                    let solicitud = btn.data("solicitud");
                    let btnConfirma = $("#confirmarPriorizacion");
                    btnConfirma.data("solicitud", solicitud.codigo);
                    Proxy.cambioEstado(solicitud.codigo, 2, function (resp) { // Cambiar segundo parametro
                        // agregar algo o no sé
                    });
                });


                let btnRechazar = $("<button>").addClass("btn").addClass("btn-danger").html("Rechazar");
                btnRechazar.attr("data-toggle", "modal");
                btnRechazar.attr("data-target", "#confirmarRechazo");
                btnRechazar.data("solicitud", solicitud);

                $("#confirmarRechazo").on("show.bs.modal", function (event) {
                    let btn = $(event.relatedTarget);
                    let solicitud = btn.data("solicitud");
                    let btnConfirma = $("#btnConfirmarRechazo");
                    btnConfirma.data("solicitud", solicitud);
                });

                divBtns.append(btnAceptar).append(btnRechazar);
            } else {
                if (solicitud.est.codigo == 2) {
                    let btnPriorizar = $("<button>").addClass("btn").addClass("btn-success").html("Priorizar");
                    btnPriorizar.addClass("btn");
                    btnPriorizar.addClass("btn-primary");
                    btnPriorizar.attr("data-toggle", "modal");
                    btnPriorizar.attr("data-target", "#aceptarSolicitud");
                    btnPriorizar.data("solicitud", solicitud);
                    $("#confirmarPriorizacion").data("solicitud", solicitud.codigo);
                    divBtns.append(btnPriorizar);
                } else {
                    if (solicitud.est.codigo > 2) {
                        let btnEditar = $("<button>").addClass("btn").addClass("btn-success").html("Editar");
                        btnEditar.addClass("btn");
                        btnEditar.addClass("btn-primary");
                        btnEditar.attr("data-toggle", "modal");
                        btnEditar.attr("data-target", "#aceptarSolicitud");
                        btnEditar.data("solicitud", solicitud);
                        $("#confirmarPriorizacion").data("solicitud", solicitud.codigo);
                        divBtns.append(btnEditar);
                    }
                }
            }
            $("#aceptarSolicitud").on("show.bs.modal", function (event) {
                let btn = $(event.relatedTarget);
                let solicitud = btn.data("solicitud");
                let btnConfirma = $("#confirmarPriorizacion");
                btnConfirma.data("solicitud", solicitud.codigo);
            });



            if (solicitud.est.codigo > 2)
                divBody.append(divUnidad).append(divLugar).append(divEstado).append(divPrioridad).append(divDescripcion).append(divBtns);
            else
                divBody.append(divUnidad).append(divLugar).append(divEstado).append(divDescripcion).append(divBtns);

            divBody.appendTo(divPanelSoli);
            divSolicitudes.append(divPanelSoli);
        }

    }
    divSolicitudes.css("display", "block");
}

function rechazarSolicitud() {
    
    let soli = $("#btnConfirmarRechazo").data("solicitud");
    if ($(".sidebar ul li:eq(0)").hasClass("selected")) {
        Proxy.cambioEstado(soli.codigo, 0, function (resp) {
            if (resp == "1") {
                alerta("success", "La solicitud se ha rechazado exitosamente.");
                $("#confirmarRechazo").modal("toggle");
               
                
                //aqui iria el agregar observacion
                let obs = {_class: 'Observacion', descripcion: $("#motivoRechazo").val(), fecha: null, solicitud: soli,date2:null, usuario: null};
                guardarObservacion(obs, function (resp) {
                
                });
                
            } else {
                alerta("warning", "No se puede rechazar la solicitud.");
                $("#confirmarRechazo").modal("toggle");
            
               
            }
             cargarInicio();
                limpiaMotivoRechazo();
        });
    } else {
        Proxy.cambioEstado(soli.codigo, 0, function (resp) {
            if (resp == "1") {
                alerta("success", "La solicitud se ha rechazado exitosamente.");
                $("#confirmarRechazo").modal("toggle");
               // cargarSolicitudesDiv();
                let obs = {_class: 'Observacion', descripcion: $("#motivoRechazo").val(), fecha: null, solicitud: soli,date2:null, usuario: null};
                guardarObservacion(obs, function (resp) {
                
                });
             

            } else {
                alerta("warning", "No se puede rechazar la solicitud.");
                $("#confirmarRechazo").modal("toggle");
                
            }
            cargarSolicitudesDiv();
                limpiaMotivoRechazo();
        });
    }

}

function guardarObservacion(obs, cb) {
    Proxy.guardarObservacion(obs, function (resp) {
        cb(resp);
    });
}

function displayFormAgregar() {
    limpiaCamposAgregar();
    $("#adminUsuariosInicio").css("display", "none");
    $("#labelEnc").html("");
    let span = $("<span>");
    let i = $("<i>");
    i.addClass("fa fa-angle-right");
    span.html("Administración de Usuarios ");
    span.on("click", function () {
        cargarAdminUsers();
    });
    $("#labelEnc").append(span).append(i).append(" Agregar Usuario");
    $("#formAgregar").css("display", "block");
}

function displayFormEditar(usuario) {
    limpiaCamposEditar();

    $("#adminUsuariosInicio").css("display", "none");
    $("#formEditarUsuario").css("display", "block");

    $("#labelEnc").html("");
    let span = $("<span>");
    let i = $("<i>");
    i.addClass("fa fa-angle-right");
    span.html("Administración de Usuarios ");
    span.on("click", function () {
        cargarAdminUsers();
    });
    $("#labelEnc").append(span).append(i).append(" Editar Usuario");

    $('#labelErrorEditaNombre').html("");
    $('#labelErrorEditaApellidos').html("");
    $("#cedulaEdita").val(usuario.cedula);
    $("#nombreEdita").val(usuario.nombre);
    $("#apellidoEdita").val(usuario.apellido);
    $("#puestoEdita").val(usuario.puesto);

    $("#btnAceptarEditar").removeClass("disabled");
}

function asignarPrioridad() {

    let soli = $("#confirmarPriorizacion").data("solicitud");
    let valor = $('input[name=prioridad]:checked', '#formPriorizar').val();

    if ($(".sidebar ul li:eq(0)").hasClass("selected")) {
        Proxy.cambioPrioridad(soli, valor, function (resp) {
            if (resp == "1") {
                alerta("success", "La solicitud se ha priorizado exitosamente.");
                $("#aceptarSolicitud").modal("toggle");
                Proxy.cambioEstado(soli, 3, function (resp) { // Cambiar segundo parametro
                    
                });
            } else {
                alerta("warning", "No se puede realizar la priorización.");
                $("#aceptarSolicitud").modal("toggle");
                
            }
            cargarInicio();
        });
    } else {
        Proxy.cambioPrioridad(soli, valor, function (resp) {
            if (resp == "1") {
                alerta("success", "La solicitud se ha priorizado exitosamente.");
                $("#aceptarSolicitud").modal("toggle");
                Proxy.cambioEstado(soli, 3, function (resp) { // Cambiar segundo parametro
                
                });
            } else {
                alerta("warning", "No se puede realizar la priorización.");
                $("#aceptarSolicitud").modal("toggle");
                
            }
                cargarSolicitudesDiv();
        });
    }


}


/////// NUEVO

function displayAgregaSolicitud() {

    limpiaDatosCrearSoli();
    $("#solicitudes").css("display", "none");
    $("#labelEnc").html("");
    let span = $("<span>");
    let i = $("<i>");
    i.addClass("fa fa-angle-right");
    span.html("Solicitudes ");
    span.on("click", function () {
        cargarSolicitudesDiv();
    });
    $("#labelEnc").append(span).append(i).append(" Crear Solicitud de Mantenimiento");

    $("#agregaSolicitud").css("display", "block");
}

function crearSolicitudMant() {

    if (validarCrearSoli()) {
        let unid = "Área de Salud San Rafael de Heredia";
        let lugarTrab = $("#lugarTrabajoAgregar").val();
        let descrip = $("#descripcionAgregar").val();
        let solicitud = {_class: "Solicitud", codigo: 1, pr: null, est: null, ob: null, unidad: unid, lugarDeTrabajo: lugarTrab, descripcion: descrip, date: null, date2: null, user: null};
        $("#btnAgregarSolicitud").prop('disabled',true);
        Proxy.crearSolicitudMantenimiento(solicitud, function (resp) {
            if (resp == 1) {
                $("#modalAgregaSolicitud").modal("toggle");
                cargarSolicitudesDiv();
                alerta("success", "Solicitud de Mantenimiento creada correctamente");
            } else {
                $("#modalAgregaSolicitud").modal("toggle");
                alerta("danger", "No se pudo realizar la creación de la solicitud");
            }
            $("#btnAgregarSolicitud").prop('disabled',false);
        });

    }

}

function validarCrearSoli() {
    let ds = validaDescripcion(1);
    return (ds);
}

function validaUnidad() {
    if ($('#unidadAgregar').val() === "") {
        $("#labelErrorAgregarUnidad").html("*Unidad es requerido");
        return false;
    }
    $("#labelErrorAgregarUnidad").html("");
    return true;
}

function limpiaDatosCrearSoli() {
    $('#descripcionAgregar').val("");
    $('#lugarTrabajoAgregar').val("Administración");
    $('#unidadAgregar').val("");
    
    //ELIMINAR LABEL QUE NO SE UTILIZAN????
    $("#labelErrorAgregarDescripcion").html("");
    $("#labelErrorAgregarLugarTrabajo").html("");
    $("#labelErrorAgregarUnidad").html("");
    
    $("#agregaSolicitud > form > div").removeClass('has-error has-danger');
    $("#agregaSolicitud > form > div > .help-block").html("");
    
}

function entersCrearSolicitud() {
    $("#unidadAgregar").on("keypress", function (event) {
        if (event.keyCode == 13) {
            crearSolicitudMant();
        }
    });

    $("#lugarTrabajoAgregar").on("keypress", function (event) {
        if (event.keyCode == 13) {
            crearSolicitudMant();
        }
    });

}

function limpiaMotivoRechazo() {
    $("#motivoRechazo").val("");
    $("#formMotivoRechazo > div > div").removeClass('has-error has-danger');
    $("#formMotivoRechazo > div > div > .help-block").html("");
}

function listarSolicitudesPendientes() {

    Proxy.obtenerTodasSolicitudesPendientes(function (resp) {
        let table = $('#tableSolicitudesPendientes').DataTable({
            "destroy": true,
            "aaData": resp,
            "columnDefs": [
                {"width": 180, "targets": 7},
                {"type": "date-eu", "targets": 1},
                {"typr":"prioridad","targets":5},
                {"orderable": false, "targets": 7},
                {"searchable": false, "targets": 7}
            ],
            "aoColumns": [
                // {"mDataProp":"codigo"},
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
                        return '<span class="pr-' + data.color + '" data-pr=' + data.codigo + ' ></span>'
                    }
                },
                {"mDataProp": "descripcion"},
                {"defaultContent": '<button class="btn btn-success" data-toggle="modal" data-target="#aceptarSolicitud" >Aceptar</button><button class="btn btn-danger " data-toggle="modal" data-target="#confirmarRechazo">Rechazar</button>'},
            ],
            "language": idioma});

            $("#tableSolicitudesPendientes tbody").unbind("click");

        $("#tableSolicitudesPendientes tbody").on("click", ".btn-danger", function (e) {
            let soli = table.row($(this).parents("tr")).data();
           
            $(this).data("solicitud", soli);
        });
        $("#tableSolicitudesPendientes tbody").on("click", ".btn-success", function (e) {
            let soli = table.row($(this).parents("tr")).data();
            
            $(this).data("solicitud", soli);
        });

    });
}

function validarCorregirSoli() {
    let ds = validaDescripcion(2);
    return (ds);
}

function validaDescripcion(num) {
    if (num == 1) {
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

function corregirSolicitudMant() {
    let solicitud = $("#corregirSolicitud").data("solicitudd");
    if (validarCorregirSoli()) {

        solicitud.unidad = $("#unidadCorregir").val();
        solicitud.lugarDeTrabajo = $("#lugarTrabajoCorregir").val();
        solicitud.descripcion = $("#descripcionCorregir").val();

        solicitud.est.codigo = 1;

        Proxy.editarSolicitud(solicitud, function (resp) {
            if (resp > 0) {
                alerta("success", "Solicitud Reenviado exitosamente.");
                //obtenerSolicitudes();
                listarSolicitudes();
            } else
                alerta("danger", "Error, no se pudo reenviar la solicitud.")
        });
        $("#modalCorregirSolicitud").modal("toggle");
    }
}

// OBSERVACIONES

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



$("#modalRestablecerContrasena").on("show.bs.modal", function (event) {
        let btn = $(event.relatedTarget);
        let nombre =$("#nombreEdita").val(); 
        let apellido=$("#apellidoEdita").val();
        let cedula=$("#cedulaEdita").val();
        $("#labelRestableceContraseaa").text("¿ Esta seguro que desea restablecer la contraseña a 0000, al usuario " + nombre + " " + apellido + " ?");
        let btnReContrasena = $("#confirmarRestablecerContraena");
        btnReContrasena.data("userCedula",cedula);

    });


function abrirModalReetableContrasena(){
    $("#modalRestablecerContrasena").modal("show");
    
    
}


function reEstableContrasena(){
    
    let cedula = $("#confirmarRestablecerContraena").data("userCedula");
    Proxy.restableceContrasena(cedula,"0000",function(resp){
         if (resp != "-1") {
            alerta("success", "Se reestablecio exitosamente la contraseña");
            cargarAdminUsers();
            $("#modalRestablecerContrasena").modal("toggle");
        } else {
            alerta("warning", "No se puede reestablecer la contraseña al usuario actual");
            cargarAdminUsers();
            $("#modalRestablecerContrasena").modal("toggle");
        }
        
        
        
    });
    
  
}


