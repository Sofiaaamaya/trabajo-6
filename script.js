const validaciones = {
     nombre:
     {
        regex: /^[A-Z]+[a-zA-Z]+\s*[A-Za-z]+/i
        ,mensaje: "Debe comenzar en mayúscula"
     }

    ,apellidos:
    {
        regex:/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/    
        ,mensaje:"Máximo dos apellidos, ambos con mayúscula inicial."
    }

    ,dni:
    { 
        regex:/^[x]*\d{8}[a-zA-Z]$/i
        ,mensaje:"Formato válido: 12345678X o X1234567L."
    }

    ,fechaNac:
    { 
        regex: /^(0?[1-9]|[12][0-9]|3[01])[/.](0?[1-9]|1[0-2])[/.]((19|20)[0-9]{2})$/i
        ,mensaje: "Formato DD/MM/AAAA."
    }

    ,codPostal:
    {
        regex:/[0-9]{5}(\-?[0-9]{4})?$/i
        ,mensaje:"Código postal español válido."
    }

    ,email:
    { 
        regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
        ,mensaje: "Email válido requerido."
    }

    ,telFijo:
    { 
        regex:/^[89]\d{8}$/i 
        ,mensaje:"Debe comenzar con 9 y tener 9 dígitos."
    }

    ,telMovil:
    { 
        regex:/^[67]\d{8}$/i 
        ,mensaje:"Debe comenzar con 6 o 7 y tener 9 dígitos."
    }

    ,iban:
    {       
        regex:/^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/i
        ,mensaje:"IBAN español válido (ES + 22 dígitos)."
    }

    ,tarjetaCredito:
    {
        regex:/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|622((12[6-9]|1[3-9][0-9])|([2-8][0-9][0-9])|(9(([0-1][0-9])|(2[0-5]))))[0-9]{10}|64[4-9][0-9]{13}|65[0-9]{14}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47][0-9]{13})*$/i
        ,mensaje:"Formato: 4444-4444-4444-4444."
    }

    ,contrasenha:
    {
        regex:/^[a-zA-Z0-9_$!¡@?¿=;:]{12,20}$/i
    
        ,mensaje:"12+ caracteres con letras, números y símbolo."
    }

    ,repetirContrasenha: {
        mensaje: "Las contraseñas deben coincidir."
    }

};


function validarCampo(e) {
  const input = e.target;
  const campo = input.name;
  const valor = input.value.trim();

  if (!validaciones[campo]) return;

  let valido = true;

  if (campo === "repetirContrasenha") {
    const original = document.querySelector('[name="contrasenha"]').value;
    valido = valor === original && original !== "";
  } else {
    valido = validaciones[campo].regex.test(valor);
  }

  input.className = valido ? "valido" : "invalido";

  const mensajeError = input.nextElementSibling;
  if (mensajeError && mensajeError.classList.contains("mensaje-error")) {
    mensajeError.style.opacity = valido ? "0" : "1";
    mensajeError.style.height = valido ? "0" : "auto";
    mensajeError.style.marginBottom = valido ? "0" : "10px";
  }
}

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("keyup", validarCampo);
});



// Guardar DAtos
document.querySelector("button[type='submit']").addEventListener("click", (e) => {
  e.preventDefault();

  const datos = {};
  let todoValido = true;

  document.querySelectorAll("input").forEach((input) => {
    const campo = input.name;
    const valor = input.value.trim();

    if (!validaciones[campo]) return;

    let valido = true;

    if (campo === "repetirContrasenha") {
      const original = document.querySelector('[name="contrasenha"]').value;
      valido = valor === original && original !== "";
    } else {
      valido = validaciones[campo].regex.test(valor);
    }

    input.className = valido ? "valido" : "invalido";
    if (!valido) todoValido = false;
    else datos[campo] = valor;
  });

  if (todoValido) {
    sessionStorage.setItem("registroUsuario", JSON.stringify(datos));
    alert("Datos guardados correctamente.");
  } else {
    alert("Por favor, corrige los campos marcados en rojo.");
  }
});




// Recuperar datos
document.querySelector("button[type='button']").addEventListener("click", () => {
  const datos = JSON.parse(sessionStorage.getItem("registroUsuario"));

  if (!datos) {
    alert("No hay datos guardados.");
    return;
  }

  document.querySelectorAll("input").forEach((input) => {
    const campo = input.name;
    const valor = datos[campo] || "";
    input.value = valor;


    // Validar al recuperar
    if (!validaciones[campo]) return;

    let valido = true;

    if (campo === "repetirContrasenha") {
      const original = document.querySelector('[name="contrasenha"]').value;
      valido = valor === original && original !== "";
    } else {
      valido = validaciones[campo].regex.test(valor);
    }

    input.className = valido ? "valido" : "invalido";
  });
});





// DATOS DE PRUEBA

//ES9121000418450200051332