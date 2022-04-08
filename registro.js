firebase.initializeApp({
    apiKey: "AIzaSyBG05vjrZ38Tm2CR7bfymcr0I1ZieYGcLQ",
    authDomain: "h-soul.firebaseapp.com",
    projectId: "h-soul",
    storageBucket: "h-soul.appspot.com",
    messagingSenderId: "943717581825",
    appId: "1:943717581825:web:e65c184c57df434c4aec00",
    measurementId: "G-0YHT5L17JW"
  });
  
  var db = firebase.firestore();


  //PARA REGISTRAR INGREDIENTES
var contadorIngredientes = 3;
//añade un nuevo input para agregar otro ingrediente
function aniadirIngredientes(){

//    const cantidad = document.getElementById("cantidad").value

//for(i=1; i <= cantidad; i++){
    const aniadir = document.getElementById("añadir")
    aniadir.insertAdjacentHTML("beforeend",'<input id="0" placeholder="Ingrese ingrediente" /> <br/>');
   // aniadir.innerHTML += '<input id="0" placeholder="Ingrese ingrediente"/> <br/>';
    cambiarIDIngrediente()
    contadorIngredientes+=1;
//}
}


//Cambia el id de una etiqueta
function cambiarIDIngrediente(){
    document.getElementById('0').id = contadorIngredientes;
}

var ingredienteAñadido = ""
//Funcion que agarra todos los ingredientes y los une en una sola variable para guardarlo en la BD.
function juntarIngredientes(){
    var contRegIngre = 1;
   // var ingredienteAñadido = ""
    while(contRegIngre != contadorIngredientes){
    var ingrediente = document.getElementById(contRegIngre).value;
    ingredienteAñadido = ingredienteAñadido+"-"+ingrediente+" "
    document.getElementById(contRegIngre).value = "";
    contRegIngre +=1
    }
}


//PARA REGISTRAR PREPARACION
var contadorPasos = 53;
//añade un nuevo input para agregar otro ingrediente
function aniadirPasos(){

//    const cantidad = document.getElementById("cantidad").value

//for(i=1; i <= cantidad; i++){
    const preparacion = document.getElementById("preparacion")
    preparacion.insertAdjacentHTML("beforeend",'<input id="50" placeholder="Ingrese paso" /> <br/>');
   // preparacion.innerHTML += '<input id="50" placeholder="Ingrese paso"/> <br/>';
    cambiarIDPreparacion()
    contadorPasos+=1;
//}
}


//Cambia el id de una etiqueta
function cambiarIDPreparacion(){
    document.getElementById('50').id = contadorPasos;
}

var pasoAñadido = ""
//Funcion que agarra todos los ingredientes y los une en una sola variable para guardarlo en la BD.
function juntarPasos(){
    var contRegPasos = 51;
   // var ingredienteAñadido = ""
    while(contRegPasos != contadorPasos){
    var pasosSeguir = document.getElementById(contRegPasos).value;
    pasoAñadido = pasoAñadido+"-"+pasosSeguir+" "
    document.getElementById(contRegPasos).value = "";
    contRegPasos +=1
    }
}


//PARA REGISTRAR VALOR NUTRICIONAL
var contadorValor = 103;
//añade un nuevo input para agregar otro ingrediente
function aniadirValor(){

//    const cantidad = document.getElementById("cantidad").value

//for(i=1; i <= cantidad; i++){
    const valor = document.getElementById("valor")
    valor.insertAdjacentHTML("beforeend",'<input id="100" placeholder="Ingrese valor nutricional" /> <br/>');
   // valor.innerHTML += '<input id="100" placeholder="Ingrese valor nutricional" /> <br/>';
    cambiarIDValor()
    contadorValor+=1;
//}
}


//Cambia el id de una etiqueta
function cambiarIDValor(){
    document.getElementById('100').id = contadorValor;
}

var valorAñadido = ""
//Funcion que agarra todos los ingredientes y los une en una sola variable para guardarlo en la BD.
function juntarValor(){
    var contRegValor = 101;
   // var ingredienteAñadido = ""
    while(contRegValor != contadorValor){
    var valorNut = document.getElementById(contRegValor).value;
    valorAñadido = valorAñadido+"-"+valorNut+" "
    document.getElementById(contRegValor).value = "";
    contRegValor +=1
    }
}

function validarPorciones(porcion){
    var valido = false;
    if (isNaN(porcion)==true || porcion<1 || porcion>30) {

        alert ('Porcion no valida'); 
        return valido=false;
    }else{
        alert ('Porcion valida'); 
        return valido = true;
    }
}

function registrar(){
    //PARA REGISTRAR TITULO Y PORCIONES
    var tituloAniadido = document.getElementById("titulo").value;
    var porcionAniadido = document.getElementById("porciones").value;
    //Cambio de tipo string a numero del dato porciones
    porcionAniadido = parseInt(porcionAniadido,10)

    juntarIngredientes()
    juntarPasos()
    juntarValor()
    
    document.getElementById("titulo").value = "";
    document.getElementById("porciones").value = "";

    if(validoPorcion = validarPorciones(porcionAniadido) == true){
        
    // Añadir dato al campo ingredientes
    db.collection("usuario").add({
        Titulo: tituloAniadido,
        Porciones: porcionAniadido,
        Ingredientes: ingredienteAñadido,
        Preparacion: pasoAñadido,
        ValorNutricional: valorAñadido
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}
}
