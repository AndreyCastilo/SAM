/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model; //Cambiar

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
/**
 *
 * @author Danel
 */
public class Usuario implements Jsonable{

    String nombre;
    String apellido;
    String cedula;
    String puesto;


    public Usuario(String nombre, String apellido, String cedula, String puesto) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.cedula = cedula;
        this.puesto = puesto;

    }

    public Usuario() {
        this.nombre = "";
        this.apellido = "";
        this.cedula = "";
        this.puesto = "";

    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getCedula() {
        return cedula;
    }

    public void setCedula(String cedula) {
        this.cedula = cedula;
    }



    public String getPuesto() {
        return puesto;
    }

    public void setPuesto(String puesto) {
        this.puesto = puesto;
    }



    public int getTipoUsuario() {
        int aux;
        switch(puesto){
           case "Administradora":
                         aux=2;
                         break;
           case "Encargado de Jefatura":
                         aux=1;
                         break;
           case "Encargado de Mantenimiento":
               aux=3;
               break;
          default:
               aux=1;
        }
        return aux;
    }
    
    

}
