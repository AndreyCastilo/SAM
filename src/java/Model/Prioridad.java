/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Model;

/**
 *
 * @author Danel
 */
public class Prioridad implements Jsonable{

    int codigo;
    String color;
    String descripcion;

    public Prioridad() {
        this.codigo = -1;
        this.color = "";
        this.descripcion = "";
    }

    public Prioridad(int codigo, String color, String descripcion) {
        this.codigo = codigo;
        this.color = color;
        this.descripcion = descripcion;
    }

    public int getCodigo() {
        return codigo;
    }

    public void setCodigo(int codigo) {
        this.codigo = codigo;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

}
