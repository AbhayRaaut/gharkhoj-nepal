import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const listingsFilePath = path.resolve(__dirname, 'src/data/listings.json')

function listingsFileApiPlugin() {
  return {
    name: 'listings-file-api',
    configureServer(server) {
      server.middlewares.use('/api/listings', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')

        if (req.method === 'GET') {
          try {
            const content = await fs.readFile(listingsFilePath, 'utf8')
            res.statusCode = 200
            res.end(content)
          } catch (error) {
            res.statusCode = 500
            res.end(JSON.stringify({ message: 'Unable to read listings file.' }))
          }

          return
        }

        if (req.method === 'PUT') {
          try {
            let body = ''

            for await (const chunk of req) {
              body += chunk
            }

            const parsedBody = JSON.parse(body)

            if (!Array.isArray(parsedBody)) {
              res.statusCode = 400
              res.end(JSON.stringify({ message: 'Listings payload must be an array.' }))
              return
            }

            await fs.writeFile(listingsFilePath, `${JSON.stringify(parsedBody, null, 2)}\n`, 'utf8')
            res.statusCode = 200
            res.end(JSON.stringify({ success: true }))
          } catch (error) {
            res.statusCode = 500
            res.end(JSON.stringify({ message: 'Unable to write listings file.' }))
          }

          return
        }

        res.statusCode = 405
        res.end(JSON.stringify({ message: 'Method not allowed.' }))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), listingsFileApiPlugin()],
})
