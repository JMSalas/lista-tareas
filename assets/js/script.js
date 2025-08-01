// Objetos Tarea y AdministradorTareas
class Tarea {
    constructor(nombre, descripcion, estado = 'pendiente') {
        this.id = Tarea.generarIdSimple();
        this.fecha = new Date();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
    }

    // Función que genera un id simple para la tarea concatenando:
    // Primera parte generada como un numero aleatorio convertido a base 36.
    // Segunda parte considerando el tiempo de creacion convertido tambien a base 36.
    static generarIdSimple() {
        return Math.random().toString(36).substring(2, 9) + "-" + Date.now().toString(36);
    }
}

class AdministradorTareas {
    
    constructor(estados = ['pendiente','lista']) {
        this.tareasPendientes = [];
        this.tareasListas = [];
        this.estados = estados;
    }

    // Método Privado recupera la lista de tareas adecuada según estado.
    #getListaTareas(estado) {
        if (!this.estados.includes(estado)) return null; // Si estado no es válido retorna null

        return (estado === 'pendiente') ? this.tareasPendientes : this.tareasListas;
    }

    getTarea(id, estado) {
        const listaTareas = this.#getListaTareas(estado);

        if (!listaTareas) return null; // Retornar null si listaTareas es invalida

        const tarea = listaTareas.find(tarea => tarea.id === id);

        return tarea;
    }

    agregarTarea(nombreTarea, descripcion, estado = 'pendiente'){
        const listaTareas = this.#getListaTareas(estado);

        if (!listaTareas) return null; // Retornar null si listaTareas es invalida
        
        const nuevaTarea = new Tarea(nombreTarea, descripcion, estado); // Crear Nueva Tarea

        listaTareas.push(nuevaTarea); // Agregar Nueva Tarea

        return nuevaTarea; // retornar la tarea creada si se agrego exitosamente
    }

    // Método que elimina un tarea de tareasPendientes o tareasListas
    // Nota: Para eliminar tareas de una lista de manera iterativa, se debe iterar sobre un arreglo con los id a eliminar. 
    eliminarTarea(tareaId, estado){
        const listaTareas = this.#getListaTareas(estado);
        
        if (!listaTareas || listaTareas.length === 0) return null; // Retornar null si listaTareas es invalida o vacía

        const tareaIndex = listaTareas.findIndex(tarea => tarea.id === tareaId); // Encontrar indice de la tarea a eliminar

        if (tareaIndex < 0) return null; // Retornar null si la tarea no fue encontrada

        const [tareaEliminada] = listaTareas.splice(tareaIndex,1); // Elinar tarea

        return tareaEliminada;
    }

    // Método para mover una tarea entre listas cambiando su estado
    cambiarEstadoTarea(tareaId, estadoInicial, estadoFinal){
        const tareaMovida = this.eliminarTarea(tareaId, estadoInicial); // Obtener tarea a cambiar, como valor de retorno de eliminarTarea en lista de estado inicial.

        if (!tareaMovida) return null; // Retornar null, si eliminarTarea() ha retornado un valor null

        const listaTareas = this.#getListaTareas(estadoFinal); // Determinar la lista de tareas que recibirá la tarea movida

        if (!listaTareas) return null; // Si la lista de destino no es válida, retornar null

        tareaMovida.estado = estadoFinal; // Cambiar estado de tarea a estadoFinal
        listaTareas.push(tareaMovida);  // Agregar tarea movida a la lista de tareas del estado final.

        return tareaMovida;
    }
}

class AdministradorInterfaz {
    // Método que carga una arreglo de tareas como elementos <li> en una lista HTML.
    mostrarTareasHTML(listaTareas, listaHTML){
        if(!listaHTML) return false; // Si listaHTML ha sido mal definida parar la ejecución
        
        // Si listaTareas esta vacía mostrar mensaje "Lista de tareas vacía", en caso contraio limpiar la lista para agregar los elementos <li> con las tareas de la lista.
        listaHTML.innerHTML = (listaTareas.length === 0) ? '<li class="list-group-item list-group-item-danger"><i class="bi bi-ban"></i> Lista de Tareas Vacía</li>' : "";

        // Crear nodo (elemnto <li>) para cada tarea y agregarlo a listaHTML
        listaTareas.forEach(tarea => {
            const nodoTarea = this.crearNodoTarea(tarea);
            listaHTML.append(nodoTarea);
        });

        return true;
    }

    // Método que crea un elemento <li> para cada tarea
    crearNodoTarea(tarea){
        const nodoTarea = document.createElement('li'); // Crea el nodo <li> base
        const claseColor = (tarea.estado === 'pendiente') ? "warning" : "success";  // Selecciona el color que el elemento en la lista
        const clases = ["list-group-item", "d-flex", "align-items-center", `list-group-item-${claseColor}`, "flex-wrap"]; // Clases Bootstrap 
  
        nodoTarea.classList.add(...clases); // Agrega clases al elemnto <li> base

        // Html que incluye checkbox de la tarea (id de la tarea), fecha de ingreso y un boton asociado al id de la tarea (data-id-tarea) para ver sus detalles
        nodoTarea.innerHTML = `
            <div class="form-check list-group-item list-group-item-light col-12 col-lg-8 border-${claseColor} text-start">
                <input class="form-check-input me-1 border-${claseColor}" type="checkbox" id="${tarea.id}">
                <label class="form-check-label stretched-link fw-medium" for="${tarea.id}">${tarea.nombre}</label>
            </div>
            <div class="col text-start text-lg-center">
                ${tarea.fecha.toLocaleString('es-CL')}
            </div>
            <div class="col-2 col-lg-1 text-end">
                <button class="btn btn-outline-secondary btn-vertarea" type="button" data-bs-toggle="modal" data-bs-target="#detalleTareaModal" data-id-tarea="${tarea.id}"><i class="bi bi-eye-fill d-none d-sm-inline" aria-hidden="true"></i> Ver</button>
            </div>`;

        return nodoTarea;
    }

    // Método que determina las tareas que han sido seleccionadas (checked) en listaHTML 
    obtenerTareasChecked(listaHTML) {
        if(!listaHTML) return []; // Si lista ha sido mal definida se retorna un arreglo vacío

        const listaNodos = listaHTML.querySelectorAll('li'); // Obtener todo los elementos de la lista
        
        const idTareasChecked = []; // Arreglo donde se guardan los id de tareas "checked" o seleccionadas

        listaNodos.forEach(nodo => {
            const checkBoxTarea = nodo.querySelector('input[type="checkbox"]'); // Encontrar el checkbox dentro de cada elemento <li>

            if (checkBoxTarea === null) return []; // Si no se encontro un checkbox, implica que solo esta el elemento <li> con mesaje de lista vacía, se retorna un arreglo vacío

            if(checkBoxTarea.checked){
                idTareasChecked.push(checkBoxTarea.id); // Agregar id de la tarea seleccionada al arreglo 
                checkBoxTarea.checked = false; // Resetear estado del checkbox
            }
        });

        return idTareasChecked;
    }

    // Método para cargar detalles de la tarea en el modal asociado a la tarea.
    verTareaHTML(tarea){
        if (!tarea) return false; // Si tarea no ha sido definida parar ejecución del método

        const detalleTareaModal = document.querySelector('#detalleTareaModal');

        detalleTareaModal.querySelector('#modalTareaNombre').textContent = tarea.nombre;
        detalleTareaModal.querySelector('#modalTareaId').textContent = tarea.id;
        detalleTareaModal.querySelector('#modalTareaFecha').textContent = tarea.fecha.toLocaleString('es-CL'); 
        detalleTareaModal.querySelector('#modalTareaDescripcion').innerHTML = tarea.descripcion.replace(/<[^>]*>/g, '').replace(/\n/g, '<br>'); // remover etiquetas Html y cambiar saltos de línea 
        
        return true;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const adminTareas = new AdministradorTareas();
    const adminInterfaz = new AdministradorInterfaz();

    // Seleccionar nodos del DOM
    const formTarea = document.querySelector("#formTarea");
    const formControls = formTarea.querySelectorAll(".form-control");
    const msgExito = formTarea.querySelector(".alert-success");
    const buttonExito = msgExito.querySelector(".btn");
    const listaTareasPendientesHTML = document.querySelector('#pendientes');
    const listaTareasListasHTML = document.querySelector('#listas');
    const botonEliminarPendientes = document.querySelector("#eliminarPendientes");
    const botonEliminarListas = document.querySelector("#eliminarListas");
    const botonMoverPendientes = document.querySelector("#moverPendientes");
    const botonMoverListas = document.querySelector("#moverListas");

    // Agregar EventListener al submit del formulario de agreagr tarea
    formTarea.addEventListener("submit", (event) => {
        // Prevenir comportamiento por defecto del formulario válido o inválidos
        event.preventDefault();
        event.stopPropagation();

        // Habilitar los estilos visuales :invalid and :valid de BootStrap 5 en formulario
        formTarea.classList.add("was-validated");

        // Formulario Válido
        if (formTarea.checkValidity()) {
            // Muestra mensaje de exito
            msgExito.classList.remove("d-none");

            // Agregar atributo readonly a cada form-control y capturar sus valores
            const datosTarea = [];

            formControls.forEach((control) => {
                control.setAttribute("readonly", "");
                datosTarea.push(control.value.trim());
            });

            const nuevaTarea = adminTareas.agregarTarea(...datosTarea); // Crear nueva tarea y agregarla a la lista de pendientes del administrador de tareas
            adminInterfaz.mostrarTareasHTML(adminTareas.tareasPendientes, listaTareasPendientesHTML); // Actualizar lista de tareas pendientes en listaHTML
        }
    });

    // Agregar EventListener al 'click' del boton de mensaje de tarea agregada
    buttonExito.addEventListener("click", () => {
        // Limpiar estilos visuales :invalid and :valid de BootStrap 5 en formulario
        formTarea.classList.remove("was-validated");

        // Remover atributo readonly y resetear valores para cada los .form-control
        formControls.forEach((control) => {
        control.value = "";
        control.removeAttribute("readonly");
        });

        // Esconder mensaje de Tarea Agregada
        msgExito.classList.add("d-none");
    });

    // Agregar EventListener al 'click' de los botones de eliminar tarea
    botonEliminarPendientes.addEventListener('click', () =>{
        const idTareasEliminadas = adminInterfaz.obtenerTareasChecked(listaTareasPendientesHTML);
        idTareasEliminadas?.forEach(idTarea => adminTareas.eliminarTarea(idTarea, 'pendiente'));  // Eliminar tarea para cada id seleccionado 
        adminInterfaz.mostrarTareasHTML(adminTareas.tareasPendientes, listaTareasPendientesHTML); // Actualizar lista de tareas pendientes en listaHTML 
    });

    botonEliminarListas.addEventListener('click', () =>{
        const idTareasEliminadas = adminInterfaz.obtenerTareasChecked(listaTareasListasHTML);
        idTareasEliminadas?.forEach(idTarea => adminTareas.eliminarTarea(idTarea, 'lista')); // Eliminar tarea para cada id seleccionado
        adminInterfaz.mostrarTareasHTML(adminTareas.tareasListas, listaTareasListasHTML); // Actualizar lista de tareas pendientes en listaHTML
    });

    // Agregar EventListener al 'click' de los botones para mover tareas entre listas
    botonMoverPendientes.addEventListener('click', () =>{
        const idTareasCambiadas = adminInterfaz.obtenerTareasChecked(listaTareasPendientesHTML);
        idTareasCambiadas?.forEach(idTarea => adminTareas.cambiarEstadoTarea(idTarea,'pendiente', 'lista')); // Cambiar estado de la tarea para cada id seleccionado
        adminInterfaz.mostrarTareasHTML(adminTareas.tareasPendientes, listaTareasPendientesHTML); // Actualizar lista de tareas pendientes en listaHTML
        adminInterfaz.mostrarTareasHTML(adminTareas.tareasListas, listaTareasListasHTML); // Actualizar lista de tareas listas en listaHTML
    });

    botonMoverListas.addEventListener('click', () =>{
        const idTareasCambiadas = adminInterfaz.obtenerTareasChecked(listaTareasListasHTML);
        idTareasCambiadas?.forEach(idTarea => adminTareas.cambiarEstadoTarea(idTarea,'lista', 'pendiente')); // Cambiar estado de la tarea para cada id seleccionado
        adminInterfaz.mostrarTareasHTML(adminTareas.tareasPendientes, listaTareasPendientesHTML); // Actualizar lista de tareas pendientes en listaHTML
        adminInterfaz.mostrarTareasHTML(adminTareas.tareasListas, listaTareasListasHTML); // Actualizar lista de tareas listas en listaHTML
    });

    // Añadir el event listener delegado a la lista de tareas pendientes, para ver detalles de una tarea
    listaTareasPendientesHTML.addEventListener('click', (event) => {
        const btnVer = event.target.closest('.btn-vertarea'); // Asegurar que todo el boton, incluso el icono active el evento
        
        if(btnVer){ // si se clickeo en el boton "Ver"
            const tarea = adminTareas.getTarea(btnVer.dataset.idTarea,'pendiente'); // Obtener tarea por id
            adminInterfaz.verTareaHTML(tarea);  
        }
    });

    // Añadir el event listener delegado a la lista de tareas listas, , para ver detalles de una tarea
    listaTareasListasHTML.addEventListener('click', (event) => {        
        const btnVer = event.target.closest('.btn-vertarea'); // Asegurar que todo el boton, incluso el icono active el evento

        if(btnVer){ // si se clickeo en el boton "Ver"
            const tarea = adminTareas.getTarea(btnVer.dataset.idTarea,'lista'); //Obtener tarea por id
            adminInterfaz.verTareaHTML(tarea);
        }
    });

    // Crea Tareas Prueba
    adminTareas.agregarTarea("Ir al supermercado","Pan\nQueso\nJamón\nAzucar","pendiente");
    adminTareas.agregarTarea("Estudiar para prueba de JavaScript","Variables:\n- Primitivas\n- Arreglos\n- Objetos\nFunciones:\n- Clásicas\n- Anónimas\n- Flecha","pendiente");
    adminTareas.agregarTarea("Dar médicamentos a la gata","Amoxilina 20ml 2 veces al día cada 18 horas\nInvernit media pastilla una vez al día","lista");
    adminTareas.agregarTarea("Enviar correo a John Doe","Adjuntar Curriculum Vitae","lista");

    // Actualizar las listas HTML.
    adminInterfaz.mostrarTareasHTML(adminTareas.tareasPendientes, listaTareasPendientesHTML);
    adminInterfaz.mostrarTareasHTML(adminTareas.tareasListas, listaTareasListasHTML);
});