import * as EventEmitter from 'events'
import * as onoff from 'onoff'
import log from './log'

const emitter = new EventEmitter()

if (process.env.NODE_ENV === 'production') {
  const pir = new onoff.Gpio(7, 'in', 'both')
  const exit = () => {
    pir.unexport()
    process.exit()
  }
  pir.watch((err, value) => {
    if (err) exit()
    if (value == 1) {
      emitter.emit('movement')
    }
  })
} else {
  log.info('Using fake sensor')

  setInterval(() => {
    emitter.emit('movement')
  }, 5000)
}

export default emitter
