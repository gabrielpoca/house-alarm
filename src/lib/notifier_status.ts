import log from './log'

let enabled = false

export const isEnabled = () => {
  return enabled
}

export const setEnabled = () => {
  log.info('NotifierStatus', 'enabling')
  enabled = true
}

export const setDisabled = () => {
  log.info('NotifierStatus', 'disabling')
  enabled = false
}
