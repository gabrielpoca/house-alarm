import { execFile } from 'child_process'
import {
  size,
  gt,
  intersection,
  flow,
  split,
  map,
  filter,
  nth,
  flip
} from 'lodash/fp'

import { setEnabled, setDisabled } from './notifier_status'
import log from './log'

const allowedMACAddresses = process.env.MAC_ADDRESSES.split(',')
const hwInterface = process.env.INTERFACE

const getMACAddresses = flow([
  split(`\n`),
  map(split(`\t`)),
  filter(tokens => tokens.length >= 3),
  map(nth(1))
])

const hasAllowedMACAddresses = flow([
  intersection(allowedMACAddresses),
  size,
  length => length > 0
])

const runScan = cb => {
  execFile('arp-scan', ['--localnet', `--interface=${hwInterface}`], cb)
}

const runPerception = () => {
  runScan((err, stdout, stderr) => {
    if (err) {
      return log.error('Perception', err, stdout)
    }

    const addresses = getMACAddresses(stdout)

    if (hasAllowedMACAddresses(addresses)) {
      setDisabled()
    } else {
      setEnabled()
    }
  })
}

export const start = () => {
  log.info('Perception', `starting on interface ${hwInterface}`)

  runPerception()
  setInterval(runPerception, 10000)
}
