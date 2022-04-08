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
    if(contadorIngredientes <= 15){
        const aniadir = document.getElementById("añadir")
        aniadir.insertAdjacentHTML("beforeend",'<input class="ingresoTexto" id="0" placeholder="Ingrese ingrediente" /> <br/>');
    // aniadir.innerHTML += '<input id="0" placeholder="Ingrese ingrediente"/> <br/>';
        cambiarIDIngrediente()
        contadorIngredientes+=1;
    }else{
        //No deja que se agregue mas de 15 ingredientes.
        alert("No es posible añadir mas ingredientes.")
    }
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
    ingredienteAñadido = ingredienteAñadido +"-"+ingrediente+" ";
   // document.getElementById(contRegIngre).value = "";
    contRegIngre += 1
    }
}


//PARA REGISTRAR PREPARACION
var contadorPasos = 53;
//añade un nuevo input para agregar otro ingrediente
function aniadirPasos(){

//    const cantidad = document.getElementById("cantidad").value

//for(i=1; i <= cantidad; i++){
    if(contadorPasos <= 75){
        const preparacion = document.getElementById("preparacion")
        preparacion.insertAdjacentHTML("beforeend",'<input class="ingresoTexto" id="50" placeholder="Ingrese paso" /> <br/>');
    // preparacion.innerHTML += '<input id="50" placeholder="Ingrese paso"/> <br/>';
        cambiarIDPreparacion()
        contadorPasos+=1;
    }else{
        //No deja que se agregue mas de 15 pasos.
        alert("No es posible añadir mas pasos.")
    }
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
    //document.getElementById(contRegPasos).value = "";
    contRegPasos +=1
    }
}


//PARA REGISTRAR VALOR NUTRICIONAL
var contadorValor = 103;
//añade un nuevo input para agregar otro ingrediente
function aniadirValor(){

//    const cantidad = document.getElementById("cantidad").value

//for(i=1; i <= cantidad; i++){
    if(contadorValor <= 125){
        const valor = document.getElementById("valor")
        valor.insertAdjacentHTML("beforeend",'<input class="ingresoTexto" id="100" placeholder="Ingrese valor nutricional" /> <br/>');
    // valor.innerHTML += '<input id="100" placeholder="Ingrese valor nutricional" /> <br/>';
        cambiarIDValor()
        contadorValor+=1;
    }else{
        //No deja que se agregue mas de 25 campos para informacion nutricional
        alert("No es posible añadir mas informacion nutricional.")
    }
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
    //document.getElementById(contRegValor).value = "";
    contRegValor +=1
    }
}

//--------------VALIDACIONES-------------

//-----------------VALIDAR TITULO-----------------

function validacion_titulo(titulo){
    var valido = true;
    //var titulo = document.getElementById("titulobox").value;
    //var text1 = document.getElementById("text1");
    var pattern = /^[A-Za-z\s]+$/;
    
    if(titulo.match(pattern)){
        //text1.innerHTML = "";
        return valido
    }
    else{
        if(titulo == ""){
            alert("No se aceptan campos vacios en el título.")
            i=contadorIngredientes+1
            valido = false;
        }else{
            //text1.innerHTML = "Se aceptan caracteres alfanuméricos, ¿,?,!,¡";
            alert("Solo se aceptan caracteres alfabeticos en el titulo.")
            return valido = false;
        }
    }
}


//---------------CANTIDAD DE PALABRAS TITULO---------
function contar_palabras_titulo(titulo){
    var controlar = true;
    //Obtenemos el texto del campo
   // var titulo = document.getElementById("titulo").value;
    //Reemplazamos los saltos de linea por espacios
    titulo = titulo.replace (/\r?\n/g," ");
    //Reemplazamos los espacios seguidos por uno solo
    titulo = titulo.replace (/[ ]+/g," ");
    //Quitarmos los espacios del principio y del final
    titulo = titulo.replace (/^ /,"");
    titulo = titulo.replace (/ $/,"");
    //Troceamos el texto por los espacios
    var textoTroceado = titulo.split (" ");
    //Contamos todos los trozos de cadenas que existen
    var numeroPalabras = textoTroceado.length;
    //Mostramos el número de palabras
    if(numeroPalabras>10){
        //text2.innerHTML = "La cantidad máxima de palabras aceptadas es de 2";
        
        alert("la cantidad máxima de palabras aceptadas es de 10.");
        return controlar=false;
    }else{
        return controlar;
    }
    //alert(numeroPalabras);
}

//---------VALIDAR PORCIONES----------
function validarPorciones(porcion){
    var valido = false;
    if (isNaN(porcion)==true || porcion<1 || porcion>30) {

        alert ('Porcion no valida.'); 
        return valido=false;
    }else{
        //alert ('Porcion valida'); 
        return valido = true;
    }
}

//-----------VALIDAR INGREDIENTES---------------
function validacion_ingredientes(){
    var valido = true;
    //var numIngrediente = 1
    for(i=1; i < contadorIngredientes; i++){
    var ingredienteValido = document.getElementById(i).value
    var pattern = /^[A-Za-z\d\s\u0028\u0029\u0022\u002c\u002e\u002f\u201c\u201d\u0025]+$/;// ()",./""%
    
        if(ingredienteValido.match(pattern)){
            //text1.innerHTML = "";
            valido = true
        }
        else{
            if(ingredienteValido == ""){
                alert("No se aceptan campos vacios en ingredientes.")
                i=contadorIngredientes+1
                valido = false;
            }else{
                //text1.innerHTML = "Se aceptan caracteres alfanuméricos, ¿,?,!,¡";
                alert("Solo se aceptan caracteres alfanumericos en los ingredientes y los siguientes caracteres especiales: (, ), , , ., /, %")
                i=contadorIngredientes+1
                //Para que no se registre doble si esta mal
                //ingredienteAñadido = ""
                valido = false;
            }
        }
    }
return valido
}

//-----------VALIDAR PASOS---------------
function validacion_pasos(){
    var valido = true;
    //var numIngrediente = 1
    for(i=51; i < contadorPasos; i++){
    var pasoValido = document.getElementById(i).value
    var pattern = /^[A-Za-z\d\s\u0028\u0029\u0022\u002c\u002e\u002f\u201c\u201d\u0025]+$/;// ()",./""%
    
        if(pasoValido.match(pattern)){
            //text1.innerHTML = "";
            valido = true
        }
        else{
            if(pasoValido == ""){
                alert("No se aceptan campos vacios en la preparación.")
                i=contadorPasos+1
                valido = false;
            }else{
                //text1.innerHTML = "Se aceptan caracteres alfanuméricos, ¿,?,!,¡";
                alert("Solo se aceptan caracteres alfanumericos en los pasos y los siguientes caracteres especiales: (, ), , , ., /, %")
                i=contadorPasos+1
                //Para que no se registre doble si esta mal
                //ingredienteAñadido = ""
                valido = false;
            }
        }
    }
return valido
}

//-----------VALIDAR VALOR NUTRICIONAL-----------
function validacion_val_nutricional(){
    var valido = true;
    //var numIngrediente = 1
    for(i=101; i < contadorValor; i++){
    var valorValido = document.getElementById(i).value
    var pattern = /^[A-Za-z\d\s\u0028\u0029\u0022\u002c\u002e\u002f\u201c\u201d\u0025]+$/;// ()",./""%
    
        if(valorValido.match(pattern)){
            //text1.innerHTML = "";
            valido = true
        }
        else{
            if(valorValido == ""){
                alert("No se aceptan campos vacios en la información nutricional.")
                i=contadorValor+1
                valido = false;
            }else{
                //text1.innerHTML = "Se aceptan caracteres alfanuméricos, ¿,?,!,¡";
                alert("Solo se aceptan caracteres alfanumericos en la informacion nutricional y los siguientes caracteres especiales: (, ), , , ., /, %")
                i=contadorValor+1
                //Para que no se registre doble si esta mal
                //ingredienteAñadido = ""
                valido = false;
            }
        }
    }
return valido
}

//--------------TITULO REPETIDO-------
var controlar = true;
    function testTitulo(){
        return new Promise((resolve,reject)=>{
            var titulo = document.getElementById("titulo").value;
                db.collection('usuario').get().then((snapshot)=>{
                    snapshot.docs.forEach(doc=>{
                        if(titulo == doc.data().Titulo){
                            controlar = false;
                            //console.log("receta repetida")
                            //console.log(controlar);
                        }
                    }
                    );
                   // console.log(controlar,"reg")
                    registrar();
            setTimeout(()=>{
                console.log("Hello from inside the testAsync function");
                resolve();
                ;} , 5000);
            });
    });
        
}


//-------------REGISTRAR RECETA------------
function registrar(){
   // testTitulo();
    //PARA REGISTRAR TITULO Y PORCIONES
    var tituloAniadido = document.getElementById("titulo").value;
    var porcionAniadido = document.getElementById("porciones").value;
    //Cambio de tipo string a numero del dato porciones
    porcionAniadido = parseInt(porcionAniadido,10)

    juntarIngredientes()
    juntarPasos()
    juntarValor()
    
    //document.getElementById("titulo").value = "";
    //document.getElementById("porciones").value = "";
    
    if(controlar == true){
     if( contar_palabras_titulo(tituloAniadido) == true &&
            validacion_titulo(tituloAniadido) == true  &&
            validarPorciones(porcionAniadido) == true && validacion_ingredientes() == true  && 
            validacion_pasos() == true && validacion_val_nutricional() == true){
                
                
                // Añadir dato a los campos
                    db.collection("usuario").add({
                        Titulo: tituloAniadido,
                        Porciones: porcionAniadido,
                        Ingredientes: ingredienteAñadido,
                        Preparacion: pasoAñadido,
                        ValorNutricional: valorAñadido
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
                   
                }else{
                    tituloAniadido = ""
                    porcionAniadido = ""
                    ingredienteAñadido = ""
                    pasoAñadido = ""
                    valorAñadido = ""
                }
            }else{
                controlar=true;
                //console.log(controlar,"final")
                alert("La receta ya se encuentra registrada en la base de datos.")
                    tituloAniadido = ""
                    porcionAniadido = ""
                    ingredienteAñadido = ""
                    pasoAñadido = ""
                    valorAñadido = ""
            }
}