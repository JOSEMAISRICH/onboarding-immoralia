import { spawn, exec } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const PORT = 5173
const url = `http://127.0.0.1:${PORT}/`

const child = spawn('npx', ['vite', '--port', String(PORT)], {
  cwd: root,
  stdio: 'inherit',
  shell: true,
})

async function waitForServer() {
  for (let i = 0; i < 80; i++) {
    try {
      const res = await fetch(url)
      if (res.ok) return true
    } catch {
      /* aun no */
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  return false
}

void (async () => {
  const ok = await waitForServer()
  if (!ok) return
  if (process.platform === 'win32') {
    exec(`cmd /c start "" "${url}"`)
  } else if (process.platform === 'darwin') {
    exec(`open "${url}"`)
  } else {
    exec(`xdg-open "${url}"`)
  }
})()

child.on('exit', (code) => process.exit(code ?? 0))
