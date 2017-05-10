/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 *
 * @author Danel
 */
public class Solicitud implements Jsonable{

    int codigo;
    Prioridad pr;
    Estado est;
    List<Observacion> ob;
    String unidad;
    String lugarDeTrabajo;
    String descripcion;
    Calendar date;
    Date date2;
    Usuario user;

    public Solicitud() {
        this.codigo = -1;
        this.pr = new Prioridad();
        this.est = new Estado();
        this.ob = new ArrayList<>();
        this.unidad = "";
        this.lugarDeTrabajo = "";
        this.descripcion = "";
        this.date = Calendar.getInstance();
        this.date2 = date.getTime();
        this.user= new Usuario();
    }
    
    public Solicitud(int codigo, Prioridad pr, Estado est, List<Observacion> ob, String unidad, String lugarDeTrabajo, String descripcion, Usuario user) {
        this.codigo = codigo;
        this.pr = pr;
        this.est = est;
        this.ob = ob;
        this.unidad = unidad;
        this.lugarDeTrabajo = lugarDeTrabajo;
        this.descripcion = descripcion;
        this.date = Calendar.getInstance();
        this.date2 = date.getTime();
        this.user=user;
    }
    
    public Usuario getUser() {
        return user;
    }

    public void setUser(Usuario user) {
        this.user = user;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public Prioridad getPr() {
        return pr;
    }

    public void setPr(Prioridad pr) {
        this.pr = pr;
    }

    public Estado getEst() {
        return est;
    }

    public void setEst(Estado est) {
        this.est = est;
    }

    public List<Observacion> getOb() {
        return ob;
    }

    public void setOb(List<Observacion> ob) {
        this.ob = ob;
    }

    public String getUnidad() {
        return unidad;
    }

    public void setUnidad(String unidad) {
        this.unidad = unidad;
    }

    public String getLugarDeTrabajo() {
        return lugarDeTrabajo;
    }

    public void setLugarDeTrabajo(String lugarDeTrabajo) {
        this.lugarDeTrabajo = lugarDeTrabajo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Calendar getDate() {
        return date;
    }

    public void setDate(Calendar date) {
        this.date = date;
        this.date2 = date.getTime();
    }
    
    public String getDateString() {
        SimpleDateFormat format1 = new SimpleDateFormat("dd-MM-yyyy");
        String formatted = format1.format(date.getTime());
        return formatted;
    }

}
