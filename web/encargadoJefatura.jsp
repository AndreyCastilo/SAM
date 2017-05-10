<%@page import="Model.Usuario"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

    <head>

        <%@ include file="imports.jspf" %>
        <link href="css/dataTables.bootstrap.css"rel="stylesheet">

        <title>Encargado de Jefatura</title>

    </head>

    <body>

        <div id="wrapper">

            <!-- Navigation -->
            <nav class="navbar navbar-custom navbar-static-top" role="navigation" style="margin-bottom: 0">
                <%@ include file="navBar.jspf" %>
                <!-- /.navbar-top-links -->
                <div class="navbar-default sidebar" role="navigation">
                    <div class="sidebar-nav navbar-collapse">
                        <ul class="nav" id="side-menu">
                            <li  onclick="cargarInicio()">
                                <i class="fa fa-home fa-fw "></i> Inicio
                            </li>
                            <li onclick="cargarSolicitudesDiv()">
                                <i class="fa fa-tasks fa-fw"></i> Solicitudes
                            </li>
                            <li onclick="cargarAdminCuenta()">
                                <i class="fa fa-cog fa-fw"></i> Cuenta
                            </li>

                        </ul>
                    </div>
                    <!-- /.sidebar-collapse -->
                </div>
            </nav>

            <div id="page-wrapper">
                <div class="row">
                    <div class="col-lg-12">
                        <h3 id="labelEnc" class="page-header c-black"></h3>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <div class="row" id="main" style="min-height:600px">

                    <div id="inicio">
                        <h3 id="labelSoliciInicio" class="c-black"></h3>
                        <div id="divSolicitudes2">
                            <table id="tablaSolicitudesInicio" class="table table-bordered table-hover" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Unidad</th>
                                        <th>Fecha</th>
                                        <th>Autor</th>
                                        <th>Lugar</th>
                                        <th>Estado</th>
                                        <th>Prioridad</th>
                                        <th>Descripción</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                            </table>                 
                        </div>
                    </div>

                    <div id="solicitudes">


                        <div id="divSolicitudes">

                        </div>
                        <div id="solicitudesDiv">
                            <div id="solicitudesInicio">
                                <div class="encAgregarSolicitudes">
                                    <h3 id="labelSoliciSolici" class="c-black"></h3>
                                    <button class="btn btn-verde btn-success btn-lg btn-block sin-margen" data-toggle="modal" data-target="#modalAgregaSolicitud" onclick="displayAgregaSolicitud()"><i class="fa fa-file-text fa-fw"></i> Crear Solicitud de Mantenimiento</button>
                                </div>
                                <table id="tablaSolicitudes" class="table table-bordered table-hover" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Unidad</th>
                                            <th>Fecha</th>
                                            <th>Autor</th>
                                            <th>Lugar</th>
                                            <th>Estado</th>
                                            <th>Prioridad</th>
                                            <th>Descripción</th>
                                            <th>Acciones</th>
                                            <th>Observaciones</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                        </div>

                        <div id="agregaSolicitud">
                            <div class="closeForm"><i class="fa fa-close pull-right" onclick="hidingFormAgregar()"></i></div> 
                            <form action="javascript:crearSolicitudMant()" data-toggle="validator" role="form">
                                <div class="form-group">
                                    <label for="unidadAgregar">Unidad</label>
                                    <input id="unidadAgregar" class="form-control" type="text" maxlength="30" readonly placeholder="Área de Salud San Rafael de Heredia">

                                    <small id="labelErrorAgregarUnidad" class="labelError"></small>
                                </div>
                                <div class="form-group">
                                    <label for="lugarTrabajoAgregar">Lugar de Trabajo</label>
                                    <!--<input id="lugarTrabajoAgregar" class="form-control" type="text" maxlength="30">-->
                                    <select class="form-control" id="lugarTrabajoAgregar">
                                        <option value="Administración">Administración</option>
                                        <option value="Enfermería">Enfermería</option>
                                        <option value="Farmacia">Farmacia</option>
                                        <option value="Laboratorio">Laboratorio</option>
                                        <option value="Odontología">Odontología</option>
                                        <option value="Registros Médicos">Registros Médicos</option>
                                        <option value="Trabajo Social">Trabajo Social</option>
                                    </select>

                                    <small id="labelErrorAgregarLugarTrabajo" class="labelError"></small>
                                </div>                                    
                                <div class="form-group">
                                    <label for="descripcionAgregar">Descripción</label>
                                    <textarea id="descripcionAgregar" data-error="*Descripción es requerida." class="form-control" rows="5"  style="resize: none" required></textarea>
                                    <div class="help-block with-errors"></div>
                                </div>
                                <button type="submit" class="btn btn-success" id="btnAgregarSolicitud">Aceptar</button>
                                <button type="button" class="btn btn-danger" onclick="hidingFormAgregar()">Cerrar</button>
                            </form>
                        </div>
                    </div>
                    <div id="tablaCuenta">
                        <table class="table table-striped">
                            <tbody>
                                <!--
                                <tr>
                                  <th scope="row">Carnet</th>
                                  <td><%= user.getCedula()%></td>
                                  <td></td>                        
                                </tr> -->  
                                <tr>
                                    <th scope="row">Cédula</th>
                                    <td><%= user.getCedula()%></td>
                                    <td></td>
                                </tr>                        
                                <tr>
                                    <th scope="row">Nombre Completo</th>
                                    <td><%= user.getNombre()%> </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th scope="row">Puesto</th>
                                    <td><%= user.getPuesto()%></td>
                                    <td></td>                        
                                </tr>
                                <tr>
                                    <th scope="row">Contraseña</th>
                                    <td>***********</td>
                                    <td><button class="btn btn-primary" data-toggle="modal" data-target="#myModal">Editar</button></td>
                                </tr>

                            </tbody>
                        </table>
                    </div> 

                </div>
                <!--------------------------------------------MODALS-------------------------------->                  
                <div class="modal fade" id="myModal" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Modificar Contraseña</h4>
                            </div>
                            <div class="modal-body">
                                <table class="formulario">
                                    <tr>
                                        <td><label>Contraseña actual</label></td>
                                        <td><input type="password" id="passwordActual" maxlength="20"></td>
                                        <td><label id="labelErrorActual" class="labelError"></label></td>
                                    </tr>
                                    <tr>
                                        <td><label>Contraseña nueva</label></td>
                                        <td><input type="password" id="passwordNueva" maxlength="20"></td>
                                        <td><label id="labelErrorNueva" class="labelError"></label></td>
                                    </tr>    
                                    <tr>
                                        <td><label>Confirmar contraseña </label></td>
                                        <td><input type="password" id="passwordConfirmar"  maxlength="20"></td>
                                        <td><label id="labelErrorConf" class="labelError"></label></td>
                                    </tr>
                                </table>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-success" onclick="editarPasswordUsuario()">Aceptar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>

                    </div>
                </div>
                <!--------------------MODAL Corregir SOLICITUD --------------------->
                <div class="modal fade bs-example-modal-lg" id="modalCorregirSolicitud" role="dialog">
                    <div class="modal-dialog modalAgregarSoli ">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Corregir Solicitud de Mantenimiento</h4>
                            </div>
                            <form action="javascript:corregirSolicitudMant()" data-toggle="validator" role="form">
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label for="unidadCorregir">Unidad</label>
                                        <input  class="form-control" id="unidadCorregir" type="text" maxlength="50" readonly>
                                    </div>
                                    <div class="form-group">
                                        <label for="lugarTrabajoCorregir">Lugar de Trabajo</label>
                                        <select class="form-control" id="lugarTrabajoCorregir">
                                            <option value="Administración">Administración</option>
                                            <option value="Enfermería">Enfermería</option>
                                            <option value="Farmacia">Farmacia</option>
                                            <option value="Laboratorio">Laboratorio</option>
                                            <option value="Odontología">Odontología</option>
                                            <option value="Registros Médicos">Registros Médicos</option>
                                            <option value="Trabajo Social">Trabajo Social</option>
                                        </select>                                    
                                    </div>   
                                    <div class="form-group">
                                        <label for="descripcionCorregir">Descripción</label>
                                        <textarea class="form-control" id="descripcionCorregir" rows="3" data-error="*Descripción es requerida" style="resize:none" required></textarea>
                                        <div class="help-block with-errors"></div>

                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button id="corregirSolicitud" type="submit" class="btn btn-success">Corregir</button>
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>                                   
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <!--------------------- MODAL MOSTAR MOTIVO RECHAZO --------------------->
                <div class="modal fade bs-example-modal-lg" id="modalMostrarRechazo" role="dialog">
                    <div class="modal-dialog modalAgregarSoli ">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Motivo Rechazo Solicitud</h4>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-6 form-group">
                                        <label for="rechazoFecha">Fecha de Rechazo:</label>
                                        <input  class="form-control" id="rechazoFecha" type="text" readonly>
                                    </div>
                                    <div class="col-md-6 form-group">
                                        <label for="rechazadoPor">Rechazado por:</label>
                                        <input  class="form-control" id="rechazadoPor" type="text" readonly>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="descripcionRechazo">Motivo de rechazo:</label>
                                    <textarea class="form-control" id="descripcionRechazo" rows="3" style="resize:none" readonly></textarea>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>                                   
                            </div>
                        </div>
                    </div>
                </div>
                <!-------------------- FIN MODAL Corregir SOLICITUD --------------------->


                <!--------------------- FIN MODAL MOSTRAR MOTIVO RECHAZO ------------------>
            </div>
                               <!--------------MODAL OBSERVACIONES-------------------------->
                               <div class="modal fade" id="modalObservacionesSolicitud" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" onclick="limpiaCamposAgregarObservacion()">&times;</button>
                                <h4 class="modal-title">Observaciones</h4>
                            </div>
                            <div class="modal-body">
                                <div>
                                    <div id="campoSolicitud">
                                    </div>
                                    <div id="campoAutor">
                                    </div>
                                    <div id="campoFecha">
                                    </div>
                                    <div id="campoLugar">
                                    </div>
                                    <div id="campoDescripcion">
                                    </div>
                                    <div id="campoEstado">
                                    </div>
                                    <div id="campoPrioridad" class="vertical-center">
                                    </div>
                                </div>
                                <div id="divObservaciones">

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal" >Cerrar</button>
                            </div>
                        </div>

                    </div>
                </div>
                               
                               <!--FIN MODAL OBSERVACIONES-->
            <!-- /#page-wrapper -->

        </div>
        <!-- /#wrapper -->
        <div class="alert alert-success alerta" id="alerta-success">
        </div>

        <div class="alert alert-warning alerta" id="alerta-warning">
        </div>

        <div class="alert alert-danger alerta" id="alerta-danger">
        </div>

        <div class="alert alert-info alerta" id="alerta-info">
        </div>

        <%@ include file="importsJS.jspf" %>
        <script src="js/dataTablesLenguaje.js"></script>
        <script src="js/jquery.dataTables.js"></script>
        <script src="js/dataTables.bootstrap.js"></script>
        <script src="js/date-eu.js"></script>        
        <script src="js/prioridad.js"></script>
        <script src="js/encargadoJefaturaIns.js"></script>


    </body>

</html>
