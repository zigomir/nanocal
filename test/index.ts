const puppeteer = require('puppeteer')
const http = require('http')
const server = http.createServer(require('ecstatic')(__dirname))
const PORT = 3100
server.listen(PORT)

;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`http://localhost:${PORT}/`)

  let exitCode = 1
  page.on('console', (msg: { _text: string }) => {
    if (msg._text === '# ok') { // hackish but works
      exitCode = 0
    }
  })

  await page.evaluate(() => {})
  await browser.close()

  console.log(
    `Exit code: ${exitCode}${exitCode === 0
      ? ' 🤘'
      : ' 💩 Open tests in real browser, one with head to se where tests are failing.'}`
  )
  process.exit(exitCode)
})()
