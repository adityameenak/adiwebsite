import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Canned streamed reply for UI work without an API key (ADI_AI_MOCK=1 npm run dev).
const MOCK_REPLY = `Adi interned at **Samsung Semiconductor** in Austin as a photolithography and metrology intern, using software and data to improve how a fab lines up and inspects wafers.

- Built a Python tool that turns overlay measurements into scanner corrections
- Deployed a PyTorch model that classifies spinner-tool defects
- Used control charts to recover 300–400 wafers a day of throughput

Want to hear more about the overlay work?
[[actions: experience, resume]]
[[followups: What tools did he use at Samsung? | Tell me about his research.]]`

function mockChat(_req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' })
  const parts = MOCK_REPLY.match(/[\s\S]{1,6}/g)
  let i = 0
  const timer = setInterval(() => {
    if (i >= parts.length) { clearInterval(timer); return res.end() }
    res.write(parts[i++])
  }, 18)
  res.on('close', () => clearInterval(timer))
}

// Serves the Vercel function at /api/chat during `vite dev`, so the assistant
// works locally with OPENAI_API_KEY from .env.local.
function adiApiDev(env) {
  return {
    name: 'adi-api-dev',
    configureServer(server) {
      for (const [key, value] of Object.entries(env)) {
        if (!key.startsWith('VITE_') && process.env[key] === undefined) process.env[key] = value
      }
      server.middlewares.use('/api/chat', async (req, res) => {
        if (process.env.ADI_AI_MOCK === '1') return mockChat(req, res)
        try {
          const { default: chatHandler } = await server.ssrLoadModule('/api/_lib/chatHandler.js')
          await chatHandler(req, res)
        } catch (err) {
          console.error(err)
          if (!res.headersSent) { res.statusCode = 500; res.end('{"error":"Dev server error"}') }
        }
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // '' prefix loads non-VITE_ vars for the dev API only; they are never exposed to the client bundle.
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), adiApiDev(env)],
    base: '/',
  }
})
