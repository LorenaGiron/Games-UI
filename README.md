<div align="center">
  <h1>Plataforma de Videojuegos</h1>
  <p><i>Interfaz web dinámica para la exploración de catálogo, noticias y contenido multimedia de videojuegos consumiendo una API REST.</i></p>
</div>

## 📖 Sobre el Proyecto

Este proyecto consiste en el desarrollo del frontend para un portal digital de videojuegos. A diferencia de una página estática tradicional, la interfaz se alimenta de forma completamente dinámica consumiendo datos de una API REST externa, lo que permite mantener el catálogo de juegos, categorías y noticias siempre actualizados.

El enfoque principal de este desarrollo es demostrar una sólida capacidad de maquetación, diseño responsivo y, sobre todo, el manejo de asincronismo y manipulación del DOM mediante Vanilla JavaScript, asegurando un rendimiento óptimo sin depender de frameworks externos.

### 🚀 Características de la Plataforma

La aplicación está dividida en múltiples módulos funcionales:

*   **Catálogo Dinámico (`index.html`):** Pantalla de inicio donde los elementos destacados y las ofertas se renderizan en tiempo real a partir de las respuestas de la API.
*   **Exploración y Filtros (`categorias.html`, `genero.html`):** Vistas dedicadas para la búsqueda de juegos específicos, realizando peticiones a endpoints filtrados por categoría o género.
*   **Tablas de Clasificación (`top.html`):** Sección diseñada para extraer y visualizar los juegos mejor valorados o más populares según los datos del servidor.
*   **Centro de Noticias y Media (`noticias.html`, `videos.html`):** Hub de información que consume endpoints de actualizaciones del mundo gaming y galería multimedia.
*   **Ficha de Producto (`detalles.html`):** Sistema de enrutamiento basado en parámetros (URL o LocalStorage) para hacer una petición específica y mostrar los detalles, sinopsis y requisitos de un solo videojuego.

## 🛠️ Tecnologías Utilizadas

*   **HTML5 Semántico:** Estructuración del contenido optimizada para accesibilidad y correcta jerarquía de la información.
*   **CSS3 Modular:** Arquitectura de estilos separada por componentes y vistas para un mantenimiento eficiente del código y una UI consistente.
*   **Vanilla JavaScript (ES6+):** Implementación de la lógica de interfaz utilizando `Fetch API`, `Promesas` y `Async/Await` para la gestión de peticiones HTTP, manejo de JSON y renderizado dinámico en el DOM.

## 📂 Arquitectura del Proyecto

El código está organizado de forma limpia, separando claramente la lógica de consumo de datos, los estilos y las vistas:

```text
NexusGames-Frontend
 ┣ css          
 ┣ js           
 ┣ index.html   
 ┣ detalles.html
 ┣ categorias.html
 ┣ genero.html
 ┣ top.html
 ┣ noticias.html
 ┗ videos.html
