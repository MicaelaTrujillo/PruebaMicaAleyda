
 function registarReceta(url, coleccion){
     //Variables que recuperan el titulo y la porcion
    var tituloAniadido = document.getElementById("titulo").value;
    var porcionAniadido = document.getElementById("porciones").value;

    //Cambio de tipo string a numero del dato porciones
    porcionAniadido = parseInt(porcionAniadido,10)

   // Añadir datos a los campos de la BD
    db.collection(coleccion).add({
        Titulo: tituloAniadido,
        Porciones: porcionAniadido,
        Ingredientes: ingredienteAñadido,
        Preparacion: pasoAñadido,
        ValorNutricional: valorAñadido,
        Imagen: url
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        alert("Se realizo el registro correctamente!!!")
        location. reload()
        //location='registro.html'
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}