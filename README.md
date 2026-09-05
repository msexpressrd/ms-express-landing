# MS Express RD

Landing en español, implementada con Vinext/React. Incluye componentes reutilizables de navegación, demo conceptual, soluciones, proceso interactivo, áreas de impacto, valores, preguntas y formulario.

## Fuentes y marca

Fuente de verdad: https://msexpressrd.com/ (4 de septiembre de 2026), política de privacidad y términos enlazados desde la web. Servicios: consultoría, suministro de programas, desarrollo y mantenimiento. Sistemas: Financiero FAB, Facturación e Inventario FAB, Alquileres FAB y Dulus (web/app).

El encabezado original usa texto (HEADER_LOGO_TEXT_RENDERED), no un logo gráfico. Se conserva la identidad nominal MS Express / Multi Servicios Express con nueva composición tipográfica. El favicon es un monograma de esta propuesta.

Las interfaces se identifican como ilustrativas. No se inventan clientes, casos de éxito, resultados, certificaciones, precios o tecnologías. Las etapas son un recorrido propuesto y su alcance se acuerda por proyecto. Los resultados se presentan como objetivos. Se conservan el teléfono, correo y WhatsApp; no se añaden dirección ni redes no verificadas.

## Contacto

POST /api/contact valida datos en servidor y guarda en D1, tabla inquiries. No expone rutas de lectura. Incluye honeypot, origen, límites de tamaño, idempotencia y límite de consultas por correo. Los errores preservan el formulario. Los logs no contienen PII.

El éxito se muestra solamente después de persistir. El visitante puede continuar por WhatsApp con un mensaje preparado, que debe enviar personalmente. No se envía un correo automático ni se promete notificación. El propietario puede consultar inquiries con las herramientas de datos de Sites. Antes de operar comercialmente, conectar notificaciones autorizadas, retención y protección antiabuso adecuada al tráfico.

## Entrega y despliegue

La entrega inicial es privada y no indexable. Antes de abrirla al público: validar el contenido con MS Express, configurar contacto/notificaciones, actualizar indexación y canonical al dominio autorizado. La web msexpressrd.com original no se modifica.

Se usa la instalación y compilación de Sites. Generar cambios de esquema con npm run db:generate. No cambiar migraciones ya aplicadas.

Accesibilidad: salto al contenido, menú con gestión de foco, Tabs y Accordion Radix, labels, errores asociados, estado de éxito enfocable, pausa y prefers-reduced-motion. En móvil las soluciones usan acordeón. Sin videos ni imágenes externas. Tipografía Manrope autoalojada bajo SIL Open Font License.
