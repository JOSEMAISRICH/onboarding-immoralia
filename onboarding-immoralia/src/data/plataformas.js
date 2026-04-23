/**
 * Documentacion interna adaptada a la app (sin URLs).
 * El acceso real a cada herramienta (login, hojas, formularios) lo coordina tu responsable / Operaciones.
 */
export const plataformas = [
  {
    id: 'n8n',
    name: 'n8n',
    parrafos: [
      'n8n es una plataforma de automatizacion de flujos de trabajo (workflow automation): permite conectar aplicaciones y servicios sin programar todo desde cero, usando una interfaz visual basada en nodos.',
      'En la practica sirve para disparar acciones cuando ocurre algo: por ejemplo cuando llega un webhook, se crea una fila en una hoja, se envia un aviso a otro sistema o se encadenan varios pasos en serie o en paralelo.',
      'Conceptos clave: triggers (disparadores), nodos que transforman datos, credenciales seguras para APIs, y ejecuciones que puedes revisar en un historial para ver si algo fallo o tardo mas de lo normal.',
      'No sustituye a un gestor de tareas como ClickUp: se complementa con el para automatizar lo repetitivo entre herramientas (CRM, email, bases de datos, formularios, etc.).',
      'En Immoralia se usa para reducir trabajo manual entre sistemas. Tu responsable o el equipo de proyecto te dira que flujos te afectan, si debes tocar algo y donde ver logs o reintentos.',
    ],
  },
  {
    id: 'clickup',
    name: 'ClickUp',
    parrafos: [
      'Resumen: ClickUp centraliza tareas, listas, documentos y vistas (tablero, calendario, Gantt) para que el equipo vea el mismo plan, fechas y contexto sin depender solo del chat.',
      'En Immoralia es el hub operativo del dia a dia: trabajo por cliente y area, comentarios y adjuntos en la tarea, y enlaces desde Slack cuando toque.',
      'Lo detallado (bloque Formacion dia a dia, plantilla de Growth Meet con subtareas, formularios, permisos) conviene tenerlo en el espacio de ClickUp del equipo: usa el enlace de abajo cuando tu responsable lo haya compartido o este configurado en la app.',
    ],
  },
  {
    id: 'slack',
    name: 'Slack',
    parrafos: [
      'Slack es una plataforma de comunicacion para equipos: combina mensajeria en tiempo real con canales tematicos, hilos, busqueda potente e integraciones con otras herramientas (alertas, bots, enlaces a ClickUp, etc.).',
      'A diferencia del solo correo, agrupa conversaciones por proyecto o tema; los hilos evitan saturar el canal principal y el historial queda indexado para quien entre despues.',
      'Canales por proyecto y temas de equipo: usa el canal correcto para que la informacion llegue a quien corresponde sin mezclar contextos.',
      'Recordatorio sobre las 9:00 (hora Espana): actualiza tu estado (animo y carga del dia) para que el equipo se coordone y respete limites.',
      'Comida: reserva bloque en tu calendario recurrente y marca estado en Slack (por ejemplo con emoji de reloj) para que no te interrumpan en la pausa.',
      'Fichaje y cambios en Holded: usa el canal de Slack de solicitudes de cambios que indique la empresa (no improvises otro canal).',
      'Novedades utiles: canal #ah-mira-que-he-encontrado para compartir hallazgos.',
      'Si falta algun canal o permiso, pidelo por los canales generales o a tu responsable.',
    ],
  },
  {
    id: 'whimsical',
    name: 'Whimsical',
    parrafos: [
      'Whimsical es una herramienta colaborativa en la nube para crear diagramas de flujo, wireframes de pantallas, mapas mentales y documentos ligeros con apariencia limpia y rapida de editar.',
      'Se usa mucho para alinear vision antes de pasar a diseno final: flujos de usuario, arquitectura de una campana, o esquemas de proceso que luego se pueden compartir con cliente o equipo interno.',
      'No es un repositorio de codigo ni un gestor de proyectos: complementa a ClickUp y Slack aportando una capa visual clara. El acceso al espacio del equipo te lo facilita tu responsable.',
    ],
  },
  {
    id: 'hostinger',
    name: 'Hostinger',
    parrafos: [
      'Hostinger es un proveedor de alojamiento web y servicios asociados: hosting compartido, WordPress gestionado, correo profesional, dominios, DNS y en muchos casos panel de control (hPanel) para gestionar sitios, bases de datos y certificados SSL.',
      'En una agencia digital encaja cuando hay que desplegar landings, entornos de prueba, correo en el dominio del cliente o apuntar dominios y subdominios a servidores concretos.',
      'Conceptos utiles: zona DNS (registros A, CNAME, MX), espacio en disco y transferencia, copias de seguridad y acceso FTP/SFTP o despliegue por Git segun el plan.',
      'Las credenciales del panel, acceso a DNS y propiedad del dominio suelen ser sensibles: no las compartas en canales publicos; pide a Operaciones o a tu responsable el flujo acordado para cada cliente o proyecto.',
      'Si te piden cambiar un registro o subir archivos, confirma entorno (produccion vs pruebas) y si hay ventana de mantenimiento; documenta el cambio en la tarea de ClickUp para trazabilidad.',
    ],
  },
  {
    id: 'holded',
    name: 'Holded',
    parrafos: [
      'Holded es un software de gestion empresarial pensado sobre todo para pymes en Espana: facturacion, contabilidad ligera, proyectos, inventario y, para el dia a dia del equipo, control horario y fichaje.',
      'En Immoralia lo usaras para registrar entradas, salidas y pausas segun la jornada acordada; es la referencia oficial para horas trabajadas frente a dudas o revisiones.',
      'Si hubo error, olvido o necesitas correccion (ausencia justificada, incidencia, olvido de fichaje): avisa primero a tu responsable y sigue el proceso del canal de Slack de solicitudes (formulario / pasos que marque Operaciones).',
      'No intentes corregir en solitario sin seguir el flujo: asi Operaciones y Finanzas mantienen datos alineados con nominas y reportes.',
    ],
  },
  {
    id: 'fichaje-diagrama',
    name: 'Proceso: ausencias y errores de fichaje',
    parrafos: [
      'Ademas de Holded y Slack, existe un diagrama interno (flujo en Lucidchart) que resume el camino recomendado: avisar al responsable, usar el formulario acordado en Slack y esperar confirmacion de que el registro en Holded quedo bien.',
      'Ese diagrama evita que cada uno improvise pasos distintos: siguelo cuando haya duda sobre ausencias, correcciones retroactivas o incidencias repetidas.',
      'No asumas que esta corregido hasta tener confirmacion escrita o el OK explicito de quien gestiona el proceso. Si tienes duda, pregunta a Operaciones o a tu TL.',
    ],
  },
  {
    id: 'calendario-equipo',
    name: 'Calendario del equipo: festivos, vacaciones y fechas',
    parrafos: [
      'El calendario compartido del equipo es la referencia para saber cuando hay laborable general, festivos, bloques de vacaciones de companeros, cumpleanos opcionales y otras fechas relevantes (reuniones fijas, entregas, etc.). Suscribete o guardalo en favoritos para no planificar reuniones criticas en dias que el grupo ya marco como no laborables.',
      'Festivos oficiales: en Espana entran en juego festivos nacionales, los de tu comunidad autonoma y a veces los locales del municipio. Un mismo dia puede ser laborable para un companero remoto en otro pais y festivo para ti: no compares solo por Slack; mira el calendario unificado.',
      'Puentes y dias de cierre: a veces la empresa o el cliente acuerdan no operar entre festivo y fin de semana. Eso puede figurar como bloque en el calendario o en un aviso de equipo; no asumas que “como es martes” hay reunion salvo confirmacion.',
      'Vacaciones retribuidas: suelen gestionarse por antelacion segun convenio o politica interna (cuantos dias al ano, periodos preferentes, solapamiento maximo en el equipo). Pide fechas con margen; evita picos de campana o entregas clave del cliente salvo acuerdo expreso con tu responsable y el AM.',
      'Como solicitarlas: el canal habitual es People / tu responsable / herramienta interna que indique la empresa (email, formulario, Holded). No cierres vacaciones en conversacion suelta sin registro: necesitas aprobacion y reflejo en sistemas para que fichaje, cobertura y expectativas del cliente cuadren.',
      'Registro en sistemas: una vez aprobadas, deja los dias visibles en Holded, en el calendario corporativo (Google, Outlook, etc.) y en ClickUp en las tareas o vistas donde el cliente o el equipo deban ver tu disponibilidad. Si cambia un dia, actualiza todo en el mismo movimiento para no generar dudas.',
      'Antes de irte de vacaciones: cierra o delega tareas abiertas, deja contexto en Slack o en la tarea de ClickUp (estado, siguiente paso, quien cubre), y avisa en los canales de proyecto con la fecha de retorno. Evita que el equipo descubra tu ausencia solo el dia que te vas.',
      'Durante vacaciones: desconecta si asi lo habeis acordado; si en tu rol debes estar para urgencias, deja claro en el calendario y en Slack como y cuando pueden contactarte.',
      'Al volver: revisa menciones y prioridades el primer dia util; si el calendario del cliente se movio mientras estabas fuera, alinea con tu AM o TL antes de prometer fechas nuevas.',
      'Dias sueltos, cambios de ultima hora o enfermedad: siguen las normas internas de aviso; muchas veces el mismo canal de solicitudes de Slack y Holded aplica para coherencia con fichaje y RRHH.',
      'Cumpleanos y eventos de equipo suelen ser informativos: no sustituyen a la comunicacion formal de ausencias. Usa el calendario como apoyo, no como unico aviso legal de disponibilidad.',
    ],
  },
  {
    id: 'referidos-calendly',
    name: 'Referidos: primeras llamadas',
    parrafos: [
      'Si recomiendas una marca alineada con vision y valores Immoralia: facilita el contacto de forma ordenada, avisa a tu lider y deja que el equipo de captacion haga el seguimiento profesional.',
      'Las primeras citas o llamadas de calificacion se coordinan con el proceso interno de captacion (enlace o agenda tipo Calendly u otra herramienta que te compartan; no cierres tu solo el proceso comercial salvo que tu rol lo indique).',
      'La recompensa por referido, cuando aplique el acuerdo interno, sigue la politica vigente que te explicara tu responsable.',
    ],
  },
  {
    id: 'lastpass',
    name: 'LastPass',
    parrafos: [
      'LastPass es un gestor de contrasenas: guarda credenciales cifradas, rellena formularios de forma segura y permite compartir entradas con el equipo sin enviar la contrasena en texto plano por chat.',
      'En agencias se usa para accesos compartidos a formaciones, herramientas de cliente o cuentas que no tienen login individual por persona.',
      'Buenas practicas: usa el cofre que te asignen, no dupliques entradas sin criterio, y revoca acceso cuando ya no corresponda. Si ves una entrada caducada o sospechosa, avisa.',
      'Si no tienes acceso o ves entradas caducadas, pregunta en Slack a Operaciones o a tu responsable; no compartas contrasenas por chat privado sin criterio de seguridad.',
    ],
  },
  {
    id: 'verticales',
    name: 'Ecosistema Immoral Marketing',
    parrafos: [
      'Immoral Marketing agrupa varias marcas o verticales bajo un mismo grupo: Immoral (marca grupo), Immoralia, Immedia, Imcontent, Imseo, Imloyal, Imfilms, Imfashion, cada una con foco de servicio y tipo de cliente.',
      'La idea es que el cliente entienda que hay profundidad tecnica y creativa distribuida, con equipos especializados segun el encargo (paid, contenido, SEO, fidelizacion, video, moda, etc.).',
      'Cada vertical tiene propuesta de valor propia; el documento interno de servicios explica como encajan con tipos de cliente y proyectos. Pide la version actualizada si trabajas en propuestas o naming.',
    ],
  },
  {
    id: 'growth-meets-sheet',
    name: 'Growth Meets (planificacion)',
    parrafos: [
      'Los Growth Meets son reuniones de crecimiento con el cliente: el nucleo mensual suele ser Team Leader + Account Manager; la revision trimestral puede incluir CEO segun calendario y tipo de cuenta.',
      'Sirven para alinear objetivos, resultados, riesgos y siguientes pasos; lo acordado debe quedar reflejado en tareas y documentacion en ClickUp.',
      'Las invitaciones suelen estar en el calendario compartido (viernes habituales en muchos equipos).',
      'Hay una hoja de seguimiento interna con fechas y estado: solicita acceso a tu TL o AM si necesitas editar o consultar el planning.',
    ],
  },
  {
    id: 'growth-meet-form-trim',
    name: 'Formulario Growth Meet trimestral',
    parrafos: [
      'Antes del meet trimestral con CEO, el AM rellena el formulario en ClickUp Forms con las respuestas acordadas con el cliente y el TL.',
      'El archivo o registro queda en el espacio Feedback meets del AM para trazabilidad y revision posterior.',
    ],
  },
  {
    id: 'paid-meets-sheet',
    name: 'Team Meets Paid (planificacion)',
    parrafos: [
      'Sesion semanal de formacion del area de paid media, los miercoles en el ritmo habitual del equipo.',
      'Cada semana hay un responsable de dinamizar la sesion y mantener el hilo de temas.',
      'Los temas se proponen en Slack; como referencia interna, se espera al menos dos intervenciones al mes por persona para compartir aprendizajes.',
      'La hoja de planificacion y turnos es interna: pidela a tu TL si no la ves en tu espacio.',
    ],
  },
  {
    id: 'lucid-meets',
    name: 'Lucidchart y diagramas internos',
    parrafos: [
      'Lucidchart (ecosistema Lucid) es una herramienta de diagramacion en linea: diagramas de flujo, mapas de procesos y esquemas tecnicos colaborativos.',
      'En Immoralia puede usarse junto a Whimsical segun el tipo de diagrama y permisos del espacio; en Lucidchart hay esquemas del flujo de Growth Meets, Paid Meets y recordatorios (parte de eso puede estar automatizada con Zapier, n8n u otras integraciones a nivel interno).',
      'Sirven para entender quien hace que y cuando. Si necesitas editarlos o solo consultarlos, pide permisos al equipo de Operaciones o a tu responsable.',
    ],
  },
  {
    id: 'gastos-empresa',
    name: 'Gastos de empresa (IOP)',
    parrafos: [
      'Regla de oro: aprobacion previa obligatoria (Operaciones / Slack o email a Administracion y Direccion segun el tipo de gasto). Ningun gasto “porque luego se justifica” sin haberlo acordado.',
      'Facturacion a nombre de la empresa: ADVERTISING MARKETING TEAM SLU, CIF B02638187, Paseo de Gracia 21, 08007 Barcelona.',
      'A fin de mes: envia factura resumen y ZIP de recibos a Finanzas con asunto del tipo: Factura + Nota de gastos | Mes, para que el cierre contable sea ordenado.',
    ],
  },
]
