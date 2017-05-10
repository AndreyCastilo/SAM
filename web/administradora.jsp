<%@page import="Model.Usuario"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">

    <head>

        <%@ include file="imports.jspf" %>
        <meta charset="UTF-8">
        <link href="css/dataTables.bootstrap.css" rel="stylesheet">
        <title>Administrador</title>

    </head>

    <body>

        <div id="wrapper">

            <!-- Navigation -->
            <nav class="navbar navbar-custom navbar-static-top" role="navigation" style="margin-bottom: 0">
                <!-- /.navbar-header -->
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
                            <li onclick="cargarAdminUsers()">
                                <i class="fa fa-user fa-fw"></i> Usuarios
                            </li>
                            <li onclick="cargarAdminCuenta()">
                                <i class="fa fa-cog fa-fw"></i> Cuenta
                            </li>

                        </ul>
                    </div>
                    <!-- /.sidebar-collapse -->
                </div>
                <!-- /.navbar-static-side -->
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
                        <table id="tableSolicitudesPendientes" class="table table-bordered table-hover" cellspacing="0" width="100%">
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
                    <div id="adminUsuarios">
                        <div id="adminUsuariosInicio">
                            <div id="divBarraBusqueda" class="botonesUsuario" style="width:100%">
                                <div class="input-group" style="width:100%">
                                    <button class="btn btn-verde btn-success btn-lg btn-block sin-margen" style="width:100%" type="button"  onclick="displayFormAgregar()">
                                        <i class="fa fa-user-plus"></i>     Agregar nuevo usuario
                                    </button>
                                </div>            
                            </div>
                            <div id="tablaUsuarios">
                                <table id="usuariosTable" class="table table-bordered table-hover" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th>Cédula</th>
                                            <th>Nombre</th>
                                            <th>Apellidos</th>
                                            <th>Puesto</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>                        
                        </div>
                        <div id="formAgregar">
                            <div class="closeForm"><i class="fa fa-close pull-right" onclick="cargarAdminUsers();"></i></div>
                            <form data-toggle="validator" role="form" action="javascript:agregarUsuario()">
                                <div class="form-group">
                                    <label for="cedulaAgregar" class="control-label">Cédula</label>
                                    <input type="text" class="form-control" id="cedulaAgregar" placeholder="Cédula" data-error="Cédula es requerida" required>
                                    <div class="help-block with-errors"></div>
                                </div>
                                <div class="form-group">
                                    <label for="nombreAgregar" class="control-label">Nombre</label>
                                    <input type="text" class="form-control" id="nombreAgregar" data-error="Nombre es requerido"  placeholder="Nombre" required>
                                    <div class="help-block with-errors"></div>
                                </div>
                                <div class="form-group">
                                    <label for="apellidoAgregar" class="control-label">Apellidos</label>
                                    <input type="text" class="form-control" id="apellidoAgregar" data-error="Apellidos es requerido" placeholder="Apellidos" required>
                                    <div class="help-block with-errors"></div>
                                </div>   
                                <div class="form-group">
                                    <label for="puestoAgregar">Puesto</label>
                                    <select class="form-control" id="puestoAgregar">
                                        <option value="Administradora">Administrador</option>
                                        <option value="Encargado de Jefatura">Encargado de Jefatura</option>
                                        <option value="Encargado de Mantenimiento">Encargado de Mantenimiento</option>
                                    </select>
                                </div>                                
                                <div class="form-group">
                                    <button type="submit" class="btn btn-success" >Aceptar</button>
                                    <button type="button" class="btn btn-danger" onclick="cargarAdminUsers();">Volver</button>
                                </div>
                            </form>                        
                        </div> 
                        <div id="formEditarUsuario">
                            <div class="closeForm"><i class="fa fa-close pull-right" onclick="cargarAdminUsers();"></i></div>
                            <form data-toggle="validator" role="form" action="javascript:editarUsuario()">
                                <div class="form-group ">
                                    <label for="cedulaEdita">Cédula</label>
                                    <input type="text" class="form-control" id="cedulaEdita"  readonly placeholder="Cédula">
                                </div>
                                <div class="form-group">
                                    <label for="nombreEdita">Nombre</label>
                                    <input type="text" class="form-control" id="nombreEdita" data-error="Nombre es requerido" placeholder="Nombre" required>
                                    <div class="help-block with-errors"></div>
                                </div>
                                <div class="form-group">
                                    <label for="apellidoEdita">Apellidos</label>
                                    <input type="text" class="form-control" id="apellidoEdita" data-error="Apellidos es requerido" placeholder="Apellidos" required>
                                    <div class="help-block with-errors"></div>
                                </div>    
                                <div class="form-group">
                                    <label for="puestoAgregar">Puesto</label>
                                    <select class="form-control" id="puestoEdita">
                                        <option value="Administradora">Administrador</option>
                                        <option value="Encargado de Jefatura">Encargado de Jefatura</option>
                                        <option value="Encargado de Mantenimiento">Encargado de Mantenimiento</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-success" id="btnAceptarEditar">Aceptar</button>
                                <button type="button" class="btn btn-warning" title="Reestablece la contraseña a 0000" onclick="abrirModalReetableContrasena();">Contraseña</button>
                                <button type="button" class="btn btn-danger" onclick="cargarAdminUsers();">Volver</button>
                            </form>
                        </div>

                    </div>
                    <div id="solicitudes">
                        <button class="btn btn-verde btn-success btn-lg btn-block sin-margen margin-bottom" data-toggle="modal" data-target="#modalAgregaSolicitud" onclick="displayAgregaSolicitud()"><i class="fa fa-file-text fa-fw"></i> Crear Solicitud de Mantenimiento</button>
                        <table id="example" class="table table-bordered table-hover" cellspacing="0" width="100%">
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
                        <!-- solicitudes -->
                        <div id="divSolicitudes"></div>
                    </div>
                    <!--   <ul class="nav nav-tabs">
                           <li class="nav-item">
                               <a class="nav-link active" href="#">Todas</a>
                           </li>
                           <li class="nav-item">
                               <a class="nav-link" href="#">Pendientes</a>
                           </li>
                           <li class="nav-item">
                               <a class="nav-link" href="#">Priorizadas</a>
                           </li>
                           <li class="nav-item">
                               <a class="nav-link" href="#">Rechazadas</a>
                           </li>                        
                       </ul>-->

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
                    <div id="agregaSolicitud">
                        <div class="closeForm"><i class="fa fa-close pull-right" onclick="cargarSolicitudesDiv()"></i></div>                    
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
                            <button type="button" class="btn btn-danger" onclick="cargarSolicitudesDiv()">Cerrar</button>
                        </form>
                    </div>
                </div>
                <!--------------------------------------------MODALS-------------------------------->                  

                <div class="modal fade" id="modalEliminaUsuario" role="dialog">
                    <div class="modal-dialog modal-sm">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Eliminar Usuario</h4>
                            </div>
                            <div class="modal-body center">
                                <h5 id="labelElimina"></h5>
                                <div id="botonesEliminar">
                                    <button type="button" class="btn btn-success" onclick="eliminaUsuario()" id="confirmaEliminacion">Aceptar</button>
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
              <div class="modal fade" id="modalRestablecerContrasena" role="dialog">
                    <div class="modal-dialog modal-sm">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Restablecer Contraseña</h4>
                            </div>
                            <div class="modal-body center">
                                <h5 id="labelRestableceContraseaa"></h5>
                                <div id="botonesRestableContrasena">
                                    <button type="button" class="btn btn-danger" onclick="reEstableContrasena()" id="confirmarRestablecerContraena">Aceptar</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal">Cancelar</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                                         
                
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
                                        <td><input type="password" id="passwordConfirmar" maxlength="20" ></td>
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
                <div class="modal fade" id="aceptarSolicitud" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                <h4 class="modal-title">Solicitud Aceptada</h4>
                            </div>
                            <div class="modal-body">
                                <div id="infoSolicitudAsignarPrioridad">
                                        
                                </div>
                                <h3>Seleccionar Prioridad: </h3>
                                <form id="formPriorizar">
                                    <div class="radio-inline "><input type="radio" name="prioridad" id="rbOpcVer" value="2" checked><span class="pr-verde"></span> </div>
                                    <div class="radio-inline "><input type="radio" name="prioridad" id="rbOpcAma" value="3"><span class="pr-amarillo"></span></div>
                                    <div class="radio-inline "><input type="radio" name="prioridad" id="rbOpvRoj" value="4"><span class="pr-rojo"></span></div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button id="confirmarPriorizacion" type="button" class="btn btn-success" onclick="asignarPrioridad()">Aceptar</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="cargarSolicitudesDiv();">Cerrar</button>
                            </div>
                        </div>

                    </div>
                </div>   
                <div class="modal fade" id="confirmarRechazo" role="dialog">
                    <div class="modal-dialog">

                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" onclick="limpiaMotivoRechazo();">&times;</button>
                                <h4 class="modal-title">Rechazar Solicitud</h4>
                            </div>
                            <form action="javascript:rechazarSolicitud()" data-toggle="validator" role="form" id="formMotivoRechazo">
                                <div class="modal-body">
                                    <div id="infoSolicitudConfirmarRechazo">
                                        
                                    </div>
                                    <div class="form-group">
                                        <label for="motivoRechazo"> <h3>Motivo de Rechazo: </h3></label>
                                        <textarea  class="form-control " id="motivoRechazo" rows="5" data-error="*Motivo es requerido" style="resize: none" required></textarea>
                                        <div class="help-block with-errors"></div>
                                    </div>

                                </div>
                                <div class="modal-footer">
                                    <button id="btnConfirmarRechazo" type="submit" class="btn btn-success">Confirmar</button>
                                    <button type="button" class="btn btn-danger" data-dismiss="modal" onclick="limpiaMotivoRechazo();">Cancelar</button>
                                </div>
                            </form>
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
                            <div class="modal-body">
                                <table class="formulario">
                                    <tr>
                                        <td>Unidad</td>
                                        <td> <input  class="form-control" id="unidadCorregir" type="text" maxlength="70" readonly>    
                                    </tr>    
      
                                    <tr>
                                        <td>Lugar de Trabajo
                                        </td>
                                        <td>
                                            <!--  <input id="lugarTrabajoCorregir" type="text" maxlength="30">-->
                                            <select class="form-control" id="lugarTrabajoCorregir">
                                                <option value="Administración">Administración</option>
                                                <option value="Enfermería">Enfermería</option>
                                                <option value="Farmacia">Farmacia</option>
                                                <option value="Laboratorio">Laboratorio</option>
                                                <option value="Odontología">Odontología</option>
                                                <option value="Registros Médicos">Registros Médicos</option>
                                                <option value="Trabajo Social">Trabajo Social</option>
                                            </select>
                                        </td>
                                        <td><label id="labelErrorCorregirLugarTrabajo" class="labelError"></label></td>

                                    </tr>
                                    <tr>
                                        <td>Descripción
                                        </td>
                                        <td>
                                            <textarea id="descripcionCorregir" rows="5" cols="50" style="resize: none"></textarea>
                                        </td>
                                        <td><label id="labelErrorCorregirDescripcion" class="labelError"></label></td>

                                    </tr>

                                </table>
                            </div>
                            <div class="modal-footer">
                                <button id="corregirSolicitud" type="button" class="btn btn-success" onclick="corregirSolicitudMant()">Corregir</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-------------------- FIN MODAL Corregir SOLICITUD --------------------->
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
        <script src="js/jquery.dataTables.js"></script>
        <script src="js/dataTables.bootstrap.js"></script>
        <script src="js/date-eu.js"></script>
        <script src="js/dataTablesLenguaje.js"></script>
        <script src="js/prioridad.js"></script>
        <script src="js/administradorains.js"></script>



    </body>

</html>
