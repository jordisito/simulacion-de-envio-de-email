// variables
const correo = document.getElementById('correo');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const enviarBtn = document.getElementById('enviar');
const correoForm = document.getElementById('Correo-form');
const resetBtn = document.getElementById('reset');

// event listener

eventListener();

function eventListener() {
    // inicio de la aplicacion y desabilitar submit
    document.addEventListener('DOMContentLoaded', iniciarProyecto);
    // campos del formulario
    correo.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    // enviar formulario
    correoForm.addEventListener('submit', enviarFormulario);

    // reset formulario
    resetBtn.addEventListener('click', resetFormulario);
}

// funciones

function iniciarProyecto() {
    // desabilita el envio
    enviarBtn.disabled = true;
}

// valida que el campo tenga algo escrito
function validarCampo() {
    validarLongitud(this);

    // validar solo email
    if (this.type === 'email') {
        validarEmail(this);
    }

    let errores = document.querySelectorAll('.error');

    if (correo.value !== '' && asunto.value !== '' && mensaje.value !== '') {
        if (errores.length === 0) {
            enviarBtn.disabled = false;
        } else {
            enviarBtn.disabled = true;
        }
    }
}

// reset formulario
function resetFormulario(e) {
    e.preventDefault();
    //correoForm.reset();
    limpiarCampos();
}

// enviamos el formulario
function enviarFormulario(e) {
    e.preventDefault();

    let loader = document.getElementById('loader');
    loader.style.display = 'block';

    let enviado = document.createElement('img');
    enviado.src = './images/enviar.gif';
    enviado.style.display = 'block';

    setTimeout(() => {
        loader.style.display = 'none';

        let correoLoader = document.querySelector('.Correo-loader');
        correoLoader.appendChild(enviado);

        setTimeout(function() {
            enviado.remove();
            //correoForm.reset();
            limpiarCampos();
        }, 4000);
    }, 3000);
}

// valida que todos los campos no esten vacios
function validarLongitud(campo) {
    console.log(campo.value.length);
    if (campo.value.length > 0) {
        campo.style.border = 'green';
        campo.style.borderWidth = '1px';
        campo.style.borderStyle = 'solid';
        campo.classList.remove('error');
    } else {
        campo.style.border = 'red';
        campo.style.borderWidth = '1px';
        campo.style.borderStyle = 'solid';
        campo.classList.add('error');
    }
}

function validarEmail(campo) {
    // valida el email si tiene un @ y termina en .com
    if (campo.value.includes('@') && campo.value.endsWith('.com')) {
        campo.style.border = 'green';
        campo.style.borderWidth = '1px';
        campo.style.borderStyle = 'solid';
        campo.classList.remove('error');
    } else {
        campo.style.border = 'red';
        campo.style.borderWidth = '1px';
        campo.style.borderStyle = 'solid';
        campo.classList.add('error');
    }
}

function limpiarCampos() {
    correo.value = '';
    asunto.value = '';
    mensaje.value = '';
    validarLongitud(correo);
    validarLongitud(asunto);
    validarLongitud(mensaje);
    validarEmail(correo);
}