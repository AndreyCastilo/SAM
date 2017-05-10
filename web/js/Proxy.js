class Proxy {
    constructor() {}

    toString() {
        return "Soy el toString";
    }

    static login(usuario, password, callBack) { //PASAR A PROMESAS
        var jsonText = usuario;
        var jsonText2 = password;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=login";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }

        };
        AJAX_req.send("usuario=" + jsonText + "&password=" + jsonText2);
    }
    ;
            static insertarUsuario(user, callBack) {
        var jsonText = JSON.stringify(user);
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=insertaUsuario";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }

        };
        AJAX_req.send("user=" + jsonText);
    }

    static guardarObservacion(obs, callBack) {
        var jsonText = JSON.stringify(obs);
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=guardaObservacion";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }

        };
        AJAX_req.send("observacion=" + jsonText);
    }

    static eliminarUsuario(carnet, callBack) {
        var jsonText = carnet;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=eliminarUsuario";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }

        };
        AJAX_req.send("carnet=" + jsonText);
    }

    static modificarContrasena(carnet, password, callBack) {
        var jsonText = carnet;
        var jsonText2 = password;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=modificarPassword";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }

        };
        AJAX_req.send("carnet=" + jsonText + "&password=" + jsonText2);
    }
    
        static restableceContrasena(cedula, password, callBack) {
        var jsonText = cedula;
        var jsonText2 = password;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=restablecePassword";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }

        };
        AJAX_req.send("cedula=" + jsonText + "&passwordNuevo=" + jsonText2);
    }
   

    static editarUsuario(user, callBack) {
        var jsonText = JSON.stringify(user);
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=editarUsuario";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }

        };
        AJAX_req.send("user=" + jsonText);
    }

    static getUsuariosFiltrados(filtro, callBack) {
        var jsonText;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=buscarUsuariosFiltrados";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }

        };
        AJAX_req.send("filtro=" + filtro);
    }

    static getTodosUsuarios(callBack) {
        var jsonText;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=getUsuarios";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }

        };
        AJAX_req.send();
    }

    static modificarContrasena(password, passwordNuevo, callBack) {
        var jsonText = password;
        var jsonText2 = passwordNuevo;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=modificarPassword";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }
        };
        AJAX_req.send("password=" + jsonText + "&passwordNuevo=" + jsonText2);
    } 

    static logout(callBack) {

        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=logout";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                callBack();
            }
        };
        AJAX_req.send();
    }

    static obtenerSolicitudes(callBack) {
        var jsonText;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=obtenerSolicitudes";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;

                var object = JSON.parse(jsonText);
                callBack(object);
            }
        };
        AJAX_req.send();
    }
    
    
    
    
    
    

    static crearSolicitudMantenimiento(solicitud, callBack) {
        var jsonText = JSON.stringify(solicitud);
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=crearSolicitudMantenimiento";
        AJAX_req.open("POST", url, true);
        ;
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }
        };
        AJAX_req.send("solicitud=" + jsonText);
    }

    static obtenerTodasSolicitudes(callBack) {
        var jsonText;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=obtenerTodasSolicitudes";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }
        };
        AJAX_req.send();
    }
    
        static obtenerTodasSolicitudesPendientes(callBack) {
        var jsonText;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=obtenerTodasSolicitudesPendientes";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }
        };
        AJAX_req.send();
    }
    //PRUEBA
     static obtenerSolicitudesRechazadas(callBack) {
        var jsonText;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=obtenerSolicitudesRechazadas";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }
        };
        AJAX_req.send();
    }


     ///////------------------------NUEVO-----------------------------------------------////   
        ///////--------------------------------------------------------------------------////    


    static obtenerSolicitudesMantenimientoReperadas(callBack) {
        var jsonText;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=obtenerSolicitudesMantenimientoReparadas";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }
        };
        AJAX_req.send();
    }

    static obtenerSolicitudesMantenimientoEnReparcion(callBack) {
        var jsonText;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=obtenerSolicitudesMantenimientoEnReparacion";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }
        };
        AJAX_req.send();
    }

    static obtenerSolicitudesMantenimientoPriorizadas(callBack) {
        var jsonText;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=obtenerSolicitudesMantenimientoPriorizadas";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }
        };
        AJAX_req.send();
    }
     ///////--------------------------------------------------------------------------////    
    ///////--------------------------------------------------------------------------////   
    
    
    static cambioPrioridad(codigo, valor, callBack) {
        var jsonText = codigo;
        var jsonText2 = valor;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=cambioPrioridad";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }

        };
        AJAX_req.send("codigo=" + jsonText + "&valor=" + jsonText2);
    }

    static cambioEstado(codigo, valor, callBack) {
        var jsonText = codigo;
        var jsonText2 = valor;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=cambioEstado";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }

        };
        AJAX_req.send("codigo=" + jsonText + "&valor=" + jsonText2);
    }

    static editarSolicitud(solicitud, callBack) {
        var jsonText = JSON.stringify(solicitud);
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=editarSolicitud";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }

        };
        AJAX_req.send("solicitud=" + jsonText);
    }
    
    
        static obtenerSolicitudPorCodigo(codigo,callBack) {
        var jsonText;
        var AJAX_req = new XMLHttpRequest();
        var url = "/SAM/Servlet?action=obtenerSolicitudPorCodigo";
        AJAX_req.open("POST", url, true);
        AJAX_req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=utf-8");
        AJAX_req.onreadystatechange = function () {
            if (AJAX_req.readyState === 4 && AJAX_req.status === 200) {
                jsonText = AJAX_req.responseText;
                var object = JSON.parse(jsonText);
                callBack(object);
            }
        };
        AJAX_req.send("codigoSolicitud=" + codigo);
    }
    

}


  