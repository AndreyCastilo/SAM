/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 *
 * @author Danel
 */
public class Observacion implements Jsonable {

    int codigo;
    Solicitud solicitud;
    Calendar date;
    Date date2;
    String descripcion;
    Usuario usuario;

    public Observacion() {
        this.codigo = -1;
        this.solicitud = new Solicitud();
        this.date = Calendar.getInstance();
        this.date2=date.getTime();
        this.descripcion = "";
        this.usuario = new Usuario();
    }

    public Observacion(int codigo, Solicitud solicitud, String descripcion, Usuario usuario) {
        this.codigo = codigo;
        this.solicitud = solicitud;
        this.date = Calendar.getInstance();
        this.date2=date.getTime();
        this.descripcion = descripcion;
        this.usuario = usuario;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public Solicitud getSolicitud() {
        return solicitud;
    }

    public void setSolicitud(Solicitud solicitud) {
        this.solicitud = solicitud;
    }

    public Calendar getDate() {
        return date;
    }

    public void setDate(Calendar date) {
        this.date = date;
        this.date2 = date.getTime();
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Usuario getUsuario() {
        return this.usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getDateString() {
        SimpleDateFormat format1 = new SimpleDateFormat("dd-MM-yyyy");
        String formatted = format1.format(date.getTime());
        return formatted;
    }
    
    

}