package Controller;

import Model.Administradora;
import Model.Estado;
import Model.Jsonable;
import Model.Model;
import Model.Observacion;
import Model.Prioridad;
import Model.Solicitud;
import Model.Usuario;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.typeadapters.RuntimeTypeAdapterFactory;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "Servlet", urlPatterns = {"/Servlet"})
public class Servlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request,
            HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            response.setContentType("text/xml");
            RuntimeTypeAdapterFactory<Jsonable> rta = RuntimeTypeAdapterFactory.of(Jsonable.class, "_class")
                    .registerSubtype(Administradora.class, "Administradora")
                    .registerSubtype(Usuario.class, "Usuario")
                    .registerSubtype(Prioridad.class, "Prioridad")
                    .registerSubtype(Estado.class, "Estado")
                    .registerSubtype(Observacion.class, "Observacion")
                    .registerSubtype(Solicitud.class, "Solicitud");
            Gson gson = new GsonBuilder().registerTypeAdapterFactory(rta).setDateFormat("dd/MM/yyyy").create();
            Model model = Model.obtenerInstancia();
            String json;
            String json2;
            String accion = request.getParameter("action");
            Usuario user;
            List<Usuario> usuarios;
            int num;
            System.out.println("Llegué");
            switch (accion) {
                case "login": {
                    json = request.getParameter("usuario");
                    json2 = request.getParameter("password");
                    System.out.println(json);
                    System.out.println(json2);
                    user = model.getUsuarioPassword(json, json2);
                    if (user != null) {
                        request.getSession().setAttribute("user", user);
                    }
                    json = gson.toJson(user);
                    out.write(json);
                    break;
                }
                case "insertaUsuario": {
                    System.out.println("Entré");
                    json = request.getParameter("user");
                    System.out.println("USUARIO: " + json);

                    user = gson.fromJson(json, Usuario.class);
                    num = model.guardarUsuario(user, "0000");
                    //System.out.println("USUARIO 2: "+user.getNombre()+" "+user.getCarnet()+
                    //      " "+user.getCedula()+" "+ user.getApellido() + " "+ user.getPuesto());
                    json = gson.toJson(num);
                    out.write(json);
                    break;
                }
                case "eliminarUsuario": {
                    json = request.getParameter("carnet");

                    user = (Usuario) request.getSession().getAttribute("user");
                    String carnet = user.getCedula();
                    if (!json.equals(carnet)) {
                        model.eliminarUsuario(json);
                        System.out.println(json);
                        json = gson.toJson(json);
                        out.write(json);
                        break;
                    }
                    json = gson.toJson("-1");
                    out.write(json);
                    break;
                }
                case "modificarPassword": {
                    json = request.getParameter("password");
                    json2 = request.getParameter("passwordNuevo");
                    String carnet = ((Usuario) request.getSession().getAttribute("user")).getCedula();
                    num = model.updateUsuarioPassword(carnet, json, json2);
                    json = gson.toJson(num);
                    out.write(json);
                    break;
                }    
                case "restablecePassword": {
                    json = request.getParameter("cedula");
                    json2 = request.getParameter("passwordNuevo");              
                    num = model.updateUsuarioRestablecePassword(json, json2);
                    json = gson.toJson(num);
                    out.write(json);
                    break;
                }               
                case "editarUsuario": {
                    System.out.println("Entré");
                    json = request.getParameter("user");
                    System.out.println("USUARIO: " + json);

                    user = gson.fromJson(json, Usuario.class);
                    model.updateUsuario(user);
                    //System.out.println("USUARIO 2: "+user.getNombre()+" "+user.getCarnet()+
                    //      " "+user.getCedula()+" "+ user.getApellido() + " "+ user.getPuesto());
                    //json = gson.toJson(json);
                    out.write(json);
                    break;
                }
                case "buscarUsuariosFiltrados": {
                    json = request.getParameter("filtro");
                    System.out.println(json);
                    usuarios = model.getUsuariosFiltrados(json);
                    json2 = gson.toJson(usuarios);
                    System.out.println(json2);
                    out.write(json2);
                    break;
                }
                case "getUsuarios": {
                    usuarios = model.getUsuarios();
                    json = gson.toJson(usuarios);
                    out.write(json);
                    break;
                }
                case "logout": {
                    request.getSession().removeAttribute("user");
                    request.getSession().invalidate();
                    break;
                }
                case "obtenerSolicitudes": {
                    user = (Usuario) request.getSession().getAttribute("user");
                    if (user != null) {
                        List<Solicitud> solicitudes = model.getSolicitudesXUsuario(user.getCedula());
                        json = gson.toJson(solicitudes);
                    } else {
                        List<Solicitud> solicitudes = new ArrayList<>();
                        json = gson.toJson(solicitudes);
                    }
                    out.write(json);
                    break;
                }
                case "obtenerTodasSolicitudes": {
                    System.out.println("Entré a todas");
                    //List<Solicitud> solicitudes = model.getSolicitudesXEstado();
                     List<Solicitud> solicitudes = model.getSolicitudesXFecha();
                    //System.out.println(solicitudes.get(0).getUser().getCedula());
                    json = gson.toJson(solicitudes);

                    out.write(json);
                    break;
                }
               ///////------------------------NUEVO-----------------------------------------------////    
                case "obtenerSolicitudesMantenimientoEnReparacion": {
                    System.out.println("Entré a soli de mantenimiento en reparacion");
                   // List<Solicitud> solicitudes = model.getSolicitudesEncargadoMantenimientoEnReparacion();
                   List<Solicitud> solicitudes = model.getSolicitudesPorEstadoCodigo(4);
                    //System.out.println(solicitudes.get(0).getUser().getCedula());
                    json = gson.toJson(solicitudes);
                    out.write(json);
                    break;
                }
                case "obtenerSolicitudesMantenimientoPriorizadas": {
                    System.out.println("Entré a soli de mantenimiento priorizadas");
                    //List<Solicitud> solicitudes = model.getSolicitudesEncargadoMantenimientoPriorizadas();
                    List<Solicitud> solicitudes = model.getSolicitudesPorEstadoCodigo(3);
                    //System.out.println(solicitudes.get(0).getUser().getCedula());
                    json = gson.toJson(solicitudes);
                    out.write(json);
                    break;
                }
                case "obtenerSolicitudesMantenimientoReparadas": {
                    System.out.println("Entré a soli de mantenimiento reparadas");
                   // List<Solicitud> solicitudes = model.getSolicitudesEncargadoMantenimientoReparadas();
                    List<Solicitud> solicitudes = model.getSolicitudesPorEstadoCodigo(5);
                    //System.out.println(solicitudes.get(0).getUser().getCedula());
                    json = gson.toJson(solicitudes);
                    out.write(json);
                    break;
                }
            ///////---------------------------------------------------------------------------------////    
                
                
                case "obtenerTodasSolicitudesPendientes": {
                    System.out.println("Entré a Pendientes");
                   // List<Solicitud> solicitudes = model.getSolicitudesPendientes();
                   List<Solicitud> solicitudes = model.getSolicitudesPorEstadoCodigo(1);
                    //System.out.println(solicitudes.get(0).getUser().getCedula());
                    System.out.println(solicitudes.size());
                    json = gson.toJson(solicitudes);
                    System.out.println(json);

                    out.write(json);
                    break;
                }
                case "crearSolicitudMantenimiento": {
                    user = (Usuario) request.getSession().getAttribute("user");
                    request.setCharacterEncoding("utf-8");

                    json = request.getParameter("solicitud");
                    if (user != null) {
                        Solicitud soli = gson.fromJson(json, Solicitud.class);
                        soli.setUser(user);
                        soli.setEst(new Estado(1, "Pendiente", ""));
                        soli.setPr(new Prioridad(1, "Blanco", "Sin priorizar"));
                        num = model.guardarSolicitudFechaAuto(soli);
                    } else {
                        num = 0;
                    }
                    json = gson.toJson(num);
                    out.write(json);
                    break;
                }
                case "cambioPrioridad": {
                    json = request.getParameter("codigo");
                    json2 = request.getParameter("valor");
                    //System.out.println("Codigo: "+json+"--"+"Valor: "+json2);
                    num = model.cambiarPrioridad(Integer.parseInt(json), Integer.parseInt(json2));
                    json = gson.toJson(num);
                    out.write(json);
                    break;
                }
                case "cambioEstado": {
                    json = request.getParameter("codigo");
                    json2 = request.getParameter("valor");
                    //System.out.println("Codigo: "+json+"--"+"Valor: "+json2);
                    num = model.cambiarEstado(Integer.parseInt(json), Integer.parseInt(json2));
                    json = gson.toJson(num);
                    out.write(json);
                    break;
                }
                case "guardaObservacion": {
                    json = request.getParameter("observacion");
                    user = (Usuario) request.getSession().getAttribute("user");
                    Observacion obs = gson.fromJson(json, Observacion.class);
                    obs.setUsuario(user);
                    num = model.guardarObservacionFechaAuto(obs);
                    json = gson.toJson(num);
                    out.write(json);
                    break;
                }
                case "editarSolicitud": {
                    json = request.getParameter("solicitud");
                    Solicitud soli = gson.fromJson(json, Solicitud.class);
                    num = model.updateSolicitud(soli);
                    json = gson.toJson(num);
                    out.write(json);
                    break;
                }
                
                case "obtenerSolicitudesRechazadas": {
                    System.out.println("Entré a Rechazadas");
                    user = (Usuario) request.getSession().getAttribute("user");
                    if (user != null) {
                        List<Solicitud> solicitudes = model.getSolicitudesRechazadasXUsuario(user.getCedula());
                        json = gson.toJson(solicitudes);
                    } else {
                        List<Solicitud> solicitudes = new ArrayList<>();
                        json = gson.toJson(solicitudes);
                    }
                    out.write(json);
                    break;
                }
                case "obtenerSolicitudPorCodigo":{
                    json2 = request.getParameter("codigoSolicitud");                    
                    Solicitud solicitud = model.getSolicitudCodigo(Integer.parseInt(json2));                                      
                    json=gson.toJson(solicitud);
                    out.write(json);
                    break;
                
                
                
                } 
               
                
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
