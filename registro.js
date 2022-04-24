//Conexion con la base de datos
var db = firebase.firestore();
var storageRef = firebase.storage().ref();
//Variable que controla titulos repetidos
var controlar = true;
var titulos = nombres();
//Variables que controlan el id dinamico de la etiqueta
var contadorIngredientes = 3;
 var contadorPasos = 53;
 var contadorValor = 103;

//Variables para unir los campos como un solo texto
 var ingredienteAñadido = ""
 var pasoAñadido = ""
 var valorAñadido = ""

 //Variable que controla si la imagen se cargo correctamente
 var imgCargada = false;

 //Variable que guarda la categoria escogida
 var nombreColeccion;


 //---------METODOS----------
 //Añadir un nuevo input para agregar otro ingrediente
 function aniadirIngredientes(){
 
     if(contadorIngredientes <= 15){
         const aniadir = document.getElementById("añadir")
         aniadir.insertAdjacentHTML("beforeend",'<input class="ingresoTexto" id="0" placeholder="Ingrese ingrediente" />');
         cambiarIDIngrediente()
         contadorIngredientes+=1;
     }else{
         //No deja que se agregue mas de 15 ingredientes.
         alert("No es posible añadir mas ingredientes.")
     }
 }
 
 //Cambia el id de una etiqueta de ingredientes
 function cambiarIDIngrediente(){
     document.getElementById('0').id = contadorIngredientes;
 }
 
 //Funcion que agarra todos los ingredientes y los une en una sola variable para guardarlo en la BD.
 function juntarIngredientes(){
     var contRegIngre = 1;
     while(contRegIngre != contadorIngredientes){
     var ingrediente = document.getElementById(contRegIngre).value;
     ingredienteAñadido = ingredienteAñadido +"-"+ingrediente+" ";
     contRegIngre += 1
     }
 }


//----------------------------------------------
function eliminarIngrediente(){
    if(contadorIngredientes > 3){
        casilla = document.getElementById(contadorIngredientes-1);	
        casilla.parentNode.removeChild(casilla);
        
        contadorIngredientes--;
        }else{
            alert("No se pueden eliminar mas casillas")
        }
}
//--------------------------------------------------

 //Añade un nuevo input para agregar otro paso
 function aniadirPasos(){
     if(contadorPasos <= 70){
         const preparacion = document.getElementById("preparacion")
         preparacion.insertAdjacentHTML("beforeend",'<input class="ingresoTexto" id="50" placeholder="Ingrese paso" />');
         cambiarIDPreparacion()
         contadorPasos+=1;
     }else{
         //No deja que se agregue mas de 25 pasos.
         alert("No es posible añadir mas pasos.")
     }
 }
 
 //Cambia el id de una etiqueta de pasos
 function cambiarIDPreparacion(){
     document.getElementById('50').id = contadorPasos;
 }

 //Funcion que agarra todos los pasos y los une en una sola variable para guardarlo en la BD.
 function juntarPasos(){
     var contRegPasos = 51;
     while(contRegPasos != contadorPasos){
     var pasosSeguir = document.getElementById(contRegPasos).value;
     pasoAñadido = pasoAñadido+"-"+pasosSeguir+" "
     contRegPasos +=1
     }
 }
 
//----------------------------------------------------
function eliminarPaso(){
    if(contadorPasos > 53){
        casilla = document.getElementById(contadorPasos-1);	
        casilla.parentNode.removeChild(casilla);
        
        contadorPasos--;
    }else{
        alert("No se pueden eliminar mas casillas")
    }
}
//----------------------------------------------------------

 //Añade un nuevo input para agregar mas info. nutricional
 function aniadirValor(){

     if(contadorValor <= 120){
         const valor = document.getElementById("valor")
         valor.insertAdjacentHTML("beforeend",'<input class="ingresoTexto" id="100" placeholder="Ingrese valor nutricional" />');
         cambiarIDValor()
         contadorValor+=1;
     }else{
         //No deja que se agregue mas de 25 campos para informacion nutricional
         alert("No es posible añadir mas informacion nutricional.")
     }
 }
 
 //Cambia el id de una etiqueta para la info. nutricional
 function cambiarIDValor(){
     document.getElementById('100').id = contadorValor;
 }
 

 //Funcion que agarra todos los ingredientes y los une en una sola variable para guardarlo en la BD.
 function juntarValor(){
     var contRegValor = 101;
     while(contRegValor != contadorValor){
     var valorNut = document.getElementById(contRegValor).value;
     valorAñadido = valorAñadido+"-"+valorNut+" "
     contRegValor +=1
     }
 }

//-------------------------------------------------
function eliminarValor(){
    if(contadorValor > 103){
        casilla = document.getElementById(contadorValor-1);	
        casilla.parentNode.removeChild(casilla);
        
        contadorValor--;
    }else{
        alert("No se pueden eliminar mas casillas")
    }
}
//-------------------------------------------------------


//Preview y validacion de la imagen antes de guardarla en la BD
function revisarImagen(img) { 
    document.getElementById("img").src = "";
    document.getElementById("img").width = "";
    document.getElementById("img").height = "";
    var fileUpload = img;
    var reader = new FileReader();
    reader.readAsDataURL(fileUpload.files[0]);
    reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
            var height = this.height;
            var width = this.width;

            if (width.toFixed(0) < 600 && height.toFixed(0) < 600) {
                alert('Tamaño de imagen no permitido');
              } else if (width.toFixed(0) != height.toFixed(0)) {
                alert('Dimensiones distintas');
            }else{
                var archivo = document.getElementById("file").files[0];
                var img = document.getElementById("img");
                    document.getElementById("img").src = reader.result;
                    document.getElementById("img").width = 350;
                    document.getElementById("img").height = 350;
                    imgCargada = true;
                
            }
        };
    }
}

//---------VALIDACIONES------------

//----------VALIDACION RECETAS REPETIDAS----------
console.log(titulos," antes")
function testTitulo(){

    var titulo = document.getElementById("titulo").value;
                console.log(titulos.length)
                for(j=0;j<titulos.length;j++){
                    if(titulo.toLowerCase() == titulos[j].toLowerCase()){
                        console.log(titulo,titulos[j])
                        controlar = false;
                        j=titulos.length+1
                        alert("El título ya esta registrado en la base de datos.")
                    }
                    
                }
                if(controlar==true){
                    registrar();   
                    } 
            }

function nombres(){
    var titulos = [];
    var colecciones = ["Cenas", "Ensaladas", "Jugos"]
    for(i=0;i<colecciones.length;i++){
        db.collection(colecciones[i]).get().then((snapshot)=>{
                snapshot.docs.forEach(doc=>{
                    titulos.push(doc.data().Nombre)
                    });
            });
        }
        console.log(titulos," nombres")
        return titulos
        
}

//-----------------VALIDA CAMPO TITULO VACIO Y CARACTERES ALFABETICOS-----------------

function validacion_titulo(titulo){
    var valido = true;
    var pattern = /^[A-Za-z\s\u002c\u00c1\u00c9\u00cd\u00d3\u00da\u00e1\u00e9\u00ed\u00f3\u00fa\u00d1\u00f1]+$/;//,
    
    if(titulo.match(pattern)){
        return valido
    }
    else{
        if(titulo == ""){
            alert("No se aceptan campos vacios en el nombre.")
            i=contadorIngredientes+1
            valido = false;
        }else{
            alert("Solo se aceptan caracteres alfabeticos y comas en el nombre.")
            ingredienteAñadido = ""
            pasoAñadido = ""
            valorAñadido = ""
            return valido = false;
        }
    }
}

//---------------VALIDA CANTIDAD DE PALABRAS TITULO---------
function contar_palabras_titulo(titulo){
    var controlar = true;
    if(titulo.length < 60){

        
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
        if(numeroPalabras>15){
            alert("la cantidad máxima de palabras aceptadas para el nombre es de 15.");
            return controlar=false;
        }else{
            if(textoTroceado[0] == ""){
                console.log("entro")
                alert("No se permiten solo espacios como nombre");
                controlar=false;
            }
            return controlar;
        }
    }else{
        alert("Cantidad de caracteres superado en el título.")
    }
}

//----------VALIDA CANTIDAD DE PALABRAS INGREDIENTES-------------


//---------VALIDAR PORCIONES----------
function validarPorciones(porcion){
    var valido = false;
    if (isNaN(porcion)==true || porcion<1 || porcion>30) {

        alert ('Porcion no valida.'); 
        return valido=false;
    }else{
        return valido = true;
    }
}

//-----------VALIDAR CAMPOS VACIOS Y CARACTERES ALFANUMERICOS Y ESPECIALES DE INGREDIENTES---------------
function validacion_ingredientes(){
    var valido = true;
    for(i=1; i < contadorIngredientes; i++){
    var ingredienteValido = document.getElementById(i).value
    var pattern = /^[A-Za-z\d\s\u0028\u0029\u0022\u002c\u002e\u002f\u201c\u201d\u0025\u00c1\u00c9\u00cd\u00d3\u00da\u00e1\u00e9\u00ed\u00f3\u00fa\u00d1\u00f1\u00a1\u0021\u00b0]+$/;// ()",./""%¡!°
    
        if(ingredienteValido.match(pattern)){
            valido = true
        }
        else{
            if(ingredienteValido == ""){
                alert("No se aceptan campos vacios en ingredientes.")
                i=contadorIngredientes+1
                return valido = false;
            }else{
                //Tambien acepta ""
                alert("Solo se aceptan caracteres alfanumericos en los ingredientes y los siguientes caracteres especiales: (, ), , , ., /, %,¡,!,°")
                i=contadorIngredientes+1
                valido = false;
             
            }
        }
            //-----CONTROLA CANTIDAD DE PALABRAS EN INGREDIENTES------------
            //Reemplazamos los saltos de linea por espacios
            var texto = ingredienteValido.replace (/\r?\n/g," ");
            //Reemplazamos los espacios seguidos por uno solo
            texto = texto.replace(/\s\s+/g," ");
            //Quitarmos los espacios del principio y del final
            texto = texto.replace (/^ /,"");
            texto = texto.replace (/ $/,"");
            //Troceamos el texto por los espacios
            var textoTroceado = texto.split (" ");
            //Contamos todos los trozos de cadenas que existen
            var numeroPalabras = textoTroceado.length;

            //Mostramos el número de palabras
            if(numeroPalabras>15){
                alert("la cantidad máxima de palabras aceptadas para ingredientes es de 15");
                valido=false;
                i=contadorIngredientes+1
            }else{
                if(numeroPalabras<1){
                    alert("la cantidad mínima de palabras aceptadas para ingredientes es de 1");
                    valido=false;
                    i=contadorIngredientes+1
                }else{
                    if(textoTroceado[0] == ""){
                        alert("No se permiten solo espacios como ingrediente");
                        valido=false;
                        i=contadorIngredientes+1
                    }
                }
        }
    }
    return valido
}

//-----------VALIDAR CAMPOS VACIOS Y CARACTERES ALFANUMERICOS Y ESPECIALES DE PASOS---------------
function validacion_pasos(){
    var valido = true;
    for(i=51; i < contadorPasos; i++){
    var pasoValido = document.getElementById(i).value
    var pattern = /^[A-Za-z\d\s\u0028\u0029\u0022\u002c\u002e\u002f\u201c\u201d\u0025\u00c1\u00c9\u00cd\u00d3\u00da\u00e1\u00e9\u00ed\u00f3\u00fa\u00d1\u00f1\u00a1\u0021\u00b0]+$/;// ()",./""%¡!°
    
        if(pasoValido.match(pattern)){
            valido = true
        }
        else{
            if(pasoValido == ""){
                alert("No se aceptan campos vacios en la preparación.")
                i=contadorPasos+1
                return valido = false;
            }else{
                //Tambien acepta ""
                alert("Solo se aceptan caracteres alfanumericos en los pasos y los siguientes caracteres especiales: (, ), , , ., /, %,¡,!,°")
                i=contadorPasos+1
                valido = false;
            }
        }
        //-----CONTROLA CANTIDAD DE PALABRAS EN PASOS------------
            //Reemplazamos los saltos de linea por espacios
            var texto = pasoValido.replace (/\r?\n/g," ");
            //Reemplazamos los espacios seguidos por uno solo
            texto = texto.replace (/\s\s+/g," ");
            //Quitarmos los espacios del principio y del final
            texto = texto.replace (/^ /,"");
            texto = texto.replace (/ $/,"");
            //Troceamos el texto por los espacios
            var textoTroceado = texto.split (" ");
            //Contamos todos los trozos de cadenas que existen
            var numeroPalabras = textoTroceado.length;
            //Mostramos el número de palabras
            if(numeroPalabras>80){
                alert("la cantidad máxima de palabras aceptadas para pasos es de 80");
                valido=false;
                i=contadorPasos+1
            }else{
                if(textoTroceado[0] == ""){
                        alert("No se permiten solo espacios como un paso");
                        valido=false;
                        i=contadorPasos+1
                }else{
                
                    if(numeroPalabras<3){
                        alert("la cantidad mínima de palabras aceptadas para pasos es de 3");
                        valido=false;
                        i=contadorPasos+1
                    }
                }
            }
     }
return valido
}

//-----------VALIDAR CAMPOS VACIOS Y CARACTERES ALFANUMERICOS Y ESPECIALES DE INFO. NUTRICIONAL---------------
function validacion_val_nutricional(){
    var valido = true;
    for(i=101; i < contadorValor; i++){
    var valorValido = document.getElementById(i).value
    var pattern = /^[A-Za-z\d\s\u0028\u0029\u0022\u002c\u002e\u002f\u201c\u201d\u0025\u00c1\u00c9\u00cd\u00d3\u00da\u00e1\u00e9\u00ed\u00f3\u00fa\u00d1\u00f1\u00a1\u0021\u00b0]+$/;// ()",./""%¡!°
    
        if(valorValido.match(pattern)){
            valido = true
        }
        else{
            if(valorValido == ""){
                alert("No se aceptan campos vacios en la información nutricional.")
                i=contadorValor+1
                return valido = false;
            }else{
                //Tambien acepta ""
                alert("Solo se aceptan caracteres alfanumericos en la informacion nutricional y los siguientes caracteres especiales: (, ), , , ., /, %,¡,!,°")
                i=contadorValor+1
                valido = false;
            }
        }
        //-----CONTROLA CANTIDAD DE PALABRAS EN INFO. NUTRICIONAL------------
            //Reemplazamos los saltos de linea por espacios
            var texto = valorValido.replace (/\r?\n/g," ");
            //Reemplazamos los espacios seguidos por uno solo
            texto = texto.replace (/\s\s+/g," ");
            //Quitarmos los espacios del principio y del final
            texto = texto.replace (/^ /,"");
            texto = texto.replace (/ $/,"");
            //Troceamos el texto por los espacios
            var textoTroceado = texto.split (" ");
            //Contamos todos los trozos de cadenas que existen
            var numeroPalabras = textoTroceado.length;
            //Mostramos el número de palabras
            if(numeroPalabras>5){
                alert("la cantidad máxima de palabras aceptadas para info. nutricional es de 5");
                valido=false;
                i=contadorValor+1
            }else{
                if(textoTroceado[0] == ""){
                    alert("No se permiten solo espacios como valor nutricional");
                    valido=false;
                    i=contadorValor+1
                }else{
                    if(numeroPalabras<2){
                        alert("la cantidad mínima de palabras aceptadas para info. nutricional es de 2");
                        valido=false;
                        i=contadorValor+1
                    }
                
                }
            }
   
    }
 return valido
}

//---------VERIFICA QUE EL CAMPO CATEGORIA NO ESTE DESMARCADO----------
function verificarEspacioCateg(){ 
    var col=document.getElementsByName('categoria');
    for(i=0; i<col.length; i++){
        if(col[i].checked){
           nombreColeccion=col[i].value;
        }
    }
}

function validarImgCat(){
    String(verificarEspacioCateg());
    if (typeof nombreColeccion === "undefined"){
        alert("Categoria se encuentra vacío");
        //tituloAniadido = ""
        //porcionAniadido = ""
        ingredienteAñadido = ""
        pasoAñadido = ""
        valorAñadido = ""
    }else if (imgCargada){
       //aqui es posible guardar en la BD
       subirImagen(nombreColeccion);
    }else{
        alert ("Es necesario subir una imagen")
        ingredienteAñadido = ""
        pasoAñadido = ""
        valorAñadido = ""
    }
}

function subirImagen(carpeta){
    var imagenASubir = file.files[0];
    var uploadTask= storageRef.child(carpeta + '/' + imagenASubir.name).put(imagenASubir);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
        console.log("cargando")
        document.getElementById("botonReg").disabled = "true"
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
       /* var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }*/
    },
    (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
        case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
        case 'storage/canceled':
            // User canceled the upload
            break;
        case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
    },
    () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        console.log('File available at', downloadURL);
        registarReceta(downloadURL, carpeta);
        });
    }
    );
}


function registrar(){
     //PARA REGISTRAR TITULO Y PORCIONES
     var tituloAniadido = document.getElementById("titulo").value;
     var porcionAniadido = document.getElementById("porciones").value;
     //Cambio de tipo string a numero del dato porciones
     porcionAniadido = parseInt(porcionAniadido,10)
 
     
     if(controlar == true){
      if( validacion_titulo(tituloAniadido) == true  &&
      contar_palabras_titulo(tituloAniadido) == true &&
             validarPorciones(porcionAniadido) == true && validacion_ingredientes() == true  && 
             validacion_pasos() == true && validacion_val_nutricional() == true){
                
                juntarIngredientes()
                juntarPasos()
                juntarValor() 

                validarImgCat()

                    
                 }else{
                     tituloAniadido = ""
                     porcionAniadido = ""
                     ingredienteAñadido = ""
                     pasoAñadido = ""
                     valorAñadido = ""
                 }
             }else{
                 controlar=true;
                 alert("La receta ya se encuentra registrada en la base de datos.")
                     tituloAniadido = ""
                     porcionAniadido = ""
                     ingredienteAñadido = ""
                     pasoAñadido = ""
                     valorAñadido = ""
             }
 }


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
 //e restauro todo