// script.js

// ==================== patrones y validación ====================
const patterns = {
  nombre: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+$/,
  apellidos: /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)?$/,
  dni: /^([Xx]?\d{7,8}[A-Za-z])$/,
  fechaNac: /^(0?[1-9]|[12][0-9]|3[01])[\/.](0?[1-9]|1[0-2])[\/.](19|20)\d{2}$/,
  codPostal: /^(0[1-9]|[1-4][0-9]|5[0-2])\d{3}$/,
  email: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i,
  telFijo: /^9\d{8}$/,
  telMovil: /^[67]\d{8}$/,
  iban: /^ES\d{22}$/,
  tarjetaCredito: /^(\d{4}[- ]?){3}\d{4}$/,
  contrasenha: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[_$!¡@?¿=;:])[A-Za-z\d_$!¡@?¿=;:]{12,20}$/
};

const inputs = document.querySelectorAll('input');
const mensajesDiv = document.querySelector("#mensajes");

// añadir validación en keyup
inputs.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    validate(e.target, patterns[e.target.name]);
  });
});

// función validate (ya corregida)
function validate(campo, regex) {
  if (campo.name === "repetirContrasenha") {
    const original = document.querySelector('[name="contrasenha"]').value;
    if (campo.value === original && original !== "") {
      campo.className = 'valido';
    } else {
      campo.className = 'invalido';
    }
    return;
  }

  if (regex && regex.test(campo.value.trim())) {
    campo.className = 'valido';
  } else {
    campo.className = 'invalido';
  }
}

// ==================== utilidades DOM ====================
function mostrarMensaje(msg, tipo = "info") {
  // tipo puede usarse para colorear (ahora simple texto)
  mensajesDiv.textContent = msg;
}

function limpiarFormulario() {
  inputs.forEach((input) => {
    input.value = "";
    input.className = "";
  });
}

// recoge datos del formulario y valida antes de retornar el objeto
function obtenerDatosFormulario() {
  const datos = {};
  let todoValido = true;

  inputs.forEach((input) => {
    validate(input, patterns[input.name]);
    if (input.className === "invalido") {
      todoValido = false;
    }
    datos[input.name] = input.value.trim();
  });

  if (!todoValido) {
    mostrarMensaje("Corrige los campos marcados en rojo antes de enviar.");
    return null;
  }

  return datos;
}

// cargar datos en el formulario desde un objeto
function cargarDatosEnFormulario(data) {
  inputs.forEach((input) => {
    // algunos endpoints usan claves ligeramente distintas; mapeamos
    const key = input.name;
    if (data[key] !== undefined) {
      input.value = data[key];
    } else if (key === "tarjetaCredito" && data["tarjeta"]) {
      input.value = data["tarjeta"];
    } else if (key === "apellidos" && data["apellido"]) {
      input.value = data["apellido"];
    } else {
      input.value = "";
    }
    // validar visualmente
    validate(input, patterns[input.name]);
  });
  mostrarMensaje("Datos cargados correctamente.");
}

// ==================== EVENTOS BOTONES ====================
document.querySelector("#obtener-JSON").addEventListener("click", () => {
  fetch("getJSON.php")
    .then(res => {
      if (!res.ok) throw new Error("No se pudo leer datos.json");
      return res.json();
    })
    .then(data => cargarDatosEnFormulario(data))
    .catch(err => mostrarMensaje("Error al cargar JSON: " + err.message));
});

document.querySelector("#publicar-PHP").addEventListener("click", () => {
  const datos = obtenerDatosFormulario();
  if (!datos) return;

  fetch("postPhp.php", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(datos)
  })
    .then(res => res.json())
    .then(resp => {
      mostrarMensaje(resp.mensaje || "Respuesta recibida del PHP.");
      limpiarFormulario();
    })
    .catch(() => mostrarMensaje("Error enviando datos al script PHP."));
});

document.querySelector("#obtener-PHP").addEventListener("click", () => {
  fetch("getPhp.php")
    .then(res => {
      if (!res.ok) throw new Error("Error al obtener desde PHP");
      return res.json();
    })
    .then(data => cargarDatosEnFormulario(data))
    .catch(err => mostrarMensaje("Error obteniendo PHP: " + err.message));
});

document.querySelector("#publicar-BBDD").addEventListener("click", () => {
  const datos = obtenerDatosFormulario();
  if (!datos) return;

  fetch("postDB.php", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(datos)
  })
    .then(res => res.json())
    .then(resp => {
      mostrarMensaje(resp.mensaje || "Respuesta del servidor DB.");
      // dejar el formulario en blanco tras publicar en BBDD
      if (resp.mensaje && resp.mensaje.toLowerCase().includes("correct")) {
        limpiarFormulario();
      } else {
        // aun así lo limpiamos para cumplir requerimiento
        limpiarFormulario();
      }
    })
    .catch(() => mostrarMensaje("Error guardando en la base de datos."));
});

// El botón Obtener-BBDD es el submit del form; interceptamos el submit
document.querySelector("#registroForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const dni = document.querySelector("#dniUser").value.trim();

  if (!patterns.dni.test(dni)) {
    mostrarMensaje("Introduce un DNI válido para buscar en la BBDD.");
    return;
  }

  fetch("getDB.php?dni=" + encodeURIComponent(dni))
    .then(res => {
      if (!res.ok) throw new Error("DNI no encontrado");
      return res.json();
    })
    .then(data => cargarDatosEnFormulario(data))
    .catch(err => mostrarMensaje("Error obteniendo de BBDD: " + err.message));
});
