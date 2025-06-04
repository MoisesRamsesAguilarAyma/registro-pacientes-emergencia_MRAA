// --- LOGIN ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.");
      return;
    }

    // Verificar credenciales con localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioValido = usuarios.find(user => user.email === email && user.password === password);

    if (!usuarioValido) {
      alert("Credenciales incorrectas. Por favor verifica tus datos.");
      return;
    }

    // Acceso correcto - Mostrar sistema de pacientes
    document.getElementById("authContainer").classList.add("d-none");
    document.getElementById("sistemaPacientes").classList.remove("d-none");
  });
}

// --- REGISTRO DE USUARIO ---
const registroForm = document.getElementById("registerForm"); // Cambiado a registerForm
if (registroForm) {
  registroForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // IDs actualizados para coincidir con tu HTML
    const nombres = document.getElementById("nombres").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const ci = document.getElementById("ciEmpleado").value.trim();
    const esEmpleado = document.getElementById("esEmpleado").value;
    const password = document.getElementById("registerPassword").value.trim();
    const confirmarPassword = document.getElementById("confirmPassword").value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!nombres) {
      alert("Por favor, ingresa tus nombres.");
      return;
    }
    if (!apellidos) {
      alert("Por favor, ingresa tus apellidos.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    if (esEmpleado !== "si") { // Cambiado a comparación directa con "si"
      alert("Solo empleados de la clínica pueden crear cuenta.");
      return;
    }
    if (!ci || ci.length < 5) {
      alert("Por favor, ingresa un CI válido con al menos 5 caracteres.");
      return;
    }
    if (!passwordRegex.test(password)) {
      alert("La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.");
      return;
    }
    if (password !== confirmarPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Guardar usuario en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Verificar si el usuario ya existe
    if (usuarios.some(user => user.email === email)) {
      alert("Este correo electrónico ya está registrado.");
      return;
    }

    const nuevoUsuario = {
      nombres,
      apellidos,
      email,
      ci,
      esEmpleado,
      password
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert("Cuenta creada con éxito. Ahora puedes iniciar sesión.");

    // Cambiar a pestaña de login usando Bootstrap
    const loginTab = document.getElementById("login-tab");
    if (loginTab) loginTab.click();
    
    this.reset();
  });
}

// --- TOGGLE LOGIN / REGISTRO ---
const btnMostrarRegistro = document.getElementById("btnMostrarRegistro");
const btnMostrarLogin = document.getElementById("btnMostrarLogin");

if (btnMostrarRegistro) {
  btnMostrarRegistro.addEventListener("click", () => toggleLoginRegistro("registro"));
}

if (btnMostrarLogin) {
  btnMostrarLogin.addEventListener("click", () => toggleLoginRegistro("login"));
}

function toggleLoginRegistro(seccion) {
  const loginContainer = document.getElementById("loginContainer");
  const registroContainer = document.getElementById("registroContainer");

  if (!loginContainer || !registroContainer) return;

  if (seccion === "registro") {
    loginContainer.classList.add("d-none");
    registroContainer.classList.remove("d-none");
  } else {
    registroContainer.classList.add("d-none");
    loginContainer.classList.remove("d-none");
  }
}

// --- TOGGLE SHOW/HIDE PASSWORD ---
function togglePasswordVisibility(buttonId, inputId) {
  const btn = document.getElementById(buttonId);
  const input = document.getElementById(inputId);

  if (!btn || !input) return;

  btn.addEventListener("click", () => {
    if (input.type === "password") {
      input.type = "text";
      btn.textContent = "Ocultar";
    } else {
      input.type = "password";
      btn.textContent = "Mostrar";
    }
  });
}

togglePasswordVisibility("btnToggleLoginPassword", "password");
togglePasswordVisibility("btnToggleRegPassword", "regPassword");
togglePasswordVisibility("btnToggleRegConfirmPassword", "regConfirmPassword");

// --- REGISTRO DE PACIENTES ---
const formularioPaciente = document.getElementById("formularioPaciente");
if (formularioPaciente) {
  formularioPaciente.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edadInput = document.getElementById("edad").value.trim();
    const genero = document.getElementById("genero").value;
    const documento = document.getElementById("documento").value.trim();
    const sintomas = document.getElementById("sintomas").value.trim();
    const tratamiento = document.getElementById("tratamiento").value.trim();
    const medicamento = document.getElementById("medicamento").value.trim();
    const examenes = document.getElementById("examenes").value;
    const gravedad = document.getElementById("gravedad").value;

    const edad = Number(edadInput);
    if (!Number.isInteger(edad) || edad <= 0) {
      alert("La edad debe ser un número entero mayor que 0.");
      return;
    }

    if (!genero) {
      alert("Por favor, selecciona un género válido.");
      return;
    }
    if (!examenes) {
      alert("Por favor, selecciona un examen válido.");
      return;
    }
    if (!gravedad) {
      alert("Por favor, selecciona una gravedad válida.");
      return;
    }

    if (!nombre) {
      alert("Por favor, ingresa el nombre del paciente.");
      return;
    }
    if (!documento || documento.length < 5) {
      alert("Por favor, ingresa un documento válido con al menos 5 caracteres.");
      return;
    }
    if (!sintomas) {
      alert("Por favor, ingresa los síntomas del paciente.");
      return;
    }
    if (!tratamiento) {
      alert("Por favor, ingresa el tratamiento.");
      return;
    }
    if (!medicamento) {
      alert("Por favor, ingresa el medicamento.");
      return;
    }

    const tabla = document.getElementById("tablaPacientes");
    if (!tabla) return;

    const fila = document.createElement("tr");

    switch (gravedad.toLowerCase()) {
      case "leve":
        fila.className = "triaje-leve";
        break;
      case "moderado":
        fila.className = "triaje-moderado";
        break;
      case "urgente":
        fila.className = "triaje-urgente";
        break;
      case "critico":
        fila.className = "triaje-critico";
        break;
      default:
        fila.className = "";
    }

    fila.innerHTML = `
      <td>${nombre}</td>
      <td>${edad}</td>
      <td>${genero}</td>
      <td>${documento}</td>
      <td>${sintomas}</td>
      <td>${tratamiento}</td>
      <td>${medicamento}</td>
      <td>${examenes}</td>
      <td>${gravedad.toLowerCase()}</td>
      <td><button class="btn btn-danger btn-sm" onclick="eliminarPaciente(this)">Eliminar</button></td>
    `;

    tabla.appendChild(fila);

    if (gravedad.toLowerCase() === "critico") {
      mostrarAlertaCritico();
    }

    actualizarContadorCriticos();
    this.reset();
  });
}

// --- FUNCIONES AUXILIARES ---
function eliminarPaciente(boton) {
  const fila = boton.closest("tr");
  if (fila) {
    fila.remove();
    actualizarContadorCriticos();
  }
}

function actualizarContadorCriticos() {
  const filas = document.querySelectorAll("#tablaPacientes tr");
  let totalCriticos = 0;

  filas.forEach(fila => {
    const gravedadCelda = fila.children[8];
    if (gravedadCelda && gravedadCelda.textContent.trim().toLowerCase() === "critico") {
      totalCriticos++;
    }
  });

  const contador = document.getElementById("contadorCriticos");
  if (contador) {
    contador.textContent = `Casos Críticos: ${totalCriticos}`;
  }
}

function mostrarAlertaCritico() {
  const alerta = document.getElementById("alertaCritico");
  if (alerta) {
    alerta.style.display = "block";
    setTimeout(() => {
      alerta.style.display = "none";
    }, 3000);
  }

  const sonido = new Audio("alerta.mp3");
  sonido.play().catch(() => {
    console.warn("No se pudo reproducir el sonido de alerta.");
  });
}

// --- ORDENAR GRAVEDAD ---
let ordenAscendente = true;

const ordenarGravedadBtn = document.getElementById("ordenarGravedadBtn");
if (ordenarGravedadBtn) {
  ordenarGravedadBtn.addEventListener("click", function () {
    const tabla = document.getElementById("tablaPacientes");
    if (!tabla) return;

    const filas = Array.from(tabla.querySelectorAll("tr")).filter(fila => fila.children.length > 1);

    const prioridad = {
      "leve": 1,
      "moderado": 2,
      "urgente": 3,
      "critico": 4
    };

    filas.sort((a, b) => {
      const gravedadA = a.children[8]?.textContent.trim().toLowerCase() || "";
      const gravedadB = b.children[8]?.textContent.trim().toLowerCase() || "";

      return ordenAscendente
        ? (prioridad[gravedadA] || 0) - (prioridad[gravedadB] || 0)
        : (prioridad[gravedadB] || 0) - (prioridad[gravedadA] || 0);
    });

    filas.forEach(fila => tabla.appendChild(fila));

    ordenAscendente = !ordenAscendente;
    this.textContent = ordenAscendente
      ? "Ordenar Gravedad ⬇️"
      : "Ordenar Gravedad ⬆️";
  });
}
