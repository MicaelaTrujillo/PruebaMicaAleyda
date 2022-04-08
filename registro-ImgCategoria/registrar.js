var storageRef = firebase.storage().ref();
var fichero;
var nombreColeccion;
var imgCargada = false;

function guardar (){
    String(verificarEspacioCateg());
    if (typeof nombreColeccion === "undefined"){
        alert("Categoria se encuentra vacío");
    }else if (imgCargada){
       //aqui es posible guardar en la BD
       subirImagen(nombreColeccion);
    }else{
        alert ("Es necesario subir una imagen")
    }
}

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
                alert('Dimensiones de imagen distintas');
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

function verificarEspacioCateg(){ 
    var col=document.getElementsByName('categoria');
    for(i=0; i<col.length; i++){
        if(col[i].checked){
           nombreColeccion=col[i].value;
        }
    }
}

function subirImagen(carpeta){
    var imagenASubir = file.files[0];
    var uploadTask= storageRef.child(carpeta + '/' + imagenASubir.name).put(imagenASubir);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
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

function registarReceta(url, coleccion){
    db.collection(coleccion).add({
        nombre: "Pollo con macarrones",
        Ingredientes: "1. pollo 2. macarrones",
        Preparacion: "1. cocinar macarrones 2. freir pollo",
        Imagen: url
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
}