const puppeteer = require('puppeteer')
const http = require('http')
const ecstatic = require('ecstatic')(__dirname)
const server = http.createServer(ecstatic)
const PORT = 3000
server.listen(PORT)

interface ConsoleMessage {
  type: 'log' | 'error' | 'warn' | 'debug'
  text: string
}

(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`http://localhost:${PORT}/`)

  let exitCode = 1
  page.on('console', (msg: ConsoleMessage) => {
    if (msg.text === '# ok') {
      exitCode = 0
    }
  })

  await page.evaluate(() => {})
  await browser.close()

  process.exit(exitCode)
})()
