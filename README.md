# Check-List: Administrador de Tareas

## Descripción del Proyecto

`Check-List` es una aplicación web simple para la gestión de tareas, desarrollada con JavaScript, HTML y Bootstrap. Permite a los usuarios crear, organizar y dar seguimiento a sus tareas de manera interactiva. El proyecto se basa en un sistema de clases de JavaScript para una gestión de datos y una manipulación del DOM modular y eficiente.

Las funcionalidades clave incluyen:
* **Gestión de tareas**: Agregar nuevas tareas con nombre y descripción.
* **Estado de la tarea**: Mover tareas entre dos listas: "Pendientes" y "Listas".
* **Interacción dinámica**: Eliminar tareas individualmente o en grupo, y ver detalles de cada una en un modal.
* **Interfaz de usuario**: Una interfaz de usuario moderna y responsiva, gracias al uso de Bootstrap 5.

## Estructura del Proyecto

El proyecto está organizado en la siguiente estructura de directorios:

-   `assets/`
    -   `css/`
        -   `style.css`: Archivo CSS personalizado para estilos adicionales.
    -   `images/`
        -   `check.svg`: Icono para el `favicon`.
        -   `noise.png`: Imagen de fondo para el cuerpo del documento.
    -   `js/`
        -   `script.js`: Archivo JavaScript que contiene la lógica de la aplicación.
-   `index.html`: La página principal de la aplicación.

## Archivos y Funcionalidades

### `index.html`

Este archivo es la estructura principal de la aplicación.
-   **Meta Tags**: Configura la codificación de caracteres a UTF-8 y la vista del puerto para una correcta visualización en dispositivos móviles.
-   **Enlaces CSS**: Incluye Bootstrap 5, Bootstrap Icons, Google Fonts para la fuente "Playwrite AU NSW" y el archivo de estilos personalizado `style.css`.
-   **Enlaces JS**: Carga el script de Bootstrap y el archivo `script.js` con el atributo `defer`.
-   **Navegación**: Contiene una barra de navegación superior con el título "Check-List" y un icono.
-   **Contenido Principal (`<main>`):**
    -   **Formulario de Ingreso de Tareas**: Permite a los usuarios añadir nuevas tareas con un nombre y una descripción.
    -   **Sección de Tareas Pendientes**: Muestra una lista de las tareas que aún no se han completado.
    -   **Sección de Tareas Listas**: Muestra una lista de las tareas que ya han sido completadas.
    -   **Botones de Acción**:
        -   `#eliminarPendientes`: Elimina las tareas seleccionadas en la lista de pendientes.
        -   `#eliminarListas`: Elimina las tareas seleccionadas en la lista de tareas completadas.
        -   `#moverPendientes`: Mueve las tareas seleccionadas de la lista de pendientes a la lista de completadas.
        -   `#moverListas`: Mueve las tareas seleccionadas de la lista de completadas a la lista de pendientes.
-   **Modal**: Un modal para mostrar los detalles completos de una tarea específica, incluyendo nombre, ID, fecha de ingreso y descripción.
-   **Footer**: Un pie de página simple con el mismo icono que la barra de navegación.

### `style.css`

Este archivo contiene estilos CSS personalizados para el proyecto.
-   El `body` tiene una imagen de fondo `noise.png`.
-   Los elementos `.form-check-label` y `.form-control` utilizan la fuente "Playwrite AU NSW".

### `script.js`

Este archivo gestiona la lógica de la aplicación a través de dos clases principales: `Tarea` y `AdministradorTareas`, y una clase de interfaz `AdministradorInterfaz`.
-   **Clase `Tarea`**:
    -   `constructor(nombre, descripcion, estado)`: Crea una nueva instancia de tarea con un ID único, la fecha actual, nombre, descripción y estado.
    -   `generarIdSimple()`: Un método estático que genera un ID único concatenando un número aleatorio y la marca de tiempo en base 36.
-   **Clase `AdministradorTareas`**:
    -   `constructor(estados)`: Inicializa dos arreglos, `tareasPendientes` y `tareasListas`, para almacenar las tareas.
    -   `#getListaTareas(estado)`: Un método privado que devuelve el arreglo de tareas correspondiente al estado (`'pendiente'` o `'lista'`).
    -   `getTarea(id, estado)`: Busca y devuelve una tarea específica por su ID y estado.
    -   `agregarTarea(nombreTarea, descripcion, estado)`: Crea una nueva tarea y la agrega a la lista correspondiente según su estado.
    -   `eliminarTarea(tareaId, estado)`: Elimina una tarea de la lista correspondiente usando su ID.
    -   `cambiarEstadoTarea(tareaId, estadoInicial, estadoFinal)`: Mueve una tarea de una lista a otra, cambiando su estado en el proceso.
-   **Clase `AdministradorInterfaz`**:
    -   `mostrarTareasHTML(listaTareas, listaHTML)`: Renderiza las tareas de un arreglo en un elemento HTML de lista (`<ul>`). Si la lista de tareas está vacía, muestra un mensaje indicándolo.
    -   `crearNodoTarea(tarea)`: Genera el elemento HTML (`<li>`) para una tarea individual, incluyendo un checkbox, el nombre de la tarea, la fecha y un botón para ver los detalles.
    -   `obtenerTareasChecked(listaHTML)`: Recopila los ID de las tareas que tienen su checkbox marcado en una lista HTML.
    -   `verTareaHTML(tarea)`: Actualiza el contenido del modal de detalles con la información de una tarea específica.
-   **Lógica Principal**:
    -   Se inicializan las clases `AdministradorTareas` y `AdministradorInterfaz`.
    -   Se seleccionan los elementos del DOM necesarios para interactuar con la interfaz.
    -   Se configuran los `EventListeners` para manejar eventos como el envío del formulario, los clics en los botones de eliminación y movimiento de tareas, y los clics en los botones para ver los detalles de una tarea.
    -   Se crean algunas tareas de prueba al cargar el documento (`DOMContentLoaded`) para demostrar la funcionalidad de la aplicación.

## Cómo Ejecutar el Código

Para ejecutar esta aplicación, no es necesario un servidor web local ni una configuración compleja. Simplemente sigue estos pasos:

1.  Clona o descarga este repositorio en tu máquina local.
2.  Abre el archivo `index.html` en tu navegador web de preferencia (como Chrome, Firefox, etc.).
3.  La aplicación se cargará y estará lista para su uso.

## Tecnologías Utilizadas

* **HTML5**: Usado para la estructura y el contenido de la página web.
* **CSS3**: Utilizado para estilos personalizados.
* **JavaScript (ES6)**: Lenguaje principal para la lógica de la aplicación y la manipulación del DOM.
* **Bootstrap 5**: Framework CSS utilizado para el diseño y la responsividad de la interfaz de usuario.
* **Bootstrap Icons**: Biblioteca de iconos utilizada para los elementos de la interfaz.

### ¿Qué es JavaScript y cuál es su rol?

JavaScript es un lenguaje de programación de alto nivel, interpretado y dinámico, fundamental en el desarrollo web. Su rol principal es dotar a las páginas web de interactividad y dinamismo. A diferencia de HTML (que define la estructura) y CSS (que define el estilo), JavaScript permite que los elementos de una página web respondan a las acciones del usuario, manipulen datos y se actualicen sin necesidad de recargar la página.

### Interacción y Manipulación del DOM

El **Modelo de Objetos del Documento (DOM)** es una representación en árbol de la estructura de una página HTML. JavaScript tiene la capacidad de interactuar y manipular este DOM, lo que le permite:
* **Modificar elementos**: Cambiar el contenido de texto, los atributos (como el `href` de un enlace) y los estilos de cualquier elemento HTML.
* **Crear y eliminar elementos**: Agregar nuevos elementos a la página o eliminar los existentes de manera dinámica.
* **Manejar eventos**: Responder a eventos del usuario como clics de ratón, pulsaciones de teclas o envíos de formularios, ejecutando funciones específicas.

Este proyecto utiliza estas capacidades para:
* Crear nodos de lista (`<li>`) a partir de objetos de tareas y agregarlos al DOM.
* Obtener los IDs de los checkboxes seleccionados en la interfaz.
* Actualizar dinámicamente el contenido de un modal con los detalles de una tarea.

### Ventajas de JavaScript para Aplicaciones Interactivas

JavaScript permite crear experiencias de usuario ricas y dinámicas directamente en el navegador, sin necesidad de comunicaciones constantes con el servidor. Algunas de sus ventajas son:
* **Interactividad en tiempo real**: Los usuarios pueden interactuar con la página y recibir retroalimentación instantánea, como la validación de un formulario antes de su envío o la actualización de una lista de tareas.
* **Carga asíncrona de datos**: Permite cargar datos desde un servidor en segundo plano sin recargar la página completa, lo que mejora la velocidad y la fluidez de la aplicación.
* **Lógica en el cliente**: Al ejecutar la lógica directamente en el navegador, se reduce la carga del servidor y se mejora el rendimiento de la aplicación.
* **Ecosistema extenso**: La vasta cantidad de frameworks y bibliotecas (como React, Angular y Vue) simplifica el desarrollo de aplicaciones complejas.

### Ejemplos en este Proyecto

En la aplicación `Check-List`, JavaScript es esencial para las siguientes funcionalidades:
* **Validación de formularios**: El formulario de ingreso de tareas utiliza la validación de Bootstrap y la lógica de JavaScript para asegurar que los campos no estén vacíos antes de agregar una tarea.
* **Listas dinámicas**: Las listas de tareas (`pendientes` y `listas`) se construyen dinámicamente con los datos de las tareas creadas por el usuario.
* **Control de flujo de datos**: Las tareas se mueven entre las listas al hacer clic en los botones de "mover", lo que refleja un cambio en el estado de la tarea.
* **Manejo de eventos**: El código utiliza `event listeners` para capturar acciones del usuario como el envío del formulario o el clic en los botones de eliminar y ver detalles.