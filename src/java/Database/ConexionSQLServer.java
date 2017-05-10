/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Database;

import java.sql.Connection;
import java.sql.DriverManager;

/**
 *
 * @author Danel
 */
public class ConexionSQLServer {

    public Connection conectarSQLA() {
        Connection cn = null;
        try {
            //String userName = "SIMA";
            //String password = "SIMA2016UNA";
            //String url = "jdbc:sqlserver://MEDASSRHBDD04;databaseName=BD_SIMA";
            String userName = "Andrey";
            String password = "123456";
            
            String url = "jdbc:sqlserver://USER\\SQLEXPRESS;databaseName=Clinica";

            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            cn = DriverManager.getConnection(url, userName, password);
        } catch (Exception ex) {
            System.out.println("Error: " + ex.getMessage());
        }
        return cn;


    }

    public Connection conectarSQLWindows() {
        Connection cn = null;
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            cn = DriverManager.getConnection("jdbc:sqlserver://USER\\SQLEXPRESS;databaseName=Clinica;integratedSecurity=true;");
        } catch (Exception ex) {
            System.out.println("Error: " + ex.getMessage());
        }
        return cn;
    }
}
