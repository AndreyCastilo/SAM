/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

import java.io.Serializable;
import java.util.Calendar;
import java.util.Date;

/**
 *
 * @author Danel
 */
public class Administradora extends Usuario implements Serializable,Jsonable{
    
    public Administradora(String nombre, String apellido, String cedula,String puesto) {
        super(nombre, apellido, cedula,puesto);
    } 
}
