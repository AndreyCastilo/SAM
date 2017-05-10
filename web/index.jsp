<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <%@ include file="imports.jspf" %>
        <link href="css/main.css" rel="stylesheet">
        <title>Login</title>
    </head>
    <body class="white" >
        <div id="wrapper">

            <!-- Navigation -->
            <nav class="navbar navbar-custom navbar-static-top" role="navigation" style="margin-bottom: 0">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand">Sistema Administración de Mantenimiento</a>
                </div>
            </nav>

            <div id="inicioSesion" >
               
                <h2>Inicio de Sesión</h2>
                <div class="form-group row">
                    <label for="usuarioLogin" class="col-md-2 col-form-label">Usuario</label>
                    <div class="col-md-10">
                        <input class="form-control" type="text" value="" id="usuarioLogin">
                    </div>
                </div>
                <div class="form-group row">
                    <label for="passwordLogin" class="col-md-2 col-form-label">Contraseña</label>
                    <div class="col-md-10">
                        <input class="form-control" type="password" value="" id="passwordLogin">
                    </div>
                </div>
                <div id="labelErrorLogin" class="labelError"></div>
                <button onclick="login();" class="btn btn-primary" id="botonLogin" >Entrar</button>
            </div>
             <div id="loading" class="loader">
                </div>
        </div>
        <%@ include file="importsJS.jspf" %>       
        <script src="js/login.js"></script>  

    </body>
</html>
