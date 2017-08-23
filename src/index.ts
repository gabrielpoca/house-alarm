import { config } from 'dotenv'
import * as onoff from 'onoff'

config()

import sensor from './lib/sensor'
import web from './lib/web'
import log from './lib/log'
import * as notifier from './lib/notifier'

sensor.on('movement', () => {
  log.info('Movement detected')
  notifier.notify()
})

web.start()

log.info('Sensor ready')
