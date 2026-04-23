/**
 * Stack oficial Immoralia (referencia interna).
 * Mantener alineado con la documentacion de equipo / direccion.
 */

/** @typedef {{ name: string, uso: string, mcp?: 'yes' | 'no' | 'na' }} ImmoraliaStackTool */

/** @typedef {{ id: string, title: string, tools: ImmoraliaStackTool[], hideMcpColumn?: boolean }} ImmoraliaStackSection */

/** @type {ImmoraliaStackSection[]} */
export const IMMORALIA_STACK_SECTIONS = [
  {
    id: 'gestion',
    title: 'Gestion y operaciones',
    tools: [
      { name: 'ClickUp', uso: 'Gestion de tareas, proyectos, catalogo de skills', mcp: 'yes' },
      { name: 'Slack', uso: 'Comunicacion interna', mcp: 'yes' },
      { name: 'Google Calendar', uso: 'Agenda y reuniones', mcp: 'yes' },
      { name: 'Google Drive', uso: 'Documentacion y archivos', mcp: 'yes' },
      { name: 'Gmail', uso: 'Email', mcp: 'yes' },
    ],
  },
  {
    id: 'ia',
    title: 'IA y automatizacion',
    tools: [
      { name: 'Claude Teams', uso: 'IA principal (Brian)', mcp: 'na' },
      { name: 'Claude Code', uso: 'Desarrollo con IA en terminal', mcp: 'na' },
      { name: 'n8n (self-hosted)', uso: 'Orquestacion de automatizaciones', mcp: 'yes' },
      { name: 'Make', uso: 'Automatizaciones adicionales', mcp: 'na' },
    ],
  },
  {
    id: 'desarrollo',
    title: 'Desarrollo',
    hideMcpColumn: true,
    tools: [
      { name: 'GitHub (immoralia-brain)', uso: 'Repositorio de skills y codigo de Brian' },
      { name: 'Vercel', uso: 'Deploy de apps web' },
      { name: 'React + Tailwind + Vite', uso: 'Stack frontend (onboarding app, catalogo)' },
      { name: 'Supabase', uso: 'Base de datos proyectos SaaS' },
    ],
  },
  {
    id: 'reporting',
    title: 'Reporting y datos',
    tools: [
      { name: 'Google Sheets', uso: 'Capa intermedia de datos de reporting', mcp: 'na' },
      { name: 'Google Slides', uso: 'Output final de reportes', mcp: 'na' },
      { name: 'Holded', uso: 'CRM y facturacion', mcp: 'na' },
      { name: 'imfinance (MCP propio)', uso: 'Finance app interna con MCP', mcp: 'yes' },
    ],
  },
]

export function mcpLabel(mcp) {
  if (mcp === 'yes') return 'Si'
  if (mcp === 'no') return 'No'
  return '—'
}
