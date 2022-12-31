function loadimage(){
  let zoom = document.getElementById("zoom");

    zoom.classList.add("figure");

}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

function animarForm(){
  // Obtenemos los elementos input y text area del formulario
  let inputAndTextArea = document.querySelectorAll("form > input, textarea");
  console.log(inputAndTextArea);

  //Si nombre está vacio
  inputAndTextArea.forEach(element => {
    let nombre = document.getElementById("nombre");
    if(element == nombre){
      if(element.value == ""){
        console.log(element);
    // Agregamos las clases form-error, animate__animated y animate__shakeX al input
        element.classList.add("form-error", "animate__animated", "animate__shakeX");
    // Al acabar la animación, quitamos las clases animate__animated y animate__shakeX al input
        element.addEventListener("animationend",  function (){
          element.classList.remove("animate__animated", "animate__shakeX");
        });
      }

  //Si el nombre no está vacío
      else{
      //Quitamos la clase form-error al input
        element.classList.remove("form-error");
      }
    }
  //Repetir proceso anterior para el correo
  let correo = document.getElementById("correo");
    if(element == correo){
      if(element.value == ""){
        console.log(element);
    // Agregamos las clases form-error, animate__animated y animate__shakeX al input
        element.classList.add("form-error", "animate__animated", "animate__shakeX");
    // Al acabar la animación, quitamos las clases animate__animated y animate__shakeX al input
        element.addEventListener("animationend",  function (){
          element.classList.remove("animate__animated", "animate__shakeX");
        });
      }

  //Si el nombre no está vacío
      else{
      //Quitamos la clase form-error al input
        element.classList.remove("form-error");
      }
    }
    //Repetir proceso anterior para el mensaje
    let mensaje = document.getElementById("mensaje");
    if(element == mensaje){
      if(element.value == ""){
        console.log(element);
    // Agregamos las clases form-error, animate__animated y animate__shakeX al input
        element.classList.add("form-error", "animate__animated", "animate__shakeX");
    // Al acabar la animación, quitamos las clases animate__animated y animate__shakeX al input
        element.addEventListener("animationend",  function(){
          element.classList.remove("animate__animated", "animate__shakeX");
        });
      }

  //Si el nombre no está vacío
      else{
      //Quitamos la clase form-error al input
        element.classList.remove("form-error");
      }
    }

  });
}
