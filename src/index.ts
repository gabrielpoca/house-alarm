import { config } from 'dotenv'
import * as onoff from 'onoff'

config()

import sensor from './lib/sensor'
import web from './lib/web'
import log from './lib/log'
import * as notifier from './lib/notifier'
import * as perception from './lib/perception'

sensor.on('movement', () => {
  log.info('App', 'movement')
  notifier.notify()
})

perception.start()
web.start()

log.info('App', 'ready')
