angular.module('app.services', [])

.service('UsuarioService', function ($q, $http) {
    return {
        loginUser: function (email, password) {
            var deferred = $q.defer();
            var promise = deferred.promise;

            if (email == 'email@email.com' && password == 'secret') {
                deferred.resolve('¡Bienvenido!');
            } else {
                deferred.reject('Credenciales inválidas.');
            }
            promise.success = function (fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function (fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        },
        registro: function (nombre, apellido, email, contrasenia) {
            return $http.post('http://emiapi.esy.es/usuarios/nuevo', {
                nombre: nombre, apellido: apellido,
                email: email, contrasenia: contrasenia
            }).then(function (response) {
                return response.data;
            });
            ;
        },
        estaAutenticado: function () {
            if (localStorage.getItem("autorizado") === "true") {
                return true;
            } else {
                return false;
            }
        }
    }
})

.service('EventoService', function ($http) {
    var BASE_URL = "http://emiapi.esy.es/eventos/";
    var eventos = [];

    return {
        getEventos: function () {
            return $http.get(BASE_URL + 'todos').then(function (response) {
                eventos = response.data.eventos;
                return eventos;
            });
        },
        getEvento: function ($id) {
            return $http.get(BASE_URL + $id).then(function (response) {
                evento = response.data.evento[0];
                return evento;
            });
        }
    }
})

.service('CursoService', function ($http) {
    var BASE_URL = "http://emiapi.esy.es/";
    var cursos = [];

    return {
        getCursos: function (idEvento) {
            return $http.get(BASE_URL + 'eventos/cursos/' + idEvento).then(function (response) {
                cursos = response.data.cursos;
                return cursos;
            });
        },
        getCurso: function ($id) {
            return $http.get(BASE_URL + 'cursos/' + $id).then(function (response) {
                curso = response.data.curso[0];
                return curso;
            });
        }
    }
})

.service('InscripcionService', function ($http) {
    var BASE_URL = "http://emiapi.esy.es/inscripciones/";

    return {
        inscripcion: function (idCurso) {
            return $http.get(BASE_URL + '1/ ' + idCurso).then(function (response) {
                var data = response.data;
                return data;
            });
        },
        estaInscrito: function ($idUsuario, $idCurso) {
            return $http.get(BASE_URL + $idUsuario).then(function (response) {
                var cursos = response.data.cursos;

                var yaEstaInscrito = false;

                angular.forEach(cursos, function (value, key) {
                    if (value.Cursos_id == $idCurso) {
                        yaEstaInscrito = true;
                    }
                });

                return yaEstaInscrito;
            });
        }
    }
});