import * as path from 'path'
import * as express from 'express'
import { setEnabled, setDisabled, isEnabled } from '../notifier_status'
import log from '../log'

const port = 8080
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', { enabled: isEnabled() })
})

app.post('/enable', (req, res) => {
  log.info('Web', 'enabling notifier')
  setEnabled()
  res.redirect('/')
})

app.post('/disable', (req, res) => {
  log.info('Web', 'disabling notifier')
  setDisabled()
  res.redirect('/')
})

export default {
  start: () => app.listen(port, () => log.info('Web', 'application running'))
}
