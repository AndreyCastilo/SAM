<%@page import="Model.Usuario"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

    <head>

        <%@ include file="imports.jspf" %>
        <link href="css/dataTables.bootstrap.css" rel="stylesheet">
        <title>Encargado de Mantenimiento</title>

    </head>

    <body>

        <div id="wrapper">

            <!-- Navigation -->
            <nav class="navbar navbar-custom navbar-static-top" role="navigation" style="margin-bottom: 0">

                <%@ include file="navBar.jspf" %>
                <!-- /.navbar-top-links -->

                <div class="navbar-default sidebar" role="navigation">

                        <ul class="nav" id="side-menu">
                            <li  onclick="cargarInicio()"> 
                                <i class="fa fa-tasks fa-fw "></i> Pendientes
                            </li>
                            <li onclick="cargarSolicitudesEnReparacion()"> 
                                <i class="fa fa-tasks fa-fw"></i> En Reparación
                            </li>
                            <li onclick="cargarSolicitudesReparadas()"> 
                                <i class="fa fa-tasks fa-fw"></i> Reparadas
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
                        <h1 id="labelEnc" class="page-header c-black"></h1>
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <div id="main" class="row" style="min-height:600px">
                    <div id="inicio">

                        <h3 id="labelSoliciInicio" class="c-black"></h3>
                        <div id="divSolicitudes2"></div>
                    </div>

                    <div id="solicitudes">
                        <div id="solicitudesInicio">
                            <table id="tablaSolicitudes" class="table table-bordered table-hover" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
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

                    <div id="divSolicitudesEnReparacion">
                        <table id="tablaSolicitudesEnReparacion" class="table table-bordered table-hover" cellspacing="0" width="100%">
                            <thead>
                                <tr>
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

                    <div id="divSolicitudesReparadas">
                        <table id="tablaSolicitudesReparadas" class="table table-bordered table-hover" cellspacing="0" width="100%">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Autor</th>
                                    <th>Lugar</th>
                                    <th>Estado</th>
                                    <th>Prioridad</th>
                                    <th>Descripción</th>
                                    <th>Observaciones</th>
                                </tr>
                            </thead>
                        </table>                 
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
                <div class="modal fade" id="modalEditarSolicitud" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Actualizar Solicitud</h4>
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                    <label for="unidadEditar">Unidad</label>
                                    <input id="unidadEditar" class="form-control" type="text" maxlength="30" readonly>

                                </div>
                                <div class="form-group">
                                    <label for="lugarTrabajoEditar">Lugar de Trabajo</label>
                                    <input id="lugarTrabajoEditar" class="form-control" type="text" maxlength="30" readonly>

                                </div>                                    
                                <div class="form-group">
                                    <label for="descripcionEditar">Descripción</label>
                                    <textarea id="descripcionEditar" class="form-control" rows="5"  style="resize: none" readonly></textarea>

                                </div>
                                <div class="form-group">
                                    <label for="estadoEditar">Estado:</label>
                                    <select id="estadoEditar">
                                        <option value="3">Pendiente</option>
                                        <option value="4">En reparación</option>
                                        <option value="5">Reparada</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button id="confirmarEditarSolicitud" type="button" class="btn btn-success" onclick="editarSolicitud()">Aceptar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" >Cerrar</button>
                            </div>
                        </div>

                    </div>
                </div>
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
                                <div class="bg-info" id="formAgregarObservacion">
                                    <form action="javascript:agregarObservacion()" data-toggle="validator" role="form">
                                        <div class="form-group">
                                            <textarea placeholder="Escriba su observación" class="form-control" id="descripcionObservacion" rows="1" data-error="*Descripcion es requerido" style="resize:none" onfocus="focusAgregarObservacion()" onblur="focusLostAgregarObservacion()" required></textarea>
                                            <div class="help-block with-errors"></div>
                                        </div>
                                        <button type="submit" class="btn btn-info hidden" id="btnAgregarObservacion"  >Agregar</button>
                                    </form>
                                </div>
                                <div id="divObservaciones">

                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="limpiaCamposAgregarObservacion();" >Cerrar</button>
                            </div>
                        </div>

                    </div>
                </div>
                <!--------------- fin modals ---------------->
            </div>
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
        <!--script src="js/administradorains.js"></script-->
        <script src="js/dataTablesLenguaje.js"></script>
        <script src="js/jquery.dataTables.js"></script>
        <script src="js/dataTables.bootstrap.js"></script>
        <script src="js/date-eu.js"></script>      
        <script src="js/encargadoMantenimientoIns.js"></script>


    </body>

</html>
