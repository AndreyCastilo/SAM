/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import Database.ConexionSQLServer;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import Model.Usuario;

/**
 *
 * @author Danel
 */
public class Model {

    private static Model instancia = null;
    Connection cn;

    public Model() {
        ConexionSQLServer con = new ConexionSQLServer();
        cn = con.conectarSQLA();
    }

    public static Model obtenerInstancia() {
        if (instancia == null) {
            instancia = new Model();
        }
        return instancia;
    }

    ////////////////////////////----USUARIO-----////////////////////////////////////   
    ////////////////////////////----------------///////////////////////////////////  
    public int guardarUsuario(Usuario user, String password) throws Exception {
        try {
            CallableStatement sp = cn.prepareCall("execute sp_insert_usuario ?,?,?,?,? ");
            sp.setString(1, user.getNombre());
            sp.setString(2, user.getApellido());
            sp.setString(3, user.getCedula());
            int codigoPuesto = getPuestoNombre(user.getPuesto());
            sp.setInt(4, codigoPuesto);
            sp.setString(5, password);
            int resultado = sp.executeUpdate();
            if (resultado == -1) {
                throw new Exception("Usuario ya existe!"); // mejor devolver el -1 y avisar en la interfaz que ya existe
            }
            sp.close();

        } catch (SQLException e) {
            String msj = e.toString();
            System.out.println(msj);
            return 0;
        }
        return 1;
    }

    public void updateUsuario(Usuario user) throws Exception {  //ACTUALIZA USUARIO POR CARNET
        try {
            CallableStatement sp = cn.prepareCall("execute sp_update_usuario ?,?,?,? ");
            sp.setString(1, user.getNombre());
            sp.setString(2, user.getApellido());
            sp.setString(3, user.getCedula());
            int codigoPuesto = getPuestoNombre(user.getPuesto());
            sp.setInt(4, codigoPuesto);
            int resultado = sp.executeUpdate();
            if (resultado == -1) {
                throw new Exception("No se actualizo ningun usuario!");
            }
            sp.close();
        } catch (SQLException e) {
            throw new Exception(e.getMessage());
        }
    }

    public int updateUsuarioPassword(String carnet, String password, String passwordNuevo) throws Exception {
        try {
            CallableStatement sp = cn.prepareCall(" execute sp_update_usuario_password ?,?,? ");
            sp.setString(1, carnet);
            sp.setString(2, password);
            sp.setString(3, passwordNuevo);
            System.out.println(carnet + "  " + password + "  " + passwordNuevo);
            int resultado = sp.executeUpdate();
            sp.close();
            return resultado;
        } catch (SQLException e) {
            throw new Exception(e.getMessage());
        }

    }
    
    public int updateUsuarioRestablecePassword(String carnet,String passwordNuevo) throws Exception {
        try {
            CallableStatement sp = cn.prepareCall(" execute sp_update_usuario_restablece_password ?,? ");
            sp.setString(1, carnet);
            sp.setString(2, passwordNuevo);
            int resultado = sp.executeUpdate();
            sp.close();
            return resultado;
        } catch (SQLException e) {
            throw new Exception(e.getMessage());
        }

    }
//sp_update_usuario_reestablece_password
    
    
    //NIGUN getUsuario TRAE EL PASSWORD DEL USUARIO DESDE LA BASE
    public List<Usuario> getUsuarios() {  //TODOS LOS USUARIOS EN LA BASE
        List<Usuario> ListaUsuarios = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute sp_select_usuario_todos  ");
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListaUsuarios.add(crearUsuario(rs));
            }
            sp.close();
            return ListaUsuarios;
        } catch (SQLException e) {
            return null;
        }

    }

    public Usuario getUsuario(String cedula) { //TRAE UN USUAIO CUALQUIERA SIN RESTRICCION DE BORRADO LOGICO
        try {
            CallableStatement sp = cn.prepareCall(" execute sp_select_usuario_carnet ? ");
            sp.setString(1, cedula);
            ResultSet rs = sp.executeQuery();
            Usuario user = null;
            if (rs.next()) {
                user = crearUsuario(rs);
            }
            sp.close();
            return user;
        } catch (SQLException e) {
            return null;
        }
    }

    public Usuario getUsuarioCarnet(String carnet) { //TRAE UN USUAIO BUSCADO POR CARNET
        try {
            CallableStatement sp = cn.prepareCall(" execute sp_select_usuario_carnet ? ");
            sp.setString(1, carnet);
            ResultSet rs = sp.executeQuery();
            Usuario user = null;
            if (rs.next()) {
                user = crearUsuario(rs);
            }
            sp.close();
            return user;
        } catch (SQLException e) {
            return null;
        }
    }

    public Usuario getUsuarioCedula(String cedula) {  //TRAE UN USUAIO BUSCADO POR CEDULA
        try {
            CallableStatement sp = cn.prepareCall(" execute sp_select_usuario_cedula ?");
            sp.setString(1, cedula);
            ResultSet rs = sp.executeQuery();
            Usuario user = null;
            if (rs.next()) {
                user = crearUsuario(rs);
            }
            sp.close();
            return user;
        } catch (SQLException e) {
            return null;
        }
    }

    public Usuario getUsuarioPassword(String carnet, String password) {  //TRAE UN USUAIO BUSCADO POR PASSWORD; USAR ESTE PARA LOGIN
        try {
            Model.obtenerInstancia();
            CallableStatement sp = cn.prepareCall(" execute sp_select_usuario_password ?,? ");
            sp.setString(1, carnet);
            sp.setString(2, password);
            ResultSet rs = sp.executeQuery();
            Usuario user = null;
            if (rs.next()) {
                user = crearUsuario(rs);
            }
            sp.close();
            return user;
        } catch (SQLException e) {
            return null;
        }
    }

    public void eliminarUsuario(String carnet) throws Exception {  //ELIMINA A UN USUARIO POR CARNET
        try {
            CallableStatement sp = cn.prepareCall(" execute sp_delete_usuario ? ");
            sp.setString(1, carnet);
            int resultado = sp.executeUpdate();
            if (resultado == -1) {
                throw new Exception("Usuario no eliminado!");
            }
            sp.close();
        } catch (SQLException e) {
            throw new Exception(e.getMessage());
        }
    }

    private Usuario crearUsuario(ResultSet rs) {  //CREA UN USUARIO CON UN RESULT DADO
        Usuario u = new Usuario();
        try {
            u.setNombre(rs.getString("nombre"));
            u.setApellido(rs.getString("apellido"));
            u.setCedula(rs.getString("cedula"));
            u.setPuesto(getPuestoCodigo(rs.getInt("puesto")));

            return u;
        } catch (SQLException ex) {
            return null;
        }
    }

    ////////////////////////////----PUESTO-----////////////////////////////////////   
    ////////////////////////////----------------///////////////////////////////////  
    public String getPuestoCodigo(int codigo) {  //TRAE EL NOMBRE DE UN PUESTO BUSCADO POR CODIGO
        String nombre = "";
        try {
            CallableStatement sp = cn.prepareCall(" execute sp_select_puesto_codigo ? ");
            sp.setInt(1, codigo);
            ResultSet rs = sp.executeQuery();
            Usuario user = null;
            if (rs.next()) {
                nombre = rs.getString("nombre");
            }
            sp.close();
            return nombre;
        } catch (SQLException e) {
            return "Error";
        }

    }

    public int getPuestoNombre(String nombre) {  // TRAE EL CODIGO DE UN PUESTO BUSCADO POR NOMBRE
        int codigo = 0;
        try {
            CallableStatement sp = cn.prepareCall("execute sp_select_puesto_nombre ? ");
            sp.setString(1, nombre);
            ResultSet rs = sp.executeQuery();
            Usuario user = null;
            if (rs.next()) {
                codigo = rs.getInt("codigo");
            }
            sp.close();
            return codigo;
        } catch (SQLException e) {
            return -1;
        }
    }

    public List<String> getPuestos() {       // TRAE EL NOMBRE DE TODOS LOS PUESTOS EN LA BASE
        List<String> ListPuestos = new ArrayList<>();
        // 
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_puesto_todos  ");
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListPuestos.add(rs.getString("nombre"));
            }
            sp.close();
            return ListPuestos;
        } catch (SQLException e) {
            return null;
        }
    }

    public List<Usuario> getUsuariosFiltrados(String filtro) {
        List<Usuario> usuarios = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall("sp_select_like ?");
            sp.setString(1, filtro);
            ResultSet rs = sp.executeQuery();
            Usuario user;
            while (rs.next()) {
                user = this.crearUsuario(rs);
                usuarios.add(user);
            }
            sp.close();
            return usuarios;
        } catch (SQLException e) {
            return null;
        }
    }

    ////////////////////////////----ESTADO-----////////////////////////////////////   
    ////////////////////////////----------------///////////////////////////////////      
    public int guardarEstado(Estado estado) throws Exception {
        try {
            CallableStatement sp = cn.prepareCall("execute sp_insert_estado  ?,?,? ");
            sp.setInt(1, estado.getCodigo());
            sp.setString(2, estado.getNombre());
            sp.setString(3, estado.getDescripcion());
            int resultado = sp.executeUpdate();
            if (resultado == -1) {
                throw new Exception("Estado ya existe!");
            }
            sp.close();

        } catch (SQLException e) {
            String msj = e.toString();
            System.out.println(msj);
            return 0;
        }
        return 1;
    }

    public Estado getEstadoCodigo(int codigo) {
        try {
            CallableStatement sp = cn.prepareCall(" execute sp_select_estado_codigo ? ");
            sp.setInt(1, codigo);
            ResultSet rs = sp.executeQuery();
            Estado estado = null;
            if (rs.next()) {
                estado = this.crearEstado(rs);
            }
            sp.close();
            return estado;
        } catch (SQLException e) {
            return new Estado();
        }
    }

    public List<Estado> getEstados() {
        List<Estado> ListEstados = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_estados  ");
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListEstados.add(this.crearEstado(rs));
            }
            sp.close();
            return ListEstados;
        } catch (SQLException e) {
            return ListEstados;
        }
    }

    private Estado crearEstado(ResultSet rs) {  //CREA UN ESTADO SEGUN EL RESULSET
        Estado estado = new Estado();
        try {
            estado.setCodigo(rs.getInt("codigo"));
            estado.setNombre(rs.getString("nombre"));
            estado.setDescripcion(rs.getString("descripcion"));
            return estado;
        } catch (SQLException ex) {
            return null;
        }
    }

    public int cambiarEstado(int codigo, int estado) {
        try {
            CallableStatement sp = cn.prepareCall(" execute sp_update_estado_solicitud ?,? ");
            sp.setInt(1, codigo);
            sp.setInt(2, estado);
            int resultado = sp.executeUpdate();
            if (resultado == -1) {
                throw new Exception("No se pudo actualizar el estado de la solcitud");
            }
            sp.close();
        } catch (Exception e) {
            String msj = e.toString();
            System.out.println(msj);
            return 0;
        }
        return 1;
    }

    ////////////////////////////----PRIORIDAD-----////////////////////////////////////   
    ////////////////////////////----------------///////////////////////////////////     
    public int guardarPrioridad(Prioridad prioridad) throws Exception {
        try {
            CallableStatement sp = cn.prepareCall("execute sp_insertar_prioridad  ?,?,? ");
            sp.setInt(1, prioridad.getCodigo());
            sp.setString(2, prioridad.getColor());
            sp.setString(3, prioridad.getDescripcion());
            int resultado = sp.executeUpdate();
            if (resultado == -1) {
                throw new Exception("Prioridad ya existe!");
            }
            sp.close();

        } catch (SQLException e) {
            String msj = e.toString();
            System.out.println(msj);
            return 0;
        }
        return 1;
    }

    public Prioridad getPrioridadCodigo(int codigo) {
        try {
            CallableStatement sp = cn.prepareCall(" execute sp_select_prioridad_codigo ? ");
            sp.setInt(1, codigo);
            ResultSet rs = sp.executeQuery();
            Prioridad prioridad = null;
            if (rs.next()) {
                prioridad = this.crearPrioridad(rs);
            }
            sp.close();
            return prioridad;
        } catch (SQLException e) {
            return new Prioridad();
        }
    }

    public List<Prioridad> getPrioridades() {
        List<Prioridad> ListPrioridades = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_prioridades  ");
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListPrioridades.add(this.crearPrioridad(rs));
            }
            sp.close();
            return ListPrioridades;
        } catch (SQLException e) {
            return ListPrioridades;
        }
    }

    private Prioridad crearPrioridad(ResultSet rs) {  //CREA UN ESTADO SEGUN EL RESULSET
        Prioridad prioridad = new Prioridad();
        try {
            prioridad.setCodigo(rs.getInt("codigo"));
            prioridad.setColor(rs.getString("color"));
            prioridad.setDescripcion(rs.getString("descripcion"));
            return prioridad;
        } catch (SQLException ex) {
            return null;
        }
    }

    ////////////////////////////----OBSERVACION-----////////////////////////////////////   
    ////////////////////////////----------------///////////////////////////////////     
    public int guardarObservacion(Observacion observacion) throws Exception {
        try {

            CallableStatement sp = cn.prepareCall("execute sp_insertar_observacion  ?,?,?,? ");
            sp.setDate(1, this.getDateSQL(observacion.getDate()));
            sp.setString(2, observacion.getDescripcion());
            sp.setInt(3, observacion.getSolicitud().getCodigo());
            sp.setString(4, observacion.getUsuario().getCedula());
            int resultado = sp.executeUpdate();
            if (resultado == -1) {
                throw new Exception("Error al agregar la observacion");
            }
            sp.close();

        } catch (SQLException e) {
            String msj = e.toString();
            System.out.println(msj);
            return 0;
        }
        return 1;
    }

    public int guardarObservacionFechaAuto(Observacion observacion) throws Exception {
        try {

            CallableStatement sp = cn.prepareCall("execute sp_insertar_observacion_fecha_auto  ?,?,? ");
            sp.setString(1, observacion.getDescripcion());
            sp.setInt(2, observacion.getSolicitud().getCodigo());
            sp.setString(3, observacion.getUsuario().getCedula());
            int resultado = sp.executeUpdate();
            if (resultado == -1) {
                throw new Exception("Error al agregar la observacion");
            }
            sp.close();

        } catch (SQLException e) {
            String msj = e.toString();
            System.out.println(msj);
            return 0;
        }
        return 1;
    }

    public Observacion getObservacionCodigo(int codigo) {
        try {
            CallableStatement sp = cn.prepareCall(" execute sp_select_observacion_codigo ? ");
            sp.setInt(1, codigo);
            ResultSet rs = sp.executeQuery();
            Observacion observacion = null;
            if (rs.next()) {
                observacion = this.crearObservacion(rs);
            }
            sp.close();
            return observacion;
        } catch (SQLException e) {
            return new Observacion();
        }
    }

    public List<Observacion> getObservacionesSolicitud(int solicitud) { //TRAE LAS OBSERVACION DE UNA SOLICITUD, viene acomodas por fecha
        List<Observacion> ListObservaciones = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_observaciones_solicitud ?  ");
            sp.setInt(1, solicitud);
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListObservaciones.add(this.crearObservacion(rs));
            }
            sp.close();
            return ListObservaciones;
        } catch (SQLException e) {
            return ListObservaciones;
        }
    }

    public List<Observacion> getObservacionesUsuario(String usuario) { //TRAE LAS OBSERVACION DE UNA SOLICITUD, viene acomodas por fecha
        List<Observacion> ListObservaciones = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_observaciones_usuario ?  ");
            sp.setString(1, usuario);
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListObservaciones.add(this.crearObservacion(rs));
            }
            sp.close();
            return ListObservaciones;
        } catch (SQLException e) {
            return ListObservaciones;
        }
    }

    public List<Observacion> getObservaciones() {
        List<Observacion> ListObservaciones = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_observaciones   ");
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListObservaciones.add(this.crearObservacion(rs));
            }
            sp.close();
            return ListObservaciones;
        } catch (SQLException e) {
            return ListObservaciones;
        }
    }

    public List<Observacion> getObservacionesSolicitudFecha(int codigo, Calendar date) { //TRAE LAS OBSERVACION DE UNA SOLICITUD
        List<Observacion> ListObservaciones = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_observaciones_solicitud_fecha ?,?   ");
            sp.setInt(1, codigo);
            sp.setDate(2, this.getDateSQL(date));
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListObservaciones.add(this.crearObservacion(rs));
            }
            sp.close();
            return ListObservaciones;
        } catch (SQLException e) {
            return ListObservaciones;
        }
    }

    public Observacion crearObservacion(ResultSet rs) {  //CREA UN ESTADO SEGUN EL RESULSET
        Observacion observacion = new Observacion();
        try {
            observacion.setCodigo(rs.getInt("codigo"));
            Date fecha = rs.getDate("fecha");
            Calendar cal = Calendar.getInstance();
            cal.setTime(fecha);
            observacion.setDate(cal);
            observacion.setDescripcion(rs.getString("descripcion"));
            Solicitud s = new Solicitud();
            s.setCodigo(rs.getInt("codigoSolicitud"));
            observacion.setSolicitud(s);
            observacion.setUsuario(this.getUsuarioCedula(rs.getString("cedulaUsuario")));
            return observacion;
        } catch (SQLException ex) {
            return new Observacion();
        }
    }

    ////////////////////////////----SOLICITUDES-----////////////////////////////////////   
    ////////////////////////////----------------///////////////////////////////////   
    public Solicitud getSolicitudCodigo(int codigo) {
        Solicitud solicitud = new Solicitud();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_solicitud_codigo ?   ");
            sp.setInt(1, codigo);
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                solicitud = this.crearSolicitud(rs);
            }
            sp.close();
            return solicitud;
        } catch (SQLException e) {
            return solicitud;
        }
    }

    public List<Solicitud> getSolicitudesXUsuario(String codigo) {
        List<Solicitud> ListSolicitudes = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_solicitudes_usuario ?   ");
            sp.setString(1, codigo);
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListSolicitudes.add(this.crearSolicitud(rs));
            }
            sp.close();
            return ListSolicitudes;
        } catch (SQLException e) {
            return ListSolicitudes;
        }
    }
    
     public List<Solicitud> getSolicitudesRechazadasXUsuario(String codigo) {
        List<Solicitud> ListSolicitudes = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_solicitudes_usuario_estado ?   ");
            sp.setString(1, codigo);
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListSolicitudes.add(this.crearSolicitud(rs));
            }
            sp.close();
            return ListSolicitudes;
        } catch (SQLException e) {
            return ListSolicitudes;
        }
    }


    public List<Solicitud> getSolicitudesXFecha() {
        List<Solicitud> ListSolicitudes = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_solicitudes_fecha   ");
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListSolicitudes.add(this.crearSolicitud(rs));
            }
            sp.close();
            return ListSolicitudes;
        } catch (SQLException e) {
            return ListSolicitudes;
        }
    }

    public List<Solicitud> getSolicitudesXPrioridad() {
        List<Solicitud> ListSolicitudes = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_solicitudes_prioridad   ");
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListSolicitudes.add(this.crearSolicitud(rs));
            }
            sp.close();
            return ListSolicitudes;
        } catch (SQLException e) {
            return ListSolicitudes;
        }
    }

    public List<Solicitud> getSolicitudesXEstado() {
        List<Solicitud> ListSolicitudes = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_solicitudes_estado   ");
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListSolicitudes.add(this.crearSolicitud(rs));
            }
            sp.close();
            return ListSolicitudes;
        } catch (SQLException e) {
            return ListSolicitudes;
        }
    }

    public List<Solicitud> getSolicitudesXEstadoCodigo(int codigo) {
        List<Solicitud> ListSolicitudes = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_solicitudes_estado_por_codigo ?  ");
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListSolicitudes.add(this.crearSolicitud(rs));
            }
            sp.close();
            return ListSolicitudes;
        } catch (SQLException e) {
            return ListSolicitudes;
        }
    }

    public List<Solicitud> getSolicitudesAdmin() {  //Muestra todas la solicitudes excepto las rechazadas
        List<Solicitud> ListSolicitudes = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_solicitudes_admin    ");
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListSolicitudes.add(this.crearSolicitud(rs));
            }
            sp.close();
            return ListSolicitudes;
        } catch (SQLException e) {
            return ListSolicitudes;
        }
    }

    
      ///////------------------------NUEVO-----------------------------------------------////   
       ///////------------------------NUEVO-----------------------------------------------////   
    public List<Solicitud> getSolicitudesEncargadoMantenimientoReparadas() {  
        List<Solicitud> ListSolicitudes = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_solicitudes_reparadas     ");
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListSolicitudes.add(this.crearSolicitud(rs));
            }
            sp.close();
            return ListSolicitudes;
        } catch (SQLException e) {
            return ListSolicitudes;
        }
    }

    public List<Solicitud> getSolicitudesEncargadoMantenimientoEnReparacion() {  
        List<Solicitud> ListSolicitudes = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_solicitudes_en_reparacion     ");
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListSolicitudes.add(this.crearSolicitud(rs));
            }
            sp.close();
            return ListSolicitudes;
        } catch (SQLException e) {
            return ListSolicitudes;
        }
    }

    public List<Solicitud> getSolicitudesEncargadoMantenimientoPriorizadas() {  
        List<Solicitud> ListSolicitudes = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_solicitudes_priorizadas     ");
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListSolicitudes.add(this.crearSolicitud(rs));
            }
            sp.close();
            return ListSolicitudes;
        } catch (SQLException e) {
            return ListSolicitudes;
        }
    }
    
     //-------------------------------------------------------///
      ///////-----------------------------------------------------------------------////   

    public List<Solicitud> getSolicitudesPorEstadoCodigo(int codigo) {  //Muestra solo las solicitudes por codigo de estado
        List<Solicitud> ListSolicitudes = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_solicitudes_estado_por_codigo ?     ");
            sp.setInt(1, codigo);
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListSolicitudes.add(this.crearSolicitud(rs));
            }
            sp.close();
            return ListSolicitudes;
        } catch (SQLException e) {
            return ListSolicitudes;
        }
    }

    public int guardarSolicitud(Solicitud solicitud) throws Exception {
        try {
            CallableStatement sp = cn.prepareCall("execute sp_insertar_solicitud  ?,?,?,?,?,?,? ");
            sp.setInt(1, solicitud.getPr().getCodigo());
            sp.setInt(2, solicitud.getEst().getCodigo());
            sp.setString(3, solicitud.getUnidad());
            sp.setString(4, solicitud.getLugarDeTrabajo());
            sp.setString(5, solicitud.getDescripcion());
            sp.setString(6, solicitud.getUser().getCedula()); //Cambiar por cedula en el futuroo
            sp.setDate(7, this.getDateSQL(solicitud.getDate()));
            int resultado = sp.executeUpdate();
            if (resultado == -1) {
                throw new Exception("Error al agregar la observacion");
            }
            sp.close();

        } catch (SQLException e) {
            String msj = e.toString();
            System.out.println(msj);
            return 0;
        }
        return 1;
    }

    public int guardarSolicitudFechaAuto(Solicitud solicitud) throws Exception {
        try {
            CallableStatement sp = cn.prepareCall("execute sp_insertar_solicitud_fecha_auto  ?,?,?,?,?,? ");
            sp.setInt(1, solicitud.getPr().getCodigo());
            sp.setInt(2, solicitud.getEst().getCodigo());
            sp.setString(3, solicitud.getUnidad());
            sp.setString(4, solicitud.getLugarDeTrabajo());
            sp.setString(5, solicitud.getDescripcion());
            sp.setString(6, solicitud.getUser().getCedula()); //Cambiar por cedula en el futuroo
            int resultado = sp.executeUpdate();
            if (resultado == -1) {
                throw new Exception("Error al agregar la observacion");
            }
            sp.close();

        } catch (SQLException e) {
            String msj = e.toString();
            System.out.println(msj);
            return 0;
        }
        return 1;
    }

    public int cambiarPrioridad(int codigo, int valor) {
        try {
            CallableStatement sp = cn.prepareCall(" execute sp_update_prioridad_solicitud ?,? ");
            sp.setInt(1, codigo);
            sp.setInt(2, valor);
            int resultado = sp.executeUpdate();
            System.out.println("En modelo, codigo " + codigo + " y valor " + valor + " y resultado " + resultado);
            if (resultado == -1) {
                throw new Exception("No se pudo priorizar la solicitud");
            }
            sp.close();
        } catch (Exception e) {
            String msj = e.toString();
            System.out.println(msj);
            return 0;
        }
        return 1;
    }

    public int updateSolicitud(Solicitud solicitud) throws Exception {
        try {
            CallableStatement sp = cn.prepareCall("execute sp_update_solicitud  ?,?,?,?,? ");
            sp.setInt(1, solicitud.getCodigo());
            sp.setString(2, solicitud.getUnidad());
            sp.setString(3, solicitud.getLugarDeTrabajo());
            sp.setString(4, solicitud.getDescripcion());
            sp.setInt(5, solicitud.getEst().getCodigo());
            int resultado = sp.executeUpdate();
            sp.close();
            return resultado;
        } catch (SQLException e) {
            throw new Exception(e.getMessage());
        }
    }

    private Solicitud crearSolicitud(ResultSet rs) {
        Solicitud solicitud = new Solicitud();
        try {
            solicitud.setCodigo(rs.getInt("codigo"));
            solicitud.setUnidad(rs.getString("unidad"));
            solicitud.setLugarDeTrabajo(rs.getString("lugarDeTrabajo"));
            solicitud.setDescripcion(rs.getString("descripcion"));
            solicitud.setEst(this.getEstadoCodigo(rs.getInt("estado")));

            Date fecha = rs.getDate("fecha");
            Calendar cal = Calendar.getInstance();
            cal.setTime(fecha);

            solicitud.setDate(cal);
            System.out.println(cal.getTime().toLocaleString());

            solicitud.setOb(this.getObservacionesSolicitud(rs.getInt("codigo")));
            solicitud.setPr(this.getPrioridadCodigo(rs.getInt("prioridad")));
            System.out.println("Solicitud del usuario " + rs.getString("usuario"));
            solicitud.setUser(this.getUsuario(rs.getString("usuario")));
            System.out.println("Solicitud del usuario de nombre");

            return solicitud;
        } catch (SQLException ex) {
            return null;
        }
    }

    public List<Solicitud> getSolicitudesPendientes() {
        List<Solicitud> ListSolicitudes = new ArrayList<>();
        try {
            CallableStatement sp = cn.prepareCall(" execute  sp_select_solicitudes_pendientes   ");
            ResultSet rs = sp.executeQuery();
            while (rs.next()) {
                ListSolicitudes.add(this.crearSolicitud(rs));
            }
            sp.close();
            return ListSolicitudes;
        } catch (SQLException e) {
            return ListSolicitudes;
        }
    }

    ////////////////////////////---------------////////////////////////////////////   
    ////////////////////////////----------------///////////////////////////////////  
    private java.sql.Date getDateSQL(Calendar cal) {
        java.sql.Date de = new java.sql.Date(cal.getTimeInMillis());
        return de;
    }

}
