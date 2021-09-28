const CLAVE_LOCALSTORAGE = "lista_tareas";
document.addEventListener("DOMContentLoaded", () => {
  // El arreglo global que vamos a manejar
  let tareas = [];
  // Declaración de elementos del DOM
  const $contenedorTareas = document.querySelector("#contenedorTareas"),
        $btnGuardarTarea  = document.querySelector("#btnAgregarTarea"),
        $inputNuevaTarea  = document.querySelector("#inputNuevaTarea");
  /*** localStorage.js */
  const obtenerTareasDeAlmacenamiento = () => {
    const posibleLista = JSON.parse(localStorage.getItem(CLAVE_LOCALSTORAGE));
    if (posibleLista) {
      return posibleLista;
    } else {
      return [];
    }
  };
  const guardarTareasEnAlmacenamiento = () => {
    localStorage.setItem(CLAVE_LOCALSTORAGE, JSON.stringify(tareas));
  }
  /*** agregar.js
    Escuchar clic del boton para agregar nueva tarea */
  $btnGuardarTarea.onclick = () => {
    const tarea = $inputNuevaTarea.value;
    if (!tarea) {
      return;
    }
    tareas.push({
      tarea: tarea,
      terminada: false,
    });
    $inputNuevaTarea.value = "";
    guardarTareasEnAlmacenamiento();
    refrescarListaDeTareas();
  };
  /*** refrescar.js
    Definir función que refresca la lista de tareas a partir del arreglo global */
  const refrescarListaDeTareas = () => {
    $contenedorTareas.innerHTML = "";
    for (const [indice, tarea] of tareas.entries()) {
      // Crear el enlace para eliminar la tarea
      const $enlaceParaEliminar = document.createElement("a");
      $enlaceParaEliminar.classList.add("enlace-eliminar");
      $enlaceParaEliminar.innerHTML = "&times;";
      $enlaceParaEliminar.href = "";
      $enlaceParaEliminar.title = "Eliminar tarea";
      $enlaceParaEliminar.onclick = (evento) => {
        evento.preventDefault();
        if (!confirm("¿Eliminar tarea?")) {
          return;
        }
        tareas.splice(indice, 1);
        // Guardar los cambios
        guardarTareasEnAlmacenamiento(tareas);
        refrescarListaDeTareas();
      };
      // El input para marcar la tarea
      const $checkbox = document.createElement("input");
      $checkbox.type = "checkbox";
      $checkbox.title = "Marcar como realizada";
      $checkbox.onchange = function () {  // No es una función flecha porque quiero acceder al elemento a través de this
        if (this.checked) {
          tareas[indice].terminada = true;
        } else {
          tareas[indice].terminada = false;
        }
        guardarTareasEnAlmacenamiento(tareas);
        refrescarListaDeTareas();
      }
      // El span que llevara el contenido de la tarea
      const $span = document.createElement("span");
      $span.textContent = tarea.tarea;
      // Y finalmente el elemento de la lista
      const $li = document.createElement("li");
			// evento para editar el contenido
			$li.addEventListener('dblclick', editItem);
      // Verificamos si la tarea está marcada
      if (tarea.terminada) {
        $checkbox.checked = true;
        $span.classList.add("tachado");
      }
      $li.appendChild($checkbox);
      $li.appendChild($span);
      $li.appendChild($enlaceParaEliminar);
      $contenedorTareas.appendChild($li);
			
			// funcion para editar una tarea existente
			function editItem(event) {
				// guardamos el valor inicial
				let item = event.target.innerHTML;
				// creamos un input para reemplazar el objeto
				let itemInput = document.createElement('input');
				itemInput.type = 'text';
				// asignamos el volor inicial al input
				itemInput.value = item;
				itemInput.classList.add('edit');
				itemInput.addEventListener('keypress', saveItem);
				itemInput.addEventListener('click', saveItem);
				// añadir el input al DON
				event.target.parentNode.prepend(itemInput);
				// eliminar el objeto inicial del DOM
				event.target.remove();
				// seleccionar el texto al hacer doble clic
				itemInput.select();
			}
			
			// función para guardar tarea existente modificada
			function saveItem(event) {
				// guardamos el valor inicial del input
				let itemValue = event.target.value;
				if (event.target.value.length != 0 && (event.keyCode === 13 || event.type === 'click')) {
					// crear el elemento a introducir en la lista
					let span = document.createElement('span');
					span.addEventListener('dblclick', editItem);
					span.addEventListener('click', saveItem);
					// establecer el valor inicial del input en el elemento de lista
					span.textContent = event.target.value;
					// añadir el elemento de lista editado al DOM
					event.target.parentNode.prepend(span);
					// eliminar el input del DOM
					event.target.remove();
					// modificamos el arreglo para localStorage
					tareas.splice(indice, 1);
					// guardar los cambios de edicion
					const tarea = span.textContent;
					tareas.push({
						tarea: tarea,
						terminada: false,
					});
					guardarTareasEnAlmacenamiento(tareas);
					refrescarListaDeTareas();
				}
			}
    }
  };
  // Llamar a la función la primera vez
  tareas = obtenerTareasDeAlmacenamiento();
  refrescarListaDeTareas();
  
  const modeSwitch = document.querySelector('.mode-switch');
// color themes
  modeSwitch.addEventListener('click', function () {
    document.documentElement.classList.toggle('dark');
    modeSwitch.classList.toggle('active');
  });
});