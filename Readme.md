# Menú Master

Aplicacion web desarrollada con HTM, CSS yJavaScript Ppara buscar recetas, guardar favoritas y planificar comidas durante la semana.

## Descripción

Menú Master  permite buscar recetas usando una API externa, consultar detalles completos de cada  receta, guardar recetas favoritas y crear una planificación semanal de comidas.

## Funcionalidades

- Búsqueda de recetas por nombre.
- Consulta de detalles de receta.
- Visualizacion de ingredientes.
- Visualizacion de instrucciones.
- Traducción automática de recetas mediante API externa.
- Internacionalización dinámica del contenido (multi-idioma).
- Receta aleatoria.
- Gestión de favoritos.
- Planificación semanal.
- Eliminacion de recetas del plan.
- Persistencia de datos con LocalStorage.
- Diseño responsive.

## Internacionalización parcial

La aplicación consume datos desde TheMealDB, una API externa que devuelve la mayoría del contenido en inglés. Para mejorar la experiencia del usuario en español, se implementó una capa local de traducción para ingredientes, categorías, origen de recetas e instrucciones personalizadas por ID de receta.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- ES Modules
- Fetch API
- Async/Await
- LocalStorage
- TheMealDB API

## Estructura del proyecto


```txt
app-recetas-js/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── api.js
│   ├── storage.js
│   ├── ui.js
│   └── app.js
│   └──translations.js
│   |── tranlator.js
└── README.md

## 🌐 Traducción e internacionalización

La aplicación incorpora un sistema de traducción dinámica que permite convertir automáticamente el contenido proveniente de la API (TheMealDB) del inglés a otros idiomas utilizando una API de traducción externa.

Esto incluye:

- Traducción de instrucciones de recetas.
- Traducción de ingredientes en tiempo real.
- Soporte para múltiples idiomas.

Tecnologías utilizadas:

- API externa de traducción (LibreTranslate).
- JavaScript (fetch, Promises).