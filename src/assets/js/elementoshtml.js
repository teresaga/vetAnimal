function controlarTareas($scope) {

    //array que guarda las tareas
    $scope.saledetails = [];

    //Modelo que permite agregar tareas
    $scope.agregarTarea = function () {
    //Verificamos que el campo input no este vacio.
     if ($scope.busquedaProducto != null)
     // agregamos el elemento a nuestro array
         $scope.saledetails.push({product: $scope.busquedaProducto});
     // Limpiamos el input
     console.log($scope.busquedaProducto);
        $scope.busquedaProducto = null;
    };


    // Modelo que permite eliminar tarea
    $scope.eliminarTarea = function (dato) {
        // Al modelo le hemos pasado "dato" que es el texto que contiene el elemento donde se hizo "click"
        // guardamos en la variable pos el index del array que tiene el texto que hemos recogido del elemento donde se hizo click
        var pos = $scope.tareas.indexOf(dato);
        // removemos del array tareas el indice que guarda al elemento donde se hizo click
        $scope.tareas.splice(pos);
    }

}