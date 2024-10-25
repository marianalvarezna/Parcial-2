const usuarios = [
    { nombreUsuario: 'jaider', contraseña: '1234', roles: ['Administrativo', 'Gerente'] }, // Jaider con roles de Administrativo y Gerente General
    { nombreUsuario: 'maria', contraseña: '5678', roles: ['Proveedora'] }, // María con rol de Proveedora
    { nombreUsuario: 'luis', contraseña: '2024', roles: ['Empleado'] }  // Luis con rol de Empleado
];

// Manejar el envío del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario para controlarlo con JavaScript
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const contraseña = document.getElementById('contraseña').value;
    const elementoError = document.getElementById('error');

    // Validar que los campos no estén vacíos
    if (nombreUsuario === '' || contraseña === '') {
        elementoError.textContent = 'Por favor, complete todos los campos.';
        return;
    }

    // Buscar al usuario en la lista de usuarios
    const usuario = usuarios.find(usuario => usuario.nombreUsuario === nombreUsuario);

    // Validar si el usuario existe y la contraseña es correcta
    if (!usuario) {
        elementoError.textContent = 'Usuario no válido.';
    } else if (usuario.contraseña !== contraseña) {
        elementoError.textContent = 'Contraseña incorrecta.';
    } else {
        elementoError.textContent = ''; // Limpiar el error si las credenciales son correctas

        // Mostrar notificación de éxito
        function mostrarNotificacion() {
            const titulo = 'Inicio de sesión exitoso';
            const opciones = {
                body: `Bienvenido ${usuario.nombreUsuario}. Seleccione su rol.`,
                icon: 'success-icon.png'  
            };

            /*if (Notification.permission === 'granted') {
                new Notification(titulo, opciones);
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permiso => {
                    if (permiso === 'granted') {
                        new Notification(titulo, opciones);
                    }
                });
            }*/
        }

        // Verificar si el navegador soporta notificaciones
        if ('Notification' in window) {
            mostrarNotificacion();
        } else {
            alert(`Inicio de sesión exitoso. Seleccione su rol.`);
        }

        // Mostrar los roles del usuario
        const rolesContainer = document.getElementById('rolesContainer');
        rolesContainer.innerHTML = ''; // Limpiar roles anteriores, si existen

        usuario.roles.forEach(function(rol) {
            const botonRol = document.createElement('button');
            botonRol.textContent = rol; // Mostrar el rol en el botón
            const separador = document.createElement('div'); 
            separador.style.margin = '10px 0'; // Separar los botones visualmente
            
            // Asignar evento al botón para redirigir según el rol
            botonRol.addEventListener('click', function() {
                switch (rol) {
                    case 'Administrativo':
                        window.location.href = 'admin-dashboard.html'; // Redirigir a Administrativo
                        break;
                    case 'Gerente':
                        window.location.href = 'gerente-dashboard.html'; // Redirigir a Gerente General
                        break;
                    case 'Proveedora':
                        window.location.href = 'proveedor-dashboard.html'; // Redirigir a Proveedora
                        break;
                    case 'Empleado':
                        window.location.href = 'empleado-dashboard.html'; // Redirigir a Empleado
                        break;
                    default:
                        elementoError.textContent = 'Rol no reconocido.';
                        break;
                }
            });
            rolesContainer.appendChild(botonRol); // Añadir el botón al contenedor
            rolesContainer.appendChild(separador); // Añadir el separador
        });

        // Mostrar el contenedor de roles y ocultar el formulario de inicio de sesión
        document.getElementById('roleSelection').style.display = 'block';
        document.getElementById('loginForm').style.display = 'none'; 
    }
});