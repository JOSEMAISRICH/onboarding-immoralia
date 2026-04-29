/**
 * Teoria interna Immedia: roles Head y Especialista.
 * Contenido orientativo; la version oficial la marca People / el area.
 */

export const immediaHead = {
  title: 'Head de immedia',
  reportaA: 'CEO',
  colaboraCon:
    'Heads de otras areas (imcontent, imseo, imloyal, immoralia, etc.).',
  lideraA: 'Equipo operativo del area (segun organigrama vigente).',
  resumen:
    'El Head de immedia es el responsable maximo del area. Su rol combina direccion estrategica del servicio, gestion de equipo y relacion directa con clientes. Asegura que el departamento este alineado con la vision de immoral, entregue resultados rentables medibles y evolucione constantemente en calidad, innovacion y eficiencia.',
  responsabilidades: [
    {
      titulo: 'Diseno estrategico y resultados de cuentas asignadas',
      items: [
        'Liderar el diseno y evolucion de la estrategia de Paid Media para cada cliente asignado.',
        'Analizar resultados, identificar oportunidades de mejora y anticipar riesgos.',
        'Asegurar la consecucion de los KPIs establecidos por cliente.',
        'Traducir los objetivos de negocio del cliente en un roadmap de campanas accionable.',
        'Colaborar con otros departamentos para asegurar estrategias integradas.',
      ],
    },
    {
      titulo: 'Comunicacion directa con clientes',
      items: [
        'Ser el principal punto de contacto de los clientes del area (para los que tiene asignacion directa).',
        'Generar confianza, anticiparse a necesidades y establecer una relacion de partner estrategico.',
        'Presentar resultados, aprendizajes, hipotesis de optimizacion y siguientes pasos.',
        'Coordinar reuniones, reportes y entregas clave, garantizando claridad y transparencia.',
      ],
    },
    {
      titulo: 'Direccion estrategica del area de Paid Media',
      items: [
        'Definir la vision, los objetivos y la evolucion del servicio.',
        'Mantener actualizado el stack de herramientas, procesos y plataformas utilizadas.',
        'Estar a la vanguardia en tendencias (Meta, Google, TikTok, Performance Max, etc.).',
        'Asegurar que todo lo que se entrega desde el area este alineado con la metodologia Brandformance for Growth.',
      ],
    },
    {
      titulo: 'Participacion en New Business',
      items: [
        'Apoyar en la construccion de estrategias para nuevos clientes en conjunto con el Account Manager y el CSO.',
        'Validar que las propuestas de immedia sean coherentes con las capacidades internas.',
        'Validar que las estimaciones de resultados de las propuestas de immedia sean razonables y factibles.',
        'Participar en reuniones o presentaciones cuando el potencial cliente requiere explicacion tecnica o estrategica o una interaccion con un mayor nivel de interlocucion en el area.',
      ],
    },
    {
      titulo: 'Liderazgo del equipo',
      items: [
        'Supervisar y apoyar al equipo operativo del area.',
        'Definir prioridades de ejecucion.',
        'Formar al equipo a nivel tecnico y estrategico, manteniendolos en evolucion constante.',
        'Gestionar el rendimiento individual y colectivo mediante feedback y 1:1.',
        'Participar en seleccion y onboarding de nuevos perfiles junto a People.',
      ],
    },
    {
      titulo: 'Gestion de procesos y eficiencia operativa',
      items: [
        'Disenar y mantener los procesos operativos del area actualizados y documentados.',
        'Colaborar con el departamento de automatizacion para avanzar en la automatizacion de procesos internos.',
        'Detectar cuellos de botella, errores recurrentes o malas practicas, y corregirlos.',
        'Coordinar con el COO para asegurar cargas de trabajo equilibradas y realistas.',
      ],
    },
  ],
  kpis: [
    {
      nombre: 'Porcentaje de cuentas asignadas con objetivos cumplidos (mensual)',
      formula: '(Cuentas con KPIs cumplidos / Total de cuentas asignadas) x 100',
      meta: '≥ 80%',
    },
    {
      nombre: 'Rentabilidad promedio de immedia',
      formula: '(Ingresos del area – Costes del equipo y herramientas) / Ingresos del area',
      meta: '≥ 80%',
    },
  ],
}

export const immediaEspecialista = {
  title: 'Especialista de immedia',
  reportaA: 'Head de immedia',
  colaboraCon:
    'Heads de otras areas (imcontent, imseo, imloyal, immoralia, etc.), en Creatividad, Estrategia, Diseno, Copy y Analisis.',
  notaCliente:
    'No tiene relacion directa con cliente, salvo que se le asigne puntualmente por parte del Head de immedia.',
  resumen:
    'El Especialista de immedia es el ejecutor estrategico-operativo de las campanas de anuncios. Su responsabilidad principal es implementar, optimizar y escalar campanas en plataformas como Meta, Google, TikTok y otras, alineadas con los objetivos del cliente y la estrategia definida por el director del area. Su trabajo impacta directamente en los resultados de las cuentas y es clave para cumplir con los objetivos de performance, eficiencia de inversion y escalabilidad.',
  responsabilidades: [
    {
      titulo: 'Ejecucion tecnica de campanas',
      items: [
        'Implementar campanas segun la estructura y estrategia definida.',
        'Configurar campanas en Meta Ads, Google Ads, TikTok Ads, YouTube Ads u otras plataformas segun corresponda.',
        'Realizar la correcta vinculacion de pixeles, eventos de conversion, catalogos y audiencias.',
        'Revisar y dar feedback sobre creatividades antes de lanzamientos.',
      ],
    },
    {
      titulo: 'Optimizacion y seguimiento del rendimiento',
      items: [
        'Realizar analisis continuos de rendimiento de campanas para mejorar el ROAS, CPA, CPL o KPIs definidos.',
        'Documentar las optimizaciones realizadas en la bitacora interna de cambios.',
        'Detectar campanas ineficientes o con bajo rendimiento, proponer soluciones y ejecutarlas.',
        'Preparar insights para las reuniones internas de performance y estrategia.',
      ],
    },
    {
      titulo: 'Reporting y analisis',
      items: [
        'Crear dashboards y reportes mensuales mediante Looker Studio u otras herramientas.',
        'Preparar documentos de conclusiones y analisis mensuales.',
        'Asegurar la consistencia de los datos y validar los datos antes de cualquier entrega.',
        'Volcar objetivos y resultados mensuales en los formatos internos (incentivos, seguimiento, etc.).',
      ],
    },
    {
      titulo: 'Gestion de materiales y coordinacion interna',
      items: [
        'Solicitar los materiales necesarios para campanas (copys, creatividades, links, etc.).',
        'Coordinar con Diseno y Content para asegurarse de que el contenido entregado esta alineado con las necesidades tecnicas y estrategicas.',
        'Probar y validar los elementos creativos antes de lanzamientos (tamanos, duracion, formato, etc.).',
      ],
    },
    {
      titulo: 'Documentacion y mejora continua',
      items: [
        'Documentar sus propios procesos con ClickUp o herramientas asignadas.',
        'Mantener actualizados los SOPs (Standard Operating Procedures) del area de immedia.',
        'Proponer mejoras en procesos o metodologias basadas en la experiencia operativa diaria.',
      ],
    },
  ],
  noResponsabilidades: [
    'No tiene comunicacion directa con el cliente (salvo casos puntuales, gestionados por el director).',
    'No toma decisiones finales sobre presupuesto o asignacion de inversion.',
  ],
  kpis: [
    {
      nombre: 'Campanas lanzadas vs plan',
      formula: 'Nº campanas lanzadas / nº campanas en la estrategia',
      meta: '≥ 100%',
      nota: 'Solo se mide cuando hay una estructura de campanas creada (anadir IOPS).',
    },
    {
      nombre: 'Objetivos mensuales de performance cumplidos',
      formula: '(Objetivos de cuentas alcanzados / Total objetivos asignados) x 100',
      meta: '≥ 80%',
    },
    {
      nombre: 'Uso IFTTT (if this then that)',
      formula: 'Nº semanas con uso / Nº semanas sin llegar a objetivo con el cliente',
      meta: '100%',
    },
    {
      nombre: 'Tareas sin retrasos',
      formula: 'Nº tareas realizadas en el dia / Nº de tareas planificadas en ese dia',
      meta: '100%',
    },
  ],
}

/**
 * Misma forma que roles en theoryImcontent; orden para la biblioteca.
 * @type {import('./theoryImcontent').ImcontentRole[]}
 */
export const IMMEDIA_ROLES_ORDER = [
  {
    id: 'immedia-head',
    title: immediaHead.title,
    reportaA: immediaHead.reportaA,
    colaboraCon: immediaHead.colaboraCon,
    lideraA: immediaHead.lideraA,
    resumen: immediaHead.resumen,
    responsabilidades: immediaHead.responsabilidades,
    kpis: immediaHead.kpis,
  },
  {
    id: 'immedia-especialista',
    title: immediaEspecialista.title,
    reportaA: immediaEspecialista.reportaA,
    colaboraCon: immediaEspecialista.colaboraCon,
    contextoExtra: immediaEspecialista.notaCliente,
    resumen: immediaEspecialista.resumen,
    responsabilidades: immediaEspecialista.responsabilidades,
    noResponsabilidades: immediaEspecialista.noResponsabilidades,
    kpis: immediaEspecialista.kpis,
  },
]
