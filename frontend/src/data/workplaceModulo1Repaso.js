/**
 * Modulo 1 alternativo (no Immoralia): 21 micro-quiz sobre la teoria del espacio.
 * 10 pts por acierto; max 210 (igual que fichas Immoralia).
 */

function q(id, title, question, options, correctIndex) {
  return { id, title, question, options, correctIndex }
}

export const modulo1General = [
  q('g1', 'Onboarding', 'Los minijuegos sirven sobre todo para:', ['Solo decorar', 'Practicar y puntuar; la teoria va aparte', 'Evitar leer', 'Reemplazar al responsable'], 1),
  q('g2', 'Trazabilidad', 'Antes de pedir accesos, que suele recomendarse?', ['Nada', 'Mirar documentacion interna o Slack', 'Pedir al CEO siempre', 'Crear cuenta nueva'], 1),
  q('g3', 'ClickUp', 'ClickUp se usa mucho para:', ['Solo chat', 'Tareas, fechas y contexto del trabajo', 'Solo nominas', 'DNS'], 1),
  q('g4', 'Slack', 'Los hilos en Slack ayudan a:', ['Perder mensajes', 'No saturar el canal y mantener contexto', 'Evitar busquedas', 'Borrar historial'], 1),
  q('g5', 'Holded', 'Holded en operativa diaria suele usarse tambien para:', ['Solo CRM externo', 'Fichaje y control horario cuando aplica', 'Codigo', 'Diseno'], 1),
  q('g6', 'Cliente', 'En cultura, el cliente se ve sobre todo como:', ['Factura', 'Aliado estrategico', 'Competidor', 'Usuario anonimo'], 1),
  q('g7', 'Compromisos', 'Si no vas a cumplir una fecha, se espera:', ['Silencio', 'Avisar con antelacion', 'Borrar la tarea', 'Culpar al cliente'], 1),
  q('g8', 'Respuesta', 'En horario laboral, chats/emails de clientes suelen esperar respuesta en:', ['Una semana', 'Menos de 1 hora como regla general', 'Nunca', 'Solo lunes'], 1),
  q('g9', 'Informacion', 'Sobre acuerdos, la cultura busca:', ['Todo verbal sin registro', 'Registrar y compartir; no depender solo de memoria', 'Solo llamadas', 'Evitar compromisos'], 1),
  q('g10', 'Formacion', 'Formacion util: donde compartir hallazgos y como registrar?', ['Solo papel', 'Canal Slack indicado + tarea en ClickUp en Formacion', 'Solo a clientes', 'No documentar'], 1),
  q('g11', 'Slack estado', 'El estado en Slack por la manana sirve para:', ['Nada', 'Coordinar animo y carga; respetar estados ajenos', 'Esconderse', 'Solo vacaciones'], 1),
  q('g12', 'Gastos', 'Antes de un gasto con fondos de empresa:', ['Gastar y pedir perdon', 'Aprobacion previa segun politica', 'Solo si > 50k', 'Sin reglas'], 1),
  q('g13', 'Vacaciones', 'Antes de vacaciones, buena practica:', ['Desaparecer', 'Continuidad, delegacion y avisos en canales/correo', 'Solo Slack el ultimo dia', 'Borrar tareas'], 1),
  q('g14', 'Festivos', 'Si tu festivo local no esta claro en calendario:', ['Asumir laborable', 'Avisar a tu responsable con tiempo', 'Ignorar', 'Improvisar'], 1),
  q('g15', 'Growth Meet', 'El Growth Meet mensual habitual suele ser entre:', ['CEO y People', 'Team Leader y Account Manager', 'Solo externos', 'Solo admin'], 1),
  q('g16', 'Propuestas', 'El CSO suele aportar en propuestas:', ['Solo creatividad', 'Viabilidad, margen y estandares', 'Solo legal', 'Nada'], 1),
  q('g17', 'People', 'People se enfoca mucho en:', ['Cerrar ventas', 'Talento, onboarding y experiencia del equipo', 'Solo IT', 'Solo paid'], 1),
  q('g18', 'CFO', 'El CFO se centra sobre todo en:', ['Diseno final', 'Finanzas, presupuesto y rentabilidad', 'Community diaria', 'Solo Slack'], 1),
  q('g19', 'COO', 'El COO impulsa sobre todo:', ['Solo creatividad', 'Procesos, eficiencia y quitar fricciones operativas', 'Ventas externas', 'Solo hosting'], 1),
  q('g20', 'Referidos', 'Si traes un posible cliente, suele encajar:', ['Cerrar tu solo el precio', 'Conectar por flujo acordado y avisar a liderazgo/captacion', 'Ignorar captacion', 'Mandar solo un emoji'], 1),
  q('g21', 'Mejora', 'Feedback a sistemas/procesos: se espera sobre todo:', ['Solo quejas', 'Feedback concreto y propuesta de mejora', 'Silencio', 'Culpar a un rol'], 1),
]

export const modulo1Immedia = [
  q('m1', 'Head', 'El Head de immedia reporta principalmente a:', ['CSO', 'CEO', 'Cliente', 'CFO'], 1),
  q('m2', 'Especialista', 'El especialista reporta principalmente a:', ['CEO', 'Head de immedia', 'COO', 'Cliente'], 1),
  q('m3', 'Foco', 'El especialista se enfoca en:', ['Balances', 'Implementar y optimizar campanas en plataformas', 'Nominas', 'Legal'], 1),
  q('m4', 'KPI Head', 'Un KPI del Head incluye cuentas con objetivos cumplidos con meta tipica:', ['0%', '≥ 80%', '100% siempre', '50%'], 1),
  q('m5', 'Rentabilidad', 'La rentabilidad del area incluye en esencia:', ['Solo ingresos', 'Ingresos menos costes de equipo y herramientas, relativo a ingresos', 'Solo horas', 'Solo CTR'], 1),
  q('m6', 'Cliente', 'El especialista como regla general:', ['Es siempre el unico contacto', 'No es el contacto principal salvo casos puntuales', 'Ignora al Head', 'Cierra contratos'], 1),
  q('m7', 'Reporting', 'En reporting se menciona a menudo:', ['Solo Word', 'Looker Studio u otras herramientas de dashboards', 'Nada', 'Solo Excel offline'], 1),
  q('m8', 'Optimizacion', 'Documentar optimizaciones busca:', ['Ocultar', 'Trazabilidad y aprendizaje', 'Evitar cliente', 'Borrar datos'], 1),
  q('m9', 'Metodologia', 'En direccion del servicio se alinea con:', ['Solo branding estatico', 'Brandformance for Growth', 'Ninguna', 'Solo SEO'], 1),
  q('m10', 'New Business', 'El Head en New Business suele:', ['Cerrar margen sin CSO', 'Validar viabilidad y estimaciones', 'Evitar reuniones', 'Sustituir AM siempre'], 1),
  q('m11', 'Plataformas', 'Ejemplos habituales de trabajo:', ['Solo email', 'Meta, Google, TikTok, YouTube Ads…', 'Solo TikTok siempre', 'Ninguna'], 1),
  q('m12', 'Presupuesto', 'Decision final de inversion suele:', ['Ser solo del especialista', 'Estar alineada con director/estrategia', 'Ser aleatoria', 'Ser solo del cliente sin datos'], 1),
  q('m13', 'COO', 'Coordinacion con COO puede ayudar a:', ['Evitar equilibrio', 'Cargas de trabajo equilibradas', 'Eliminar reporting', 'Sustituir CEO'], 1),
  q('m14', 'Creatividad', 'Antes de lanzar, revisar creatividades suele ser:', ['Opcional siempre', 'Importante para alinear formato y mensaje', 'Prohibido', 'Solo para CEOs'], 1),
  q('m15', 'KPI ejecucion', 'Campanas lanzadas vs plan busca meta:', ['0%', '100% cuando hay estructura (y IOPS donde aplique)', '50%', 'No medir'], 1),
  q('m16', 'IFTTT', 'El KPI de IFTTT contrasta semanas:', ['De vacaciones', 'Con uso de la logica vs semanas sin objetivo', 'Solo creativas', 'De diseño'], 1),
  q('m17', 'Tareas', 'Tareas sin retrasos mide:', ['Solo reuniones', 'Hechas vs planificadas en el dia', 'Solo email', 'Nada'], 1),
  q('m18', 'Areas', 'Colaborar con imcontent/imseo busca:', ['Silos', 'Estrategias integradas', 'Evitar datos', 'Duplicar sin criterio'], 1),
  q('m19', 'Performance', 'ROAS/CPA/CPL son ejemplos de:', ['Solo RRHH', 'Metricas de performance', 'Solo branding', 'Legal'], 1),
  q('m20', 'Automatizacion', 'Automatizar procesos internos puede apoyarse en:', ['Solo papel', 'Colaboracion con automatizacion/n8n segun caso', 'Ignorar herramientas', 'Eliminar documentacion'], 1),
  q('m21', 'Equipo', 'El Head lidera al equipo operativo con:', ['Sin feedback', 'Prioridades, 1:1 y formacion', 'Sin prioridades', 'Solo castigos'], 1),
]

export const modulo1Imcontent = [
  q('c1', 'Head', 'El Head de imcontent reporta principalmente a:', ['COO', 'CEO', 'Cliente', 'People'], 1),
  q('c2', 'Mision', 'El area busca contenido que:', ['Solo sea viral', 'Construya marca y conecte con audiencias con objetivos de negocio', 'Evite metricas', 'Solo texto largo'], 1),
  q('c3', 'Ejecucion diaria', 'El Head ejecuta el 100% del diseno/copy/video diario?', ['Si', 'No: coordina equipo multidisciplinar', 'Solo si es junior', 'Nunca'], 1),
  q('c4', 'Precios', 'Definir precios de propuestas sin validacion:', ['Correcto si hay prisa', 'No: CSO y CFO validan', 'Siempre el Head solo', 'Solo el cliente'], 1),
  q('c5', 'Disenador Senior', 'El Disenador Senior:', ['Lidera evaluaciones del equipo', 'Ejecuta piezas fuertes sin ser Head', 'Define paid global', 'Es CFO'], 1),
  q('c6', 'Video', 'Video/Motion se enfoca en:', ['Estrategia global sin brief', 'Audiovisual, motion y exportaciones por plataforma', 'Nominas', 'Solo copy'], 1),
  q('c7', 'Community', 'Community Manager suele:', ['Definir paid sin validacion', 'Planificar, publicar y moderar con datos', 'Solo disenar', 'Ignorar calendario'], 1),
  q('c8', 'Comercial', 'El Head hace tareas comerciales?', ['Siempre cierra ventas', 'No, salvo colaboracion tecnica/creativa', 'Sustituye CSO', 'Ignora AM'], 1),
  q('c9', 'KPI entregas', 'Entregas en tiempo mide:', ['Solo likes', 'Entregas sin retrasos ni errores vs planificadas', 'Solo reuniones', 'Nada'], 1),
  q('c10', 'Rentabilidad', 'Rentabilidad del area usa en esencia:', ['Solo seguidores', 'Ingresos menos costes, relativo a ingresos', 'Solo impresiones', 'Nada'], 1),
  q('c11', 'Influencers', 'Sobre influencers y UGC el Head suele:', ['Ignorar contratos', 'Supervisar alineacion estrategica', 'Sustituir legal', 'No revisar entregables'], 1),
  q('c12', 'RRSS', 'Estrategia de redes incluye:', ['Solo DMs', 'Calendario, tono e interaccion', 'Solo facturacion', 'Nada'], 1),
  q('c13', 'New Business', 'Validar propuestas de content busca:', ['Solo velocidad', 'Coherencia con capacidades y tiempos', 'Ignorar AM', 'Sin revision'], 1),
  q('c14', 'Disenador', 'Documentar en Notion/ClickUp es:', ['Opcional siempre', 'Parte de buena practica', 'Prohibido', 'Solo para externos'], 1),
  q('c15', 'Briefs', 'Briefs claros ayudan a:', ['Confundir', 'Alinear diseno, copy y video', 'Evitar revisiones siempre', 'Eliminar marca'], 1),
  q('c16', 'Rendimiento', 'Creatividad con foco en rendimiento mira:', ['Solo premios', 'Engagement, CTR, conversiones…', 'Solo impresiones', 'Nada'], 1),
  q('c17', 'Colaboracion', 'Coordinar con otras areas busca:', ['Silos', 'Piezas integradas', 'Evitar clientes', 'Duplicar sin criterio'], 1),
  q('c18', 'Community KPI', 'Publicaciones segun calendario buscan:', ['0%', '100% de posts en tiempo vs plan', '50%', 'No medir'], 1),
  q('c19', 'IA', 'Automatizacion/IA se usa para:', ['Eliminar calidad', 'Eficiencia y escalado con criterio', 'Ignorar revisiones', 'Solo gratis'], 1),
  q('c20', 'Head NO', 'El Head NO ejecuta normalmente:', ['Estrategia', 'Tareas diarias de diseno/redaccion/publicacion como operativa principal', 'Coordinar equipo', 'Validar propuestas'], 1),
  q('c21', 'Cliente', 'En cuentas asignadas el Head es referente de contenido frente a:', ['Solo interno', 'Cliente', 'Solo proveedor', 'Nadie'], 1),
]
