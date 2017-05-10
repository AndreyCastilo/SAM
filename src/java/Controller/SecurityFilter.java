/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import Model.Model;
import Model.Usuario;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author USUARIO
 */
public class SecurityFilter implements Filter{
    List<String> accionAdmin = Arrays.asList("/administradora.jsp","/Servlet_login","/Servlet_insertaUsuario","/Servlet_eliminarUsuario","/Servlet_modificarPassword","/Servlet_editarUsuario","/Servlet_buscarUsuariosFiltrados","/Servlet_getUsuarios","/Servlet_logout");
    List<String> accionEncJefa = Arrays.asList("/encargadoJefatura.jsp");
    List<String> accionEncMante = Arrays.asList("/encargadoMantenimiento.jsp");
    List<String>[] urlTrafico; //= (List<String>[]) new List[4]

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;
        HttpSession ses = req.getSession();
        String LOGIN = "/Sprint/";
        String admin = "administradora.jsp";
        String uri = req.getRequestURI().substring(req.getContextPath().length());
       if(!accionAdmin.contains(uri) && !accionEncJefa.contains(uri) && !accionEncMante.contains(uri) ){
            chain.doFilter(request, response);
        }
        else if (uri.equals("/index.jsp")) { //   /Hospital1.6/
            chain.doFilter(request, response);
        }    
        else {
            Usuario user = (Usuario) ses.getAttribute("user");
            if (user == null) {
                resp.sendRedirect(LOGIN);
            } 
            else if (user.getTipoUsuario() == 2) {
                if (accionAdmin.contains(uri)) {
                    chain.doFilter(request, response);
                } else {
                    resp.sendRedirect(LOGIN);                   
                }
            } 
            else if (user.getTipoUsuario() == 1) {
                if (accionEncJefa.contains(uri)) {
                    chain.doFilter(request, response);
                } else {
                    resp.sendRedirect(LOGIN);
                }
            }
            else if (user.getTipoUsuario() == 3) {
                if (accionEncMante.contains(uri)) {
                    chain.doFilter(request, response);
                } else {
                    resp.sendRedirect(LOGIN);
                }
            }
    }      
        }
    

    @Override
    public void destroy() {        
    }

    @Override
    public void init(FilterConfig filterConfig) {        
    }
}