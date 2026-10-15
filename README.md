# Puente Solidario

Directorio estático de organizaciones sociales con fuentes institucionales públicas de Medellín y Marinilla. Construido con HTML5, CSS3 y JavaScript vanilla; no usa backend, bases de datos ni compilación.

## Abrir localmente

Abre `index.html` en un navegador moderno. Google Fonts, Bootstrap Icons y las fotografías externas requieren conexión a Internet. La búsqueda, filtros, tarjetas y detalles funcionan localmente.

## Contenido y límites

Las fichas y la fecha de revisión están en `js/data.js`. Las fotografías son ilustrativas y no representan sedes ni beneficiarios reales de las organizaciones. Los enlaces de fuente de cada ficha permiten contrastar su información. La etiqueta “Fuente institucional” significa que se cotejaron datos básicos en un canal oficial; no es una certificación de existencia jurídica o actividad presente. Las ubicaciones son sedes publicadas en fuentes institucionales. No se publican cuentas bancarias.

Se incluyen diecisiete organizaciones con fuente pública accesible para esta versión: FAN, Fundación Integrar, Fundación Las Golondrinas, Banco Arquidiocesano de Alimentos de Medellín, Fundación Carla Cristina, Fundación Gente Unida, Centro de Bienestar del Anciano San José de Marinilla, FUSOAN, FNESA, Fundación Compasión, Otro Rumbo Fundación, Corporación Vida Justicia y Paz del Oriente Antioqueño, Fundación Hablemos por Ellos, FUNITSER, Fundación Hogar del Desvalido, Fundación Betania Integral Colombia y Fundación Ximena Rico Llano. Otras entidades de la lista inicial no se incluyeron porque en esta revisión no se contrastó suficiente información institucional para publicar una ficha responsable.

## Mantener el directorio

1. Edita `js/data.js` y agrega un objeto a `window.ORGANIZATIONS` siguiendo los campos de las fichas existentes.
2. Incluye al menos una fuente pública y una fecha ISO `YYYY-MM-DD` de revisión.
3. Usa teléfono/WhatsApp solo si aparece en un canal institucional; WhatsApp debe contener código país y dígitos únicamente (por ejemplo `573001234567`).
4. No inventes misión, sede, donaciones o redes. Deja el campo vacío si no está publicado.
5. Para cada causa, agrega el nombre en `tags` y comprueba que tenga respaldo en la fuente citada.
6. Las imágenes remotas deben ser ilustrativas salvo que exista permiso/contexto para presentarlas como institucionales. Mantén el crédito o URL fuente si agregas imágenes institucionales.
7. Revisa enlaces y datos de nuevo antes de publicar cambios.

## Estructura

- `index.html`: contenido semántico y secciones.
- `css/styles.css`: identidad visual y diseño responsive.
- `js/data.js`: fichas y causas.
- `js/main.js`: renderizado seguro del DOM, búsqueda, filtros, detalles accesibles y fecha dinámica.
- `assets/icons/favicon.svg`: marca vectorial del proyecto.

## Publicar

### GitHub Pages

Sube estos archivos a un repositorio GitHub. En **Settings → Pages**, selecciona la rama y la carpeta raíz (`/`). El archivo `index.html` queda como página de entrada. Usa la URL que GitHub Pages entrega.

### Netlify

Arrastra la carpeta raíz al área de despliegue manual de Netlify o conecta el repositorio. No configures comando de build; el directorio de publicación es la raíz del proyecto.

## Privacidad y contacto

Este sitio no tiene formularios, analítica, cookies ni procesamiento de datos. Los enlaces `mailto:` usan `contacto@ejemplo.com` como marcador de posición; configúralo con un buzón administrado antes de publicar. El aviso de privacidad en el pie explica el carácter estático del sitio. Puente Solidario es informativo e independiente, no representa a las entidades ni recauda donaciones.




