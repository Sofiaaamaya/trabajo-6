//Declaración del objeto con los patrones de REGEX para cada campo del formulario.
const patterns = {
  nombre: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/,
  apellidos: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/, 
  dni: /^([Xx]?\d{7,8}[A-Za-z])$/, 
  fechaNac: /^(0?[1-9]|[12][0-9]|3[01])[/.](0?[1-9]|1[0-2])[/.](19|20)\d{2}$/, 
  codPostal: /^(0[1-9]|[1-4][0-9]|5[0-2])\d{3}$/,
  email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
  telFijo: /^9\d{8}$/, 
  telMovil: /^[67]\d{8}$/, 
  iban: /^ES\d{22}$/, 
  tarjetaCredito: /^(\d{4}[- ]?){3}\d{4}$/,
  contrasenha: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_$!¡@?¿=;:])[A-Za-z\d_$!¡@?¿=;:]{12,20}$/ 
};

// Declara la constante 'inputs' que contendrá la colección de inputs del formulario.
const inputs = document.querySelectorAll('input');

// Añado el evento keyup y blur a cada input para validar en tiempo real.
inputs.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    validate(e.target, patterns[e.target.name]);
  });
});

// Declaración de la función de validación 'validate'
function validate(campo, regex) {
  // Caso especial: repetir contraseña
  if (campo.name === "repetirContrasenha") {
    const original = document.querySelector('[name="contrasenha"]').value;
    if (campo.value === original && original !== "") {
      campo.className = 'valido';
    } else {
      campo.className = 'invalido';
    }
    return;
  }

  // Validación normal con regex
  if (regex && regex.test(campo.value.trim())) {
    campo.className = 'valido';
  } else {
    campo.className = 'invalido';
  }
}

//Guardar datos en sessionStorage al pulsar "Guardar"
document.querySelector("button[type='submit']").addEventListener("click", (e) => {
  e.preventDefault(); // PAra evitar comportamiento por defecto

  const datos = {};
  let todoValido = true;

  inputs.forEach((input) => {
    validate(input, patterns[input.name]);
    if (input.className === "invalido") {
      todoValido = false;
    } else {
      datos[input.name] = input.value.trim();
    }
  });

  if (todoValido) {
    sessionStorage.setItem("registroUsuario", JSON.stringify(datos));
    alert("Datos guardados correctamente.");
  } else {
    alert("Por favor, corrige los campos marcados en rojo.");
  }
});

// Recuperar datos de sessionStorage al pulsar Recuperar
document.querySelector("button[type='button']").addEventListener("click", () => {
  const datos = JSON.parse(sessionStorage.getItem("registroUsuario"));

  if (!datos) {
    alert("No hay datos guardados.");
    return;
  }

  inputs.forEach((input) => {
    input.value = datos[input.name] || "";
    validate(input, patterns[input.name]); // Validar al recuperar
  });
});

// DATOS DE PRUEBA
//ES9121000418450200051332