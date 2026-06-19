# QR Generator

Aplicación web para generar códigos QR a partir de cualquier URL o texto, con diseño neumórfico, opciones de personalización y exportación de imagen.

---

## Vista previa

> Abre `index.html` en tu navegador — no requiere instalación ni servidor.

---

## Características

- Genera códigos QR desde cualquier URL o texto
- Selector de tamaño: S (200px) · M (260px) · L (340px)
- Color personalizable para los módulos del QR
- Exporta el QR como PNG con quiet zone (margen blanco ISO 18004)
- Copia el QR directo al portapapeles
- Botón Limpiar que restablece todos los campos a sus valores por defecto
- Diseño neumórfico responsivo, adaptado a mobile desde 375px
- Accesible: atributos `aria-*`, `role`, `focus-visible`, `prefers-reduced-motion`

---

## Tecnologías

| Capa | Tecnología |
|---|---|
| Estructura | HTML5 semántico |
| Estilos | CSS3 con custom properties (variables) |
| Lógica | JavaScript ES6+ vanilla (módulos IIFE) |
| Generación QR | [qrcodejs](https://github.com/davidshimjs/qrcodejs) vía CDN |
| Fuente | Inter — Google Fonts |

---

## Estructura del proyecto

```
qr-generator/
├── index.html           # Estructura semántica — sin estilos ni lógica inline
├── css/
│   ├── variables.css    # Tokens de diseño: colores, sombras, espaciado, tipografía
│   ├── base.css         # Reset, accesibilidad, utilidades globales
│   ├── components.css   # Componentes reutilizables: botones, inputs, divider, QR frame
│   └── layout.css       # Card, secciones, espaciado, responsive
├── js/
│   ├── config.js        # Constantes globales (único lugar para cambiar valores)
│   ├── qrEngine.js      # Lógica pura de generación y exportación del QR
│   ├── ui.js            # Selectores DOM y helpers de interfaz
│   └── app.js           # Orquestador: inicialización y manejo de eventos
└── img/              # Recursos estáticos (favicon, imágenes)
```

---

## Arquitectura

El proyecto sigue el principio de **separación de responsabilidades**. Cada módulo tiene un único propósito y no conoce los detalles internos de los demás.

```
app.js  ──▶  ui.js       (manipulación del DOM)
        ──▶  qrEngine.js  (generación y exportación)
        ──▶  config.js    (constantes compartidas)
```

- **`config.js`** — fuente única de verdad para todos los valores configurables
- **`qrEngine.js`** — funciones puras que reciben parámetros y devuelven resultados; no tocan el DOM global
- **`ui.js`** — expone los elementos del DOM y helpers visuales; no contiene lógica de negocio
- **`app.js`** — conecta los módulos, registra eventos, orquesta el flujo

---

## Buenas prácticas de QR implementadas

| Práctica | Detalle |
|---|---|
| Corrección de errores nivel H | 30% de recuperación ante daño físico (rasgaduras, manchas) |
| Color de módulos near-black | `#1a1c24` — contraste superior al negro puro en papel no couché |
| Quiet zone al exportar | 20px de margen blanco añadido al guardar (recomendación ISO 18004) |
| Tamaño mínimo M = 260px | Legible desde ≈ 40 cm de distancia |

---

## Uso

1. Descarga o clona el repositorio
2. Abre `index.html` en cualquier navegador moderno
3. Ingresa una URL o texto, elige tamaño y color
4. Haz clic en **Generar QR**
5. Descarga con **Guardar PNG** o copia con **Copiar**

---



## Compatibilidad

Funciona en cualquier navegador moderno con soporte de ES6+ y Canvas API.  
La función **Copiar al portapapeles** requiere contexto seguro (HTTPS o localhost).

---

## Autora

**Karen Daniela Díaz Trochez**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/karen-daniela-diaz-trochez-dev/)
[![Portafolio](https://img.shields.io/badge/Portafolio-5a5e6b?style=flat&logo=globe&logoColor=white)](https://karen-daniela-dev.github.io/portafolio-software/)
