# Proyecto Reto-React

## Instalación

Para instalar las dependencias del proyecto, se recomienda usar el siguiente comando con la opción `--legacy-peer-deps`.

```bash
npm i --legacy-peer-deps
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Construye el proyecto para producción.

## Estructura del Proyecto

- `src/`: Contiene el código fuente del proyecto.
- `public/`: Contiene archivos estáticos.


# Uso de Patrones en el Proyecto

Este proyecto emplea varios patrones de diseño de React para garantizar la escalabilidad, reutilización y claridad en la estructura de los componentes. A continuación, se describen los principales patrones implementados:

## Componente de Orden Superior (Higher-Order Component, HOC)

Aunque no se muestra explícitamente en el código proporcionado, el proyecto utiliza el concepto de HOCs para reutilizar lógica de componentes. Un HOC es una función que toma un componente y retorna un nuevo componente con funcionalidades extendidas.

- **Ejemplo en este proyecto:**  
  - `SongListProvider` funciona como un HOC, envolviendo a sus hijos y proporcionándoles acceso al contexto.

## Composición de Componentes

La composición de componentes permite construir componentes complejos combinando componentes más simples. Este patrón fomenta la reutilización y facilita la lectura del código.

- **Ejemplo:**  
  - `SongContext` envuelve a sus hijos con `SongListProvider`, lo que permite compartir la lógica de estado en diferentes niveles del árbol de componentes.
