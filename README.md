# Play-Farma - Automatización con Playwright

Suite de automatización y testing para validar funcionalidades en plataformas de farmacias.

## Sitios Objetivo

- **GetTheLook**: getthelook.com.ar
- **Farmacity**: farmacity.com

## Requisitos

- Node.js 16+
- npm o yarn

## Instalación

```bash
npm install
```

Esto instalará Playwright y todas las dependencias necesarias.

## Estructura del Proyecto

```
play-farma/
├── tests/
│   ├── specs/              # Archivos de pruebas
│   │   ├── getthelook.spec.ts
│   │   └── farmacity.spec.ts
│   ├── pages/              # Page Objects
│   │   ├── getthelook.page.ts
│   │   └── farmacity.page.ts
│   └── utils/              # Utilidades
│       └── helpers.ts
├── playwright.config.ts    # Configuración de Playwright
├── package.json
└── README.md
```

## Ejecutar Pruebas

### Todos los tests

```bash
npm test
```

### Tests específicos

```bash
npm run test:getthelook    # Solo GetTheLook
npm run test:farmacity     # Solo Farmacity
```

### Modos adicionales

```bash
npm run test:headed        # Con navegador visible
npm run test:debug         # Modo debug
npm run test:ui            # Interfaz interactiva
npm run test:report        # Ver último reporte HTML
```

## Configuración

El archivo `playwright.config.ts` contiene:

- Configuración de navegadores (Chrome, Firefox, Safari)
- Configuración de dispositivos móviles
- Reportes (HTML, JSON, JUnit)
- Screenshots y videos en fallos

## Reportes

Después de ejecutar las pruebas, ver el reporte HTML:

```bash
npm run test:report
```

## Próximos Pasos

1. Crear archivos de test en `tests/specs/`
2. Definir Page Objects en `tests/pages/`
3. Implementar utilidades en `tests/utils/`
4. Ejecutar y validar pruebas
