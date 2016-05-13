angular.module('app.controllers', [])

.controller('loginCtrl', function ($scope, UsuarioService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.login = function () {
        UsuarioService.loginUser($scope.data.email, $scope.data.password).success(function (data) {
            localStorage.setItem("autorizado", true);

            $state.go('eventos');
        }).error(function (data) {
            localStorage.setItem("autorizado", false);

            var alertPopup = $ionicPopup.alert({
                title: '¡Datos incorrectos!',
                template: 'Por favor, verifica que los datos ingresados sean correctos.'
            });
        });
    };

    $scope.registrarse = function () {
        $state.go('registro');
    };
})

.controller('registroCtrl', function ($scope, $http, UsuarioService) {
    $scope.data = {};

    $scope.registro = function () {
        UsuarioService.registro($scope.data.nombre, $scope.data.apellido,
            $scope.data.email, $scope.data.contrasenia).then(function (data) {
            alert("Registro exitoso")
        });
    };
})

.controller('eventosCtrl', function ($scope, $state, EventoService, UsuarioService) {
    $scope.listCanSwipe = true

    EventoService.getEventos().then(function (eventos) {
        $scope.eventos = eventos;
    });

    $scope.getEvento = function (idEvento) {
        EventoService.getEvento(idEvento).then(function (evento) {
            $state.go('evento', {idEvento: idEvento});
        })
    };
})

.controller('cursosCtrl', function ($scope, $stateParams, EventoService, CursoService, InscripcionService,
                                    UsuarioService, $ionicPopup) {
    EventoService.getEvento($stateParams.idEvento).then(function (evento) {
        $scope.evento = evento;
    });

    CursoService.getCursos($stateParams.idEvento).then(function (cursos) {
        $scope.cursos = cursos;
    });

    $scope.inscripcionACurso = function (idCurso) {
        var estaInscrito;
        InscripcionService.estaInscrito(1, idCurso).then(function (estaInscrito) {
            if (!estaInscrito) {
                InscripcionService.inscripcion(idCurso).then(function (data) {
                    if (!data.error) {
                        CursoService.getCurso(idCurso).then(function (curso) {
                            var alertPopup = $ionicPopup.alert({
                                title: '¡Felicitaciones!',
                                template: 'Se inscribió al curso ' + curso.nombre + ' con éxito. <br><b>Dia y hora:</b> ' +
                                curso.dia_hora,
                            });
                        });
                    }
                    else {
                        var alertPopup = $ionicPopup.alert({
                            title: '¡Error!',
                            template: 'Ha ocurrido un error al intentar inscribirse al curso, por favor, intente mas tarde.'
                        });
                    }
                });
            }
            else {
                CursoService.getCurso(idCurso).then(function (curso) {
                    var alertPopup = $ionicPopup.alert({
                        title: '¡Atencion!',
                        template: 'Ya está inscrito al curso. <br><b>Dia y hora:</b> ' + curso.dia_hora,
                    });
                });
            }
        });
    };
})
