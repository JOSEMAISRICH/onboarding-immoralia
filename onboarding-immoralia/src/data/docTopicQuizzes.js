/** Una pregunta de repaso por ficha de documentacion (10 pts si aciertas). */
export const DOC_MICRO_POINTS = 10

/** @type {Record<string, { question: string, options: string[], correctIndex: number }[]>} */
export const preguntasPorDocTopic = {
  verticales: [
    {
      question: 'Cual NO es marca / vertical del ecosistema Immoral Marketing?',
      options: ['Imfilms', 'Imfashion', 'Immoralia', 'HubSpot'],
      correctIndex: 3,
    },
  ],
  n8n: [
    {
      question: 'n8n en Immoralia se usa sobre todo para:',
      options: [
        'Sustituir por completo a ClickUp',
        'Automatizar flujos e integraciones entre herramientas',
        'Gestionar nominas',
        'Almacenar contrasenas del equipo',
      ],
      correctIndex: 1,
    },
  ],
  slack: [
    {
      question: 'Slack: el recordatorio matinal de estado sirve para:',
      options: [
        'Solo marcar vacaciones',
        'Compartir animo y carga del dia; respetar estados ajenos',
        'Publicar metricas de clientes obligatorias',
        'Reemplazar las reuniones 1:1',
      ],
      correctIndex: 1,
    },
  ],
  clickup: [
    {
      question: 'ClickUp: donde registras formacion y la plantilla tipica de Growth Meet?',
      options: [
        'Solo en un documento suelto sin vincular',
        'Bloque Formacion + tareas/plantilla Growth Meet con subtareas',
        'Solo en el calendario del cliente',
        'Solo en email',
      ],
      correctIndex: 1,
    },
  ],
  holded: [
    {
      question: 'Errores o ausencias en Holded: que hacer primero?',
      options: [
        'Abrir ticket anonimo sin avisar a nadie',
        'Avisar a tu responsable y seguir el canal de Slack de solicitudes',
        'Editar a mano sin confirmacion',
        'Solo enviar email a un buzon generico sin contexto',
      ],
      correctIndex: 1,
    },
  ],
  whimsical: [
    {
      question: 'Whimsical se usa principalmente para:',
      options: [
        'Fichaje y nominas',
        'Diagramas, wireframes y mapas de proceso',
        'Facturacion a clientes',
        'Backup de contrasenas',
      ],
      correctIndex: 1,
    },
  ],
  hostinger: [
    {
      question: 'Hostinger es, sobre todo, un proveedor de:',
      options: [
        'Gestion de proyectos tipo ClickUp',
        'Alojamiento web, dominios y DNS (panel tipo hPanel)',
        'Mensajeria interna tipo Slack',
        'Fichaje y nominas',
      ],
      correctIndex: 1,
    },
  ],
  'fichaje-diagrama': [
    {
      question: 'Tras solicitar correccion de fichaje con el flujo acordado, cuando das por cerrado el tema?',
      options: [
        'En cuanto envias el formulario',
        'Cuando tengas confirmacion de que Holded quedo bien',
        'Al dia siguiente sin mas',
        'Cuando el cliente lo confirme',
      ],
      correctIndex: 1,
    },
  ],
  'calendario-equipo': [
    {
      question:
        'Antes de un periodo de vacaciones ya aprobadas, que ayuda mas al equipo ademas de registrarlas donde toque?',
      options: [
        'No avisar en proyecto hasta el ultimo dia',
        'Cerrar o delegar tareas, dejar contexto en ClickUp/Slack y fechas visibles en calendario compartido',
        'Asumir que el calendario personal basta para el equipo',
        'Cancelar todas las reuniones sin mensaje',
      ],
      correctIndex: 1,
    },
  ],
  'referidos-calendly': [
    {
      question: 'Tienes un lead bueno alineado con Immoralia. Paso clave:',
      options: [
        'Llevar tu solo el pipeline sin avisar',
        'Facilitar contacto, avisar a tu lider; captacion hace seguimiento',
        'Pasar el contacto solo por DM sin contexto',
        'Esperar a tener propuesta cerrada',
      ],
      correctIndex: 1,
    },
  ],
  lastpass: [
    {
      question: 'Credenciales compartidas del equipo para formaciones: donde suele estar el acceso?',
      options: [
        'Archivo de contrasenas en Drive publico',
        'LastPass (pide ayuda en Slack si no entras)',
        'Canal publico con logins en texto plano',
        'Solo el correo de bienvenida sin actualizar',
      ],
      correctIndex: 1,
    },
  ],
  'growth-meets-sheet': [
    {
      question: 'Growth Meet mensual habitual: nucleo tipico de participacion?',
      options: ['CEO y cliente', 'Team Leader y Account Manager', 'Solo AM', 'Solo People'],
      correctIndex: 1,
    },
  ],
  'growth-meet-form-trim': [
    {
      question: 'Antes del Growth Meet trimestral con CEO, quien rellena el formulario en ClickUp Forms?',
      options: ['El CEO', 'El Account Manager', 'Operaciones', 'El cliente externo'],
      correctIndex: 1,
    },
  ],
  'paid-meets-sheet': [
    {
      question: 'Team Meets Paid (formacion del area): ritmo y dia habituales?',
      options: [
        'Bisemanal sin responsable',
        'Semanal miercoles; responsable rotativo; temas desde Slack',
        'Solo cuando el CEO agenda',
        'Mismo dia y hora que el Coffee Meet obligatorio',
      ],
      correctIndex: 1,
    },
  ],
  'lucid-meets': [
    {
      question: 'Los diagramas en Lucidchart de meets y automatizacion sirven para:',
      options: [
        'Sustituir Slack',
        'Entender quien hace que y cuando en procesos internos',
        'Publicar la web de la empresa',
        'Gestionar gastos',
      ],
      correctIndex: 1,
    },
  ],
  'gastos-empresa': [
    {
      question: 'Gastos de empresa: regla de oro antes de pagar?',
      options: [
        'Gastar si es pequeno y justificar despues',
        'Aprobacion previa segun el caso (Operaciones / Admin / Direccion)',
        'OK verbal del cliente basta',
        'Usar tarjeta empresa si parece operativo',
      ],
      correctIndex: 1,
    },
  ],
}
